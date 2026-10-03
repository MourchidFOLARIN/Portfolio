/**
 * Contact form for Vercel.
 * Visitor input stays in the message body. Subject, From and To never
 * come from the request.
 *
 * Project environment variables:
 *   RESEND_API_KEY  required, from https://resend.com
 *   CONTACT_TO      recipient, default mourchidolawale@gmail.com
 *   CONTACT_FROM    verified sender, default Portfolio <onboarding@resend.dev>
 */

const net = require('net');

const DEFAULT_TO = 'mourchidolawale@gmail.com';
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

function respond(res, status, success, message) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(status).json({ success, message });
}

function hasControlChars(value) {
    return /[\u0000-\u001F\u007F]/.test(value);
}

function singleLine(value, max) {
    const cleaned = String(value)
        .replace(/[\u0000-\u001F\u007F]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (!cleaned || cleaned.length > max) {
        return null;
    }
    return cleaned;
}

function messageBody(value) {
    const cleaned = String(value)
        .replace(/\r\n?/g, '\n')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .trim();
    if (!cleaned || cleaned.length > 5000) {
        return null;
    }
    return cleaned;
}

function plainEmail(value) {
    const email = String(value ?? '').trim();
    if (!email || hasControlChars(email) || email.length > 254) {
        return null;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return null;
    }
    return email;
}

function mailbox(value) {
    const mailboxValue = String(value ?? '').trim();
    if (!mailboxValue || hasControlChars(mailboxValue) || mailboxValue.length > 200) {
        return null;
    }
    if (/^[^<>"\r\n]{1,80} <[^<>\s@]+@[^<>\s@]+>$/.test(mailboxValue)) {
        return mailboxValue;
    }
    return plainEmail(mailboxValue);
}

function configuredAddress(envName, fallback, allowDisplayName) {
    const raw = process.env[envName];
    if (!raw || !raw.trim()) {
        return allowDisplayName ? mailbox(fallback) : plainEmail(fallback);
    }
    return allowDisplayName ? mailbox(raw) : plainEmail(raw);
}

function clientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const header = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    const first = String(header || '').split(',')[0].trim();
    if (net.isIP(first)) {
        return first;
    }
    const remote = req.socket && req.socket.remoteAddress;
    return remote || '0.0.0.0';
}

function rateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((stamp) => now - stamp < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    return false;
}

function resendEndpoint() {
    const override = process.env.RESEND_API_URL;
    if (override && /^https?:\/\//.test(override)) {
        return override;
    }
    return 'https://api.resend.com/emails';
}

function readBody(req) {
    if (Buffer.isBuffer(req.body)) {
        try {
            return JSON.parse(req.body.toString('utf8'));
        } catch (error) {
            return null;
        }
    }
    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch (error) {
            return null;
        }
    }
    if (req.body && typeof req.body === 'object') {
        return req.body;
    }
    return {};
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        respond(res, 405, false, 'Méthode non autorisée.');
        return;
    }

    const body = readBody(req);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        respond(res, 400, false, 'Veuillez remplir tous les champs.');
        return;
    }

    const honeypot = body.hp_field;
    if (typeof honeypot !== 'string' && honeypot != null || (typeof honeypot === 'string' && honeypot.trim() !== '')) {
        respond(res, 200, true, 'Message envoyé avec succès !');
        return;
    }

    const nameRaw = body.name;
    const emailRaw = body.email;
    const messageRaw = body.message;
    if (typeof nameRaw !== 'string' || typeof emailRaw !== 'string' || typeof messageRaw !== 'string') {
        respond(res, 400, false, 'Veuillez remplir tous les champs.');
        return;
    }
    if (!nameRaw.trim() || !emailRaw.trim() || !messageRaw.trim()) {
        respond(res, 400, false, 'Veuillez remplir tous les champs.');
        return;
    }

    const name = singleLine(nameRaw, 120);
    if (!name) {
        respond(res, 400, false, 'Le nom est invalide ou trop long.');
        return;
    }
    const email = plainEmail(emailRaw);
    if (!email) {
        respond(res, 400, false, 'Adresse e-mail invalide.');
        return;
    }
    const message = messageBody(messageRaw);
    if (!message) {
        respond(res, 400, false, 'Le message est vide, trop long ou invalide.');
        return;
    }

    const apiKey = (process.env.RESEND_API_KEY || '').trim();
    const to = configuredAddress('CONTACT_TO', DEFAULT_TO, false);
    const from = configuredAddress('CONTACT_FROM', DEFAULT_FROM, true);
    if (!apiKey || hasControlChars(apiKey) || !to || !from) {
        console.error('Contact form is not configured (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM).');
        respond(res, 503, false, "L'envoi est temporairement indisponible. Écrivez-moi à " + DEFAULT_TO + '.');
        return;
    }

    if (rateLimited(clientIp(req))) {
        respond(res, 429, false, 'Trop de messages envoyés. Réessayez dans une heure.');
        return;
    }

    const payload = {
        from,
        to: [to],
        reply_to: email,
        subject: 'Nouveau message depuis le portfolio',
        text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    };

    let status = 0;
    let responseText = '';
    try {
        const upstream = await fetch(resendEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + apiKey,
            },
            body: JSON.stringify(payload),
        });
        status = upstream.status;
        responseText = await upstream.text();
    } catch (error) {
        console.error('Resend request failed');
        respond(res, 502, false, "Erreur lors de l'envoi du message. Réessayez ou écrivez-moi à " + DEFAULT_TO + '.');
        return;
    }

    if (status < 200 || status >= 300) {
        console.error('Resend error HTTP ' + status + ' ' + responseText.slice(0, 500));
        respond(res, 502, false, "Erreur lors de l'envoi du message. Réessayez ou écrivez-moi à " + DEFAULT_TO + '.');
        return;
    }

    respond(res, 200, true, 'Message envoyé avec succès !');
};
