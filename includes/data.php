<?php

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$results = [];

echo json_encode($results);
exit;