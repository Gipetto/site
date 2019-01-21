<?php
	$time = (isset($_GET['t']) ? 4 : 2);
	sleep($time);
	echo 'This is Ajax loaded content '.(isset($_GET['t']) ? $_GET['t'] : '1');
?>