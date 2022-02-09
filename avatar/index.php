<?php

$types = [
    "png" => "png.php",
    "svg" => "svg.php"
];
$requestType = !empty($_GET["type"]) ? substr($_GET["type"], 0, 3) : "png";
$script = isset($types[$requestType]) ? $types[$requestType] : $types["png"];
require_once "./src/$script";
