
/**
 * @fileoverview Simple Object Oriented Ajax Class
 *
 * @version 1.1
 *
 * @author Shawn Parker (shawn@topfroggraphics.com)
 */

/* @usage

	//-----------------------------------------------------------------------------------//

 	Basic usage is:

		 	// instantiate the class
		 	var myAjax = new oopAjax();

		 	// run the ajax call
		 	myAjax.doAjax( 'url/to/call.php', document.getElementById('foo') );


	url/to/call.php -- should be a valid relative or full url pointing to a publically
	accessible script. Doesn't have to be PHP - any language that can echo or print will do.

	document.getElementById('id') -- can be this or an actual object pointer to a valid
	html element in your page. If your custom script uses different methods that don't need
	this object pointer then just pass a null.

	//-----------------------------------------------------------------------------------//

	Extended usage is:

			// define a new subclass
			oopToo = function()
				{
					// grab inheritance from oopAjax
					this.inheritFrom = oopAjax;
					this.inheritFrom();

					// define new loaded function - refers to function defined below
					this.doWhenLoaded = newDoWhenLoaded;

					// a different way of defining new functionality
					this.doWhileLoading = function(targetObj)
						{
							targetObj.innerHTML = 'Loading even more content...';
						}
				}

			// define our new function for loading
			function newDoWhenLoaded(response, targetObj)
				{
					targetObj.innerHTML = 'secondary function: ' + response;
				}

			// lets set our target outside the function call this time
			var targetObj = document.getElementById('result');

			// instantiate the class
			myAjax = new oopToo();
			myAjax.doAjax('/url/to/call.php',targetObj);


	Here we make a subclass that inherits all functionality from the parent oopAjax class.
	the first two lines: this.inheritFrom = oopAjax; and this.inheritFrom(); will be the
	same across all subclasses.

	There are 3 functions designed to be overwitten: doWhileLoading, doOnError, doWhenLoaded
	doWhileLoading -- runs while request is being made
	doOnError -- runs in case an error is returned by the request
	doWhenLoaded -- runs on successful request to remote script

	//-----------------------------------------------------------------------------------//

	Embedding Code in HTML

	Preferred usage is to put this in an included file, but if you're gonna write the code
	directly into the page then use the tags below to do so. This is both backward compatable
	to browsers that don't understand Javascript and forward compatable to XHTML & XML.

	 	<script type="text/javascript">
	 		// <![CDATA[

	 			... script goes here

			// ]]>
		</script>

	//-----------------------------------------------------------------------------------//

	To be done

		- xmlHTTPRequests can be done to XML docs (per the name). Routine needs to be
		  added to handle this purpose.

		- xmlHTTPRequests can be done via POST instead of GET but is dependent upon browser
		  compatability. Routine needs to be added to judge compatability and switch down or
		  error out if POST is not available.

		- Create some shared functions for adding and deleting standard items using DOM.
		  Adding and deleting page elements is more forward compatable, though less easy
		  than innerHTML.

		- Add internal error handling for better handling of mis-configurations. It is
		  currently left to JavaScript with arguably has the worst error reporting in
		  the history of programming languages.

		- Add a delay function to help hold off new requests for a certain amount of time,
		  or to easily script a recurring refresh of content.

		- Find a better name? Some people thing this currently has a silly name... buttheads

	//-----------------------------------------------------------------------------------//
 */
function oopAjax() {
	/**
	 * Assign the method for successul requests
	 * privileged method
	 *
	 * @variable function
	 */
	this.doWhenLoaded = stdDoWhenLoaded;

	/**
	 * Assign the method for errors on request
	 * Privileged method
	 *
	 * @variable function
	 */
	this.doOnError = stdDoOnError;

	/**
	 * Assign the method for while loading process
	 * Privileged method
	 *
	 * @variable function
	 */
	this.doWhileLoading = stdDoWhileLoading;

	/**
	 * Start the XHR object
	 * Private Method
	 *
	 * @return object - XHR Object
	*/
	var startXMLReq = function() {
		// create request object pointer
		var request_obj = false;

		if(window.XMLHttpRequest) {
			// branch for native XHR
			try {
				request_obj = new XMLHttpRequest();
			} catch(e) {
				request_obj = false;
			}
		} else if(window.ActiveXObject) {
			// branch for IE/Windows
			try {
				request_obj = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					request_obj = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					request_obj = false;
				}
			}
		}

		// send object back
		return request_obj;
	}

	/**
	 * start our XHR object pointer
	 * Private variable
	 *
	 * @variable Object Pointer
	 */
	this.http = startXMLReq();

	/**
	 * Perform XHR
	 * Privileged method
	 *
	 * @param string requestUrl - our page that we're requesting
	 * @param string targetObj - Object Pointer
	 */
	this.doAjax = function(requestUrl, targetObj) {
		// if the script is processing already then abort the call
		if (this.http && this.http.readyState != 4) {
			this.http.abort();
		}

		// call script
		this.http.open('GET', requestUrl, true);

		// set a request type header
		this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		// to fix variable scoping, create a pointer to the class instance as a local variable
		var _this = this;

		// handle the response
		this.http.onreadystatechange = function() { _this.handleResponse(targetObj); }

		// I don't like this being here but it makes Safari behave
		this.doWhileLoading(targetObj);

		// send request
		this.http.send(null);
	}

	/**
	 * XHR Response Handler
	 * Privileged method
	 *
	 * @param Object Pointer
	 */
	this.handleResponse = function(targetObj) {
		/*
			Make sure the server is done by response code to XMLHttpRequest
			0 : Uninitialized - open() has not been called
			1 : Loading - send() has not been called
			2 : Loaded - send() has been called, headers and status are available
			3 : Interactive - Downloading, responseText holds partial data
			4 : Finished - all operations complete
		*/
		if(this.http.readyState == 4) {
			// only if server response is good
			if(this.http.status == 200) {
				// set response var to what was returned
				var response = this.http.responseText;

				// change browser to reflect change
				this.doWhenLoaded(response, targetObj);
			} else {
				// show server error here
				this.doOnError(this.http.StatusText, targetObj);
			}
		}
	}
}

/**
 * Do this on successful XHR
 * Public method
 *
 * @param string response - this is the response from the remote script
 * @param Object Pointer targetObj - this is the object we want to effect
 */
function stdDoWhenLoaded(response, targetObj) {
	targetObj.innerHTML = response;
}

/**
 * Do this on failed XHR
 * Public method
 *
 * @param string error - this is the error response from request process
 * @param Object Pointer targetObj - this is the object we want to effect
 */
function stdDoOnError(error, targetObj) {
	targetObj.innerHTML = 'Unable to load content, please contact an administrator';
}

/**
 * Do this on successful XHR
 * Public method
 *
 * @param Object Pointer targetObj - this is the object we want to effect
 */
function stdDoWhileLoading(targetObj) {
	targetObj.innerHTML = 'Loading content...';
}