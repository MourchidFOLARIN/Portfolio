<?php
/**
 * process.php — DÉPRÉCIÉ.
 *
 * L'envoi du formulaire de contact est désormais géré côté client
 * par Web3Forms (voir la fonction initContactForm() dans script.js).
 *
 * Ce fichier est conservé uniquement pour compatibilité et ne traite
 * plus aucune donnée. Il peut être supprimé sans risque.
 */

header('Content-Type: application/json; charset=utf-8');
http_response_code(410);
echo json_encode([
    'success' => false,
    'message' => 'Ce point d\'entree est deprecie. Le formulaire utilise desormais l\'API Web3Forms.'
], JSON_UNESCAPED_UNICODE);