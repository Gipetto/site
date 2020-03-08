---
id: 325
title: Long Live the Image Map!
date: 2007-03-16T21:14:13+00:00
layout: post
guid: http://top-frog.local/?p=325
permalink: /2007/03/16/long-live-the-image-map/
categories:
  - Code
  - 'Web Design & Development'
tags:
  - html
  - image
  - javascript
  - map
---

Why should the image map be ignored? Its understood by every major browser around and is perfectly suited to do what some people insist on doing in flash. This sample shows a simple North American map divided up into regions and the rollovers controlled by some very simple JavaScript code. JavaScript was lifted from some Macromedia code I found, nothing special, and could be rewritten using newer JS and CSS and take significantly less lines.

<script type="text/javascript">
    var myimages=new Array();
    
		function preloadimages(images){
      for (i in images) {
        myimages[i] = new Image()
				myimages[i].src = images[i]
			}
		}

		preloadimages([
      "/assets/image_map/map-for-web.gif",
      "/assets/image_map/map-for-web-uw.gif",
      "/assets/image_map/map-for-web-uc.gif",
      "/assets/image_map/map-for-web-ue.gif",
      "/assets/image_map/map-for-web-cw.gif",
      "/assets/image_map/map-for-web-cc.gif",
      "/assets/image_map/map-for-web-ce.gif"
    ]);

    function swapImage(target, _, newImg, _) {
      document.getElementById(target).src = newImg;
    }
</script>

<img src="/assets/image_map/map-for-web.gif" id="regionmap" alt="Region Map" height="228" width="250" usemap="#map_for_web_ImageMap_Map" border="0"> 
<map name="map_for_web_ImageMap_Map">
  <area shape="poly" coords="18,175, 23,175, 27,180, 27,190, 18,190" href="#" alt="Western United States - Hawaii" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);" onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-uw.gif',1);">
  <area shape="poly" coords="77,41, 73,40, 70,35, 62,26, 45,25, 36,31, 35,37, 41,42, 39,45, 29,42, 26,47, 27,57, 31,65, 12,66, 3,63, 2,65, 16,69, 36,70, 40,66, 46,70, 55,70, 62,78, 65,85, 70,88, 70,99, 72,102, 75,100, 70,83, 65,82, 63,77, 62,73, 79,43" href="#" alt="Western United States" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);"  onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-uw.gif',1);">
  <area shape="poly" coords="179,208, 183,206, 188,211, 188,215, 193,220, 194,220, 196,223, 199,219, 198,215, 190,201, 191,196, 202,181, 202,177, 199,172, 199,170, 202,173, 203,169, 204,161, 209,159, 209,154, 211,151, 210,148, 215,140, 212,135, 211,133, 208,132, 206,141, 202,144, 196,144, 187,153, 188,155, 186,159, 185,167, 182,173, 184,177, 180,181, 187,180, 179,187, 161,189, 159,204, 164,204, 166,207, 171,206, 176,205" href="#" alt="Eastern United States" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);" onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-ue.gif',1);">
  <area shape="poly" coords="121,212, 126,209, 129,211, 136,223, 142,224, 141,217, 148,212, 149,210, 158,210, 162,212, 164,211, 166,211, 165,206, 164,204, 159,204, 161,189, 179,187, 186,180, 180,181, 184,176, 182,173, 185,167, 185,159, 183,161, 179,161, 179,155, 177,149, 173,148, 170,150, 170,161, 167,162, 165,159, 165,150, 172,145, 170,143, 168,144, 162,143, 159,144, 154,144, 159,139, 152,139, 146,136, 125,136, 123,166, 110,166, 108,180, 125,182, 124,193, 124,200, 113,200, 118,206" href="#" alt="Central United States" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);" onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-uc.gif',1);">
  <area shape="poly" coords="178,113, 183,106, 183,103, 178,98, 175,82, 185,82, 192,86, 192,88, 197,93, 200,90, 201,84, 203,84, 212,93, 226,100, 232,107, 240,111, 245,120, 237,120, 231,123, 230,132, 222,143, 216,140, 212,136, 211,132, 208,132, 206,141, 202,144, 197,144, 186,142, 183,134, 181,124, 181,118" href="#" alt="Eastern Canada" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);" onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-ce.gif',1);">
  <area shape="poly" coords="172,113, 164,111, 158,107, 156,109, 148,121, 146,136, 151,139, 160,139, 162,136, 168,137, 173,144, 182,145, 185,148, 184,150, 181,149, 180,154, 179,160, 185,156, 188,155, 188,153, 187,153, 187,152, 193,149, 196,144, 197,142, 193,144, 186,142, 183,137, 181,125, 178,125, 173,117" href="#" alt="Central Canada" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);" onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-cc.gif',1);">
  <area shape="poly" coords="146,136, 122,136, 102,134, 82,129, 77,130, 72,121, 75,117, 73,115, 76,113, 73,107, 72,103, 75,100, 73,95, 70,82, 66,82, 63,77, 63,73, 79,43, 84,49, 88,49, 97,49, 103,43, 106,39, 106,36, 109,30, 118,26, 132,22, 142,18, 148,12, 156,7, 174,4, 172,9, 166,19, 163,31, 163,42, 170,44, 183,49, 196,58, 197,74, 195,78, 185,77, 180,73, 175,75, 169,79, 162,81, 157,79, 153,82, 146,91, 147,100, 151,103, 151,106, 157,106, 156,109, 147,121" href="#" alt="Western Canada" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);"  onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-cw.gif',1);">
  <area shape="poly" coords="82,129, 103,134, 125,136, 123,166, 110,166, 108,180, 124,182, 123,200, 113,200, 105,201, 100,201, 87,194, 82,193, 74,183, 70,168, 69,157, 71,150, 77,138, 77,131" href="#" alt="Western United States" onmouseout="swapImage('regionmap','','/assets/image_map/map-for-web.gif',1);" onmouseover="swapImage('regionmap','','/assets/image_map/map-for-web-uw.gif',1);">
</map>	