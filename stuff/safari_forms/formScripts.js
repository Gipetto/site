/**
* Send focus to, or check, the form element
*
*/

function sendFocus(rObj)
{
	// grab the target element as an object
	var tObj = $(rObj.getAttribute('for'));

	// send focus or check it - but only if it exists
	if(tObj.type == 'radio' || tObj.type == 'checkbox')
	{
		tObj.checked = true;
	}
	else
	{
		tObj.focus();
	}
}

/*
* run through the labels on the page and tag them with onclicks
*/
function tag_Labels()
{
	// browser sniff
	//if(navigator.userAgent.indexOf('Safari') != -1)
	//{
		// grab all the label elements
		labels = document.getElementsByTagName('label');

		// loop through the gathered label elements
		for(var i = 0; i < labels.length; i++)
		{
			// only perform action if there is a for attribute
			if(labels[i].getAttribute('for'))
			{
				// attach the focus function
				labels[i].onclick = function() { sendFocus(this) }
			}
		}
	//}
}

/*
* Shorthand for document.getElementById
*
* @param objNm - name of the object to target
*/
function $(objNm)
{
	// IE will respond to this
	var isOldBrowser = document.all ? true: false;

	if(isOldBrowser)
	{
		// older IE, Icky
		return document.all[objNm];
	}
	else
	{
		// DOM Enabled, yummy
		return document.getElementById(objNm);
	}
}

/*
* run the tag labels on page load
* @usage if you already have an onload function then instead of
*        running this, add tag_Labels(); to your existing page onload function
*/
window.onload = tag_Labels;