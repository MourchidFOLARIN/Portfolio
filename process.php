<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs.']);
        exit;
    }

    $to = "mourchidolawale@gmail.com";
    $subject = "Nouveau message de $name (Portfolio)";
    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès !']);
    } else {
        echo json_encode(['success' => false, 'message' => "Erreur lors de l'envoi du message."]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>