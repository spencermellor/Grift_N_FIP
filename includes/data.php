<?php

// ini_set('display_errors', 1);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Includes database and porfolio object
include_once '../config/database.php';
include_once '../objects/portfolio.php';

// Database connection
$database = new Database();
$db = $database->getConnection();

// Create Portfolio object
$portfolio = new Portfolio($db);


if (isset($_GET['id'])) {
    $result = $portfolio->getPieceByID($_GET['id']);
} elseif (isset($_GET['category'])) {
    $result = $portfolio->getPiecesByCategory($_GET['category']);
} elseif (isset($_GET['tag'])) {
    $result = $portfolio->getPieceByTag($_GET['tag']);
} else {
    $result = $portfolio->getPieces();
}

echo json_encode($result);
exit;