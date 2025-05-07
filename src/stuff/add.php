<?php
	$chars = [
		' ',
		'&middot;',
		'&bull;',
		'#',
		'+',
		'=',
		'%',
		'&#94;',
		'|',
		'\\',
		'/',
		'-',
		',',
		'.'
    ];
?><!DOCTYPE html>
<html>
	<head>
        <link rel="canonical" href="/stuff/add.php" />
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">		
        <title>The Stupid ASCII Addition Answer Page</title>
		<style type="text/css">
			<!-- 
				body { margin: 20px; }
				pre { padding: 10px; font: 16px/.8 monaco,"Lucida Console",courier; color: blue; }
				fieldset, form { border: none; padding: 0; margin: 0; }
				h1 { margin-bottom: 0; }
				p.disclaimer { margin: 0 0 30px 0; }
			-->
		</style>
	</head>
	<body>
		<h1>The Stupid ASCII Addition Answer Page</h1>
		<p class="disclaimer"><small>Version 1.0 | If it looks like ass in IE 6 its because I don't care.</small></p>
		<form method="get" action="">
			<fieldset>
				<input type="text" name="a" id="a" <?php
					if(isset($_GET['a'])) { echo 'value="'.$_GET['a'].'" '; }
				?>/> &plus; <input type="text" name="b" id="b" 	<?php
						if(isset($_GET['b'])) { echo 'value="'.$_GET['b'].'" '; }
					?>/> &rarr; 
				<label for="size">size:</label>
				<select name="size" id="size">
					<?php
						for($i=1;$i<=5;$i++) {
							echo '<option value="'.$i.'"'.
								 (isset($_GET['size']) && intval($_GET['size']) == $i ? ' selected="selected"' : '').
								 '>'.$i.'</option>';
						}
					?>
				</select>
				<label for="char">char:</label>
				<select name="char" id="char">
					<?php
						if(!isset($_GET['char'])) { $_GET['char'] = 3; }
						foreach($chars as $id => $char) {
							echo '<option value="'.$id.'"'.
								 (isset($_GET['char']) && intval($_GET['char']) == $id ? ' selected="selected"' : '').
								 '>'.$char.'</option>';
						}
					?>
				</select>
				<label for="background">background-char:</label>
				<select name="background" id="background">
					<?php
						foreach($chars as $id => $char) {
							echo '<option value="'.$id.'"'.
								 (isset($_GET['background']) && intval($_GET['background']) == $id ? ' selected="selected"' : '').
								 '>'.$char.'</option>';
						}
					?>
				</select>
				<label for="invert">invert:</label>
				<input type="checkbox" name="invert" id="invert" value="1" <?php
					if(isset($_GET['invert']) && intval($_GET['invert']) == 1) {
						echo ' checked="checked"';
					}
				?>/>
				<input type="submit" name="submit" value="add" />
			</fieldset>
		</form>
		<?php
			if(isset($_GET['a']) && isset($_GET['b'])) {
				$a = floatval($_GET['a']);
				$b = floatval($_GET['b']);
				$size = isset($_GET['size']) ? intval($_GET['size']) : '2';
				$char = isset($_GET['char']) ? $chars[intval($_GET['char'])] : '#';
				$background = isset($_GET['background']) ? $chars[intval($_GET['background'])] : ' ';
				$invert = isset($_GET['invert']) && intval($_GET['invert']) == 1 ? true : false;
				echo '<h2>Your Answer Is:</h2>' .
					 '<pre>', show_my_math($a, $b, $size, $char, $background, $invert), '</pre>' .
					 '<h2>Yay!</h2>';
			}
		?>
	</body>
	<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script type="text/javascript">
	var pageTracker = _gat._getTracker("UA-4629283-1");
	pageTracker._initData();
	pageTracker._trackPageview();
	</script>
</html>
<?php
function show_my_math($a=1, $b=2, $size=2, $char='#', $background=' ', $invert=false) {
	$px=array(
		'1'=>array(
			0,0,1,0,
			0,1,1,0,
			0,0,1,0,
			0,0,1,0,
			0,1,1,1
		),
		'2'=>array(
			0,1,1,1,
			0,0,0,1,
			0,0,1,0,
			0,1,0,0,
			0,1,1,1
		),
		'3'=>array(
			0,1,1,1,
			0,0,0,1,
			0,0,1,1,
			0,0,0,1,
			0,1,1,1
		),
		'4'=>array(
			0,1,0,1,
			0,1,0,1,
			0,1,1,1,
			0,0,0,1,
			0,0,0,1
		),
		'5'=>array(
			0,1,1,1,
			0,1,0,0,
			0,1,1,1,
			0,0,0,1,
			0,1,1,1
		),
		'6'=>array(
			0,1,1,1,
			0,1,0,0,
			0,1,1,1,
			0,1,0,1,
			0,1,1,1
		),
		'7'=>array(
			0,1,1,1,
			0,0,0,1,
			0,0,1,0,
			0,1,0,0,
			0,1,0,0
		),
		'8'=>array(
			0,1,1,1,
			0,1,0,1,
			0,1,1,1,
			0,1,0,1,
			0,1,1,1
		),
		'9'=>array(
			0,1,1,1,
			0,1,0,1,
			0,1,1,1,
			0,0,0,1,
			0,1,1,1
		),
		'0'=>array(
			0,1,1,1,
			0,1,0,1,
			0,1,0,1,
			0,1,0,1,
			0,1,1,1
		),
		'-'=>array(
			0,0,0,0,
			0,0,0,0,
			0,1,1,1,
			0,0,0,0,
			0,0,0,0
		),
		'.'=>array(
			0,0,
			0,0,
			0,0,
			0,0,
			0,1,
		)
	);
    
    $sum=strval(floatval($a) + floatval($b));
	$sum = strval(number_format(floatval($a) + floatval($b), 0, '', ''));
    
    if(!$invert) {
		$y = $char;
		$z = $background;
	}
	else {
		$y = $background;
		$z = $char;
	}
    
    $buffer = '';
    
    for($e=0; $e < $size; $e++) {
		$buffer .= str_repeat($z, (strlen($sum) * 4) * $size) . str_repeat($z, $size) . "\n";
    }
    
	echo $buffer;
    
    for($r = 0, $rr = 0; $r < 5 * $size; $r++, $rr = floor($r/$size)) {
		for($d = 0; $d < strlen($sum); $d++) {
			$a = $px[$sum[$d]];
			for($x = count($a) / 5, $i = $rr * $x; $i < $x + $rr * $x; $i++) {
				echo str_repeat(($a[$i]===1) ? $y : $z, $size);
			}
        }
        
		echo str_repeat($z, $size) . "\n";
	} 
    
    echo $buffer;
}
