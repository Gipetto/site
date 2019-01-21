// ebmed youtube and google video links in a web page
// @author - Shawn Parker, shawn@topfroggraphics.com
//
// I accept any and all comments, criticisms and suggestions
// please feel free to contact me if you find anything about
// this script that could be added to, fixed or improved upon.
//
// Version 1.1
// Updated to use innerHTML instead of DOM so that more browsers
// can be accomodated. The time for DOM snobbery is over. There
// is still a requirement for a browser that can traverse the dom
// the dom is just no longer used to replace the elements (which is
// where IE and fringe browsers tend to fail)
//
// Tested and working with:
// 		Safari
//		Firefox 1.5+ Mac & Win
//		Opera 8.5+ Mac & Win
//		Internet Explorer 7
//
//		IE 6 will show Google Video, but not YouTube
//
// @warranty - none
//
// @rights - do what you will. Really - its just a simple javascript.
//
// @use - simply include this script in the head of your document and
//        it'll take care of the rest.

function embed_yt_gv()
{
	// run it all
	//
	// @return bool
	this.embed_videos = function()
	{
		// be a stodgy bitch - only work for browsers that can traverse the DOM
		if(!document.getElementById)
		{
			alert('This page uses a script that embeds YouTube and Google video into the page. This script requires a browser that has a modern' +
				  'Javascript implementation. Your browser does not. Please consider upgrading your browser');
			return false;
		}

		// get page links
		var links = this.get_yt_gv_links();

		if(links != null)
		{
			// _this fixes variable scoping - not sure how, but it does
			var _this = this;

			// loop through and manipulate the links
			for(var i = 0; i < links.length; i++) { _this.link_router(links[i]); }
		}
		else
		{
			return false;
		}
	}

	// get all the links in a page
	//
	// @return obj - HTML link objects
	this.get_yt_gv_links = function()
	{
		var page_links = document.getElementsByTagName('a');
		var embed_links = new Array();
		var type;
		for(var i = 0; i < page_links.length; i++)
		{
			// look for:
			//		youtube.com/watch
			//		video.google.com/videoplay
			if( page_links[i].href.match(/youtube.com\/watch|video.google.com\/videoplay/gi) )
			{
				// assign a type to this object
				page_links[i].type = page_links[i].href.match(/google/gi) ? 'google' : 'youtube';

				// add it to the array
				embed_links.push(page_links[i]);
			}
		}

		if(embed_links.length > 0) { return embed_links; }
		else { return null; }

	}

	// route links to proper processor
	//
	// @param obj - html link
	this.link_router = function(link)
	{
		if(link.type == 'google') { this.replace_google_link(link); }
		else { this.replace_youtube_link(link); }
	}

	// replace individual google link
	//
	// @param object link
	this.replace_google_link = function(link)
	{
		// get link
		var googleVars = this.get_key_value_pairs(this.get_query_string(link.href));
		// write to page
		link.parentNode.innerHTML = '<embed src="http://video.google.com/googleplayer.swf?docId=' + googleVars['docid'] +
									'" type="application/x-shockwave-flash" id="VideoPlayback" height="326" width="400">';
	}

	// replace individual youtube link
	//
	// @param object link
	this.replace_youtube_link = function(link)
	{
		// get link
		var strippedLink = link.href.split(/&/gm);
		var processedLink = strippedLink[0].replace(/(\/watch\?)|(=)/gm, "/");

		// write to page
		link.parentNode.innerHTML = '<object width="425" height="350"><param name="movie" value="' + processedLink +
									'"></param><embed src="' + processedLink +
									'" type="application/x-shockwave-flash" width="425" height="350"></embed></object>';
	}

	// Get the query string of a url
	//
	// @param string - url
	// @return string - get vars
	this.get_query_string = function(uri)
	{
		return uri.substr(uri.indexOf('?')+1);
	}


	// get the key/value pairs of a GET string
	//
	// @param string - GET string
	// @return array - key/value pairs
	this.get_key_value_pairs = function(get_string)
	{
		// break string into pair strings
		var parts = get_string.split(/&/);

		if(parts.length > 0)
		{
			// array for our key/value pairs
			var get_vars = new Array();
			var temp;
			// get key/value pairs
			for(var i = 0; i < parts.length; i++)
			{
				temp = parts[i].split(/=/);
				get_vars[temp[0]] = temp[1];
			}

			return get_vars;
		}
		else
		{
			return false
		}

	}

	// run it automatically
	this.embed_videos();
}

// attach to page load
window.onload = function()
{
	var emb = new embed_yt_gv();
}