<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>Testing OOP Ajax</title>
	<!-- MS Specific meta -->
	<meta http-equiv="imagetoolbar" content="no" />
	<meta name="MSSmartTagsPreventParsing" content="true" />
	<script language="JavaScript1.5" type="text/javascript" src="ajax.class.js"></script>
</head>
<body>
	<h1>Testing OOP Ajax</h1>

	<p id="result"></p>
	<p id="result2"></p>

	<script type="text/javascript" language="Javascript1.5">
	// <![CDATA[
		// create a subclass to our oopAjax Class that we can customize
		oopToo = function() {
			// grab inheritance from oopAjax
			this.inheritFrom = oopAjax;
			this.inheritFrom();

			// define new loaded function - refers to function defined below
			this.doWhenLoaded = newDoWhenLoaded;
			// a different way of defining new functionality
			this.doWhileLoading = function() {
				// set progress image
				var progressImage = '<img id="progress" src="progress.gif" alt="processing..." />';
				// write it out
				document.getElementById('result2').innerHTML = progressImage + ' Loading even more content...';
			}
			this.doOnError = function() {
				// write it out, write it out loud!
				document.getElementById('result2').innerHTML = 'Error, butthead!';
			}
		}

		// define our new function for loading
		function newDoWhenLoaded(response) {
			// set progress image
			var loadedImage = '<img id="loaded" src="success.png" alt="success!" />';
			document.getElementById('result2').innerHTML = loadedImage + ' Secondary function: ' + response;
		}

		// instantiate
		//
		// standard oopAjax class
		var test = new oopAjax();
		// oopAjax subclass oopToo defined above
		var meToo = new oopToo();

		// run the ajax requests
		test.doAjax('test.php',document.getElementById('result'));
		meToo.doAjax('test.php?t=2',null);
	// ]]>
	</script>

	<h1>Source</h1>
	<?php echo '<pre>', file_get_contents('./ajax.class.js'), '</pre>'; ?>
</body>
</html>