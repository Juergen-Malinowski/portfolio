<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$allowedOrigins = [
    'http://localhost:4200',
    'https://juergen-malinowski.de',
    'https://www.juergen-malinowski.de',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Origin not allowed.',
        ]);
        exit;
    }

    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput ?: '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request body.',
    ]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$privacyAcknowledged = ($data['privacy'] ?? false) === true;
$website = trim((string) ($data['website'] ?? ''));

/*
 * Honeypot field for automated spam.
 * Bots receive a successful response without sending an email.
 */
if ($website !== '') {
    echo json_encode([
        'success' => true,
    ]);
    exit;
}

if (
    $name === ''
    || strlen($name) > 100
    || preg_match('/[\r\n]/', $name)
) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid name.',
    ]);
    exit;
}

if (
    !filter_var($email, FILTER_VALIDATE_EMAIL)
    || strlen($email) > 254
    || preg_match('/[\r\n]/', $email)
) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.',
    ]);
    exit;
}

if (
    $message === ''
    || strlen($message) > 5000
) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid message.',
    ]);
    exit;
}

if (!$privacyAcknowledged) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Privacy policy acknowledgement is required.',
    ]);
    exit;
}

$recipient = 'kontakt@juergen-malinowski.de';
$subject = 'Neue Nachricht über das Portfolio';

$mailBody =
    "Neue Nachricht über das Portfolio\n\n"
    . "Name: {$name}\n"
    . "E-Mail: {$email}\n\n"
    . "Nachricht:\n{$message}\n\n";

$headers = [
    'From: Portfolio Website <kontakt@juergen-malinowski.de>',
    "Reply-To: {$email}",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$mailSent = mail(
    $recipient,
    $encodedSubject,
    $mailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email could not be sent.',
    ]);
    exit;
}

echo json_encode([
    'success' => true,
]);