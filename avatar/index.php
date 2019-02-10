<?php
header('Content-Type: image/png');
header("Expires: 0");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if (isset($_GET['t'])) {
    $imgText = $_GET['t'];
} else {
    $json = json_decode(file_get_contents('./avatar.json'), true);
    $imgText = $json[array_rand($json)]['title'];
}

$width = '120';
$insetWidth = '119';
$height = '80';
$font = './fonts/04B_20__.TTF';
$size = '6';

$wordArray = explode(' ', $imgText);
$wordCount = count($wordArray);
$finalText = $wordArray[0];

$formattingOpts = ['linespacing' => 1.2];

for ($i = 1; $i < $wordCount; $i++) {
    $sizeArray = imageFTBBox($size, 0, $font, $finalText, $formattingOpts);
    $textWidth = ($sizeArray[4] - $sizeArray[0]);

    if ($textWidth < $width) {
        $sizeArray2 = imageFTBBox($size, 0, $font, $finalText. ' ' .$wordArray[$i], $formattingOpts);
        $textWidth2 = ($sizeArray2[4] - $sizeArray2[0]);
    
        if ($textWidth2 < $insetWidth) {
            $separator = ' ';
        } else {
            $separator = "\r\n";
        }
    } else {
        $separator = "\r\n";
    }
    
    $finalText = $finalText.$separator.$wordArray[$i];
}
    
$imgHandle = ImageCreate($width, $height) or die("Cannot Create Image");
$background = ImageColorAllocate($imgHandle, 255, 255, 255);
//ImageColorTransparent($imgHandle, $background);
$txt_color = ImageColorAllocate($imgHandle, 1, 1, 1);
ImageFTText($imgHandle, $size, 0, 00, 9, -13, $font, $finalText, $formattingOpts);
ImagePNG($imgHandle);
ImageDestroy($imgHandle);