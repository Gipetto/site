<?php
define("LINE_MAX", 17);

$json = json_decode(file_get_contents("avatar.json"), true);
$rawText = $json[array_rand($json)]["title"];

$imgText = html_entity_decode($rawText);

$words = explode(" ", $imgText);
$lines = [""];
$space = " ";

foreach ($words as $word) {
    $i = count($lines) - 1;
    $currentLine = mb_strlen($lines[$i]);
    $currentWord = mb_strlen($word);

    if (($currentLine + $currentWord + 1) <= LINE_MAX) {
        $lines[$i] .= "$word$space";
    } elseif($currentWord > LINE_MAX) {
        $parts = mb_str_split($word, LINE_MAX);
        foreach ($parts as $k => $part) {
            $lines[] = "$part";
        }
    } else {
        $lines[] = "$word$space";
    }
}

$dy = NULL;
$tspans = array_map(function($l) use (&$dy) {
    $dy = !$dy ? "0.9" : "1.15";
    return '<tspan x="0" dy="' . $dy . 'em">' . $l . '</tspan>';
}, $lines);

$template = file_get_contents("src/avatar.svg.template");
$output = str_replace("{{lines}}", implode("", $tspans), $template);

header("Content-Type: image/svg+xml");
header("Expires: 0");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: private, no-cache, no-store, max-age=0");
header("Pragma: no-cache");
print($output);
exit();