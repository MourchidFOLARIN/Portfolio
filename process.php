<?php
/**
 * Contact form endpoint.
 *
 * Visitor input is validated and sent in the message body only.
 * The subject, From and To addresses never come from the request.
 *
 * Railway variables:
 *   RESEND_API_KEY  required, from https://resend.com
 *   CONTACT_TO      recipient, default mourchidolawale@gmail.com
 *   CONTACT_FROM    verified sender, default Portfolio <onboarding@resend.dev>
 *                   (that sandbox sender only delivers to the Resend account email)
 */

declare(strict_types=1);

ini_set('display_errors', '0');

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const DEFAULT_TO = 'mourchidolawale@gmail.com';
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';
const RATE_LIMIT = 8;
const RATE_WINDOW = 3600;

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(
        ['success' => $success, 'message' => $message],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

function is_utf8(string $value): bool
{
    return preg_match('//u', $value) === 1;
}

function has_control_chars(string $value): bool
{
    return preg_match('/[\x00-\x1F\x7F]/', $value) === 1;
}

function single_line(string $value, int $max): ?string
{
    $value = trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');
    if ($value === '' || !is_utf8($value) || strlen($value) > $max) {
        return null;
    }
    return $value;
}

function message_body(string $value): ?string
{
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value) ?? '';
    $value = trim($value);
    if ($value === '' || !is_utf8($value) || strlen($value) > 5000) {
        return null;
    }
    return $value;
}

function plain_email(string $value): ?string
{
    $value = trim($value);
    if ($value === '' || has_control_chars($value) || strlen($value) > 254) {
        return null;
    }
    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    return $value;
}

function mailbox(string $value): ?string
{
    $value = trim($value);
    if ($value === '' || has_control_chars($value) || strlen($value) > 200) {
        return null;
    }
    if (preg_match('/^[^<>"\r\n]{1,80} <[^<>\s@]+@[^<>\s@]+>$/', $value) === 1) {
        return $value;
    }
    return plain_email($value);
}

function configured_address(string $envName, string $default, bool $allowDisplayName): ?string
{
    $raw = getenv($envName);
    if ($raw === false || trim($raw) === '') {
        return $allowDisplayName ? mailbox($default) : plain_email($default);
    }
    return $allowDisplayName ? mailbox($raw) : plain_email($raw);
}

function client_ip(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if (is_string($forwarded) && $forwarded !== '') {
        $first = trim(explode(',', $forwarded)[0]);
        if (filter_var($first, FILTER_VALIDATE_IP)) {
            return $first;
        }
    }
    $remote = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    return is_string($remote) ? $remote : '0.0.0.0';
}

function rate_limited(string $ip): bool
{
    $dir = sys_get_temp_dir() . '/portfolio-contact';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false;
    }

    $file = $dir . '/' . hash('sha256', $ip);
    $now = time();
    $stamps = [];
    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            foreach ($decoded as $stamp) {
                if (is_int($stamp) && $stamp > $now - RATE_WINDOW) {
                    $stamps[] = $stamp;
                }
            }
        }
    }

    if (count($stamps) >= RATE_LIMIT) {
        return true;
    }

    $stamps[] = $now;
    file_put_contents($file, json_encode($stamps), LOCK_EX);
    return false;
}

function resend_endpoint(): string
{
    $override = getenv('RESEND_API_URL');
    if (is_string($override) && preg_match('#^https?://#', $override) === 1) {
        return $override;
    }
    return 'https://api.resend.com/emails';
}

/**
 * @param array<string, mixed> $payload
 * @return array{0:int,1:string}
 */
function post_json(string $url, string $apiKey, array $payload): array
{
    $body = json_encode($payload, JSON_UNESCAPED_UNICODE);
    if ($body === false) {
        return [0, ''];
    }

    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer ' . $apiKey,
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        if ($ch === false) {
            return [0, ''];
        }
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
        ]);
        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [$status, is_string($response) ? $response : ''];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $body,
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);
    $response = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('#\s(\d{3})\s#', $http_response_header[0], $matches) === 1) {
        $status = (int) $matches[1];
    }
    return [$status, is_string($response) ? $response : ''];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Méthode non autorisée.');
}

$honeypot = $_POST['hp_field'] ?? '';
if (!is_string($honeypot) || trim($honeypot) !== '') {
    respond(200, true, 'Message envoyé avec succès !');
}

$nameRaw = $_POST['name'] ?? '';
$emailRaw = $_POST['email'] ?? '';
$messageRaw = $_POST['message'] ?? '';

if (!is_string($nameRaw) || !is_string($emailRaw) || !is_string($messageRaw)) {
    respond(400, false, 'Veuillez remplir tous les champs.');
}

if (trim($nameRaw) === '' || trim($emailRaw) === '' || trim($messageRaw) === '') {
    respond(400, false, 'Veuillez remplir tous les champs.');
}

$name = single_line($nameRaw, 120);
if ($name === null) {
    respond(400, false, 'Le nom est invalide ou trop long.');
}

$email = plain_email($emailRaw);
if ($email === null) {
    respond(400, false, 'Adresse e-mail invalide.');
}

$message = message_body($messageRaw);
if ($message === null) {
    respond(400, false, 'Le message est vide, trop long ou invalide.');
}

$apiKey = getenv('RESEND_API_KEY');
$apiKey = is_string($apiKey) ? trim($apiKey) : '';
$to = configured_address('CONTACT_TO', DEFAULT_TO, false);
$from = configured_address('CONTACT_FROM', DEFAULT_FROM, true);

if ($apiKey === '' || has_control_chars($apiKey) || $to === null || $from === null) {
    error_log('Contact form is not configured (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM).');
    respond(503, false, "L'envoi est temporairement indisponible. Écrivez-moi à " . DEFAULT_TO . '.');
}

if (rate_limited(client_ip())) {
    respond(429, false, 'Trop de messages envoyés. Réessayez dans une heure.');
}

$payload = [
    'from' => $from,
    'to' => [$to],
    'reply_to' => $email,
    'subject' => 'Nouveau message depuis le portfolio',
    'text' => "Nom: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n",
];

[$status, $responseBody] = post_json(resend_endpoint(), $apiKey, $payload);
if ($status < 200 || $status >= 300) {
    error_log('Resend error HTTP ' . $status . ' ' . substr($responseBody, 0, 500));
    respond(502, false, "Erreur lors de l'envoi du message. Réessayez ou écrivez-moi à " . DEFAULT_TO . '.');
}

respond(200, true, 'Message envoyé avec succès !');
