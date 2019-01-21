var embed_flash_video = Class.create();
embed_flash_video.prototype = {
	VERSION: 1.5,
	AUTHOR: 'Shawn Parker, shawn@topfroggraphics.com',
	/**
	 * Put new video embed strings here
	 * If url does not contain an id in a traditional query fashion
	 * a special condition may need to be added to the get_vars 
	 * function to properly pull the video id
	 *
	 * If the video service makes embedding via the straight url 
	 * not possible *cough:yahoodorks:cough*, the define the link
	 * with just {} and it will be appended with an opener to allow 
	 * for it to be opened in a new window
	 */
	link_strings: {
		// this first set works with just the url as it displays in the browser's nav bar
		'video.google.com': {param:'docid', embed:'<embed style="width:400px; height:326px;" id="VideoPlayback" type="application/x-shockwave-flash" src="http://video.google.com/googleplayer.swf?docId=__docid__" flashvars=""></embed>'},
		'youtube.com': {param:'v', embed:'<object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/__v__&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/__v__&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>'},
		'collegehumor.com': {param:'movie', embed:'<object type="application/x-shockwave-flash" data="http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=__movie__&fullscreen=1" width="480" height="360" ><param name="allowfullscreen" value="true" /><param name="movie" quality="best" value="http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=__movie__&fullscreen=1" /></object>'},
		'metacafe.com': {param:'id', embed:'<embed src="http://www.metacafe.com/fplayer/__id__.swf" width="400" height="345" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"> </embed>' },
		'livevideo.com': {param:'cid', embed:'<embed src="http://www.livevideo.com/flvplayer/embed/__cid__" type="application/x-shockwave-flash" quality="high" WIDTH="445" HEIGHT="369" wmode="transparent"></embed>'},
		'5min.com': {param:'id', embed:"<object width='400' height='325' id='FiveminPlayer'><param name='allowfullscreen' value='true'/><param name='allowScriptAccess' value='always'/><param name='movie' value='http://www.5min.com/Embeded/__id__/'/><embed src='http://www.5min.com/Embeded/__id__/' type='application/x-shockwave-flash' width='400' height='325' allowfullscreen='true' allowScriptAccess='always'></embed></object>"},
		'liveleak.com': {param: 'i', embed: '<object type="application/x-shockwave-flash" width="450" height="370" wmode="transparent" data="http://www.liveleak.com/player.swf?autostart=false&token=__i__"><param name="movie" value="http://www.liveleak.com/player.swf?autostart=false&token=__i__"><param name="wmode" value="transparent"><param name="quality" value="high"></object>'},
		'retrogamevideos.com': {param: 'v', embed: '<embed src="http://www.retrogamevideos.com/player/mediaplayer.swf" width="480" height="360" flashvars="&file=http://www.retrogamevideos.com/f/__v__&height=360&width=480" />'},
		// The next group only work if using the permalink address 
		'crackle.com': {param: {id:'id', name:'name', ml:'ml'}, embed:'<embed src="http://crackle.com/p/Shorts/__name__.swf" quality="high" bgcolor="#869ca7" width="400" height="325" name="mtgPlayer" align="middle" play="true" loop="false" allowFullScreen="true" flashvars="mu=0&ap=0&ml=__ml__&id=__id__" quality="high" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer"> </embed>'},
		// the following services don't post the real movie id in the url, they'll require special instructions to
		// the user or just a big fuck you to the idiots who thought that was a good idea
		'video.yahoo.com': {},
		'pornotube.com': {},
		'dailymotion.com': {},
		'web.slashcast.net': {},
		'podtech.net': {},
		'break.com': {},
		'retrogamevideos.com': {},
		'floobster.com': {} // never gonna work, it wants to write a JS tag, prototype.js evals it while not in the page so it don't work
	},
	link_regx: {},
	links: {},

/*
<embed src="http://www.retrogamevideos.com/player/mediaplayer.swf" width="480" height="360" flashvars="&file=http://www.retrogamevideos.com/f/ec2e0716&height=360&width=480" />
*/

	// constructor
	initialize: function()
	{
		// a shorter array we can iterate to compare against links
		this.link_regx = Object.keys(this.link_strings); 
		// build css selection string
		var selector_string = '';
		var i = 0;
		for(a in this.link_strings) { selector_string += (++i > 1 ? ',' : '') + 'a:link[href*="' + a + '"]';  }
		this.links = $A($$(selector_string)); // pull our relevant links
		// iterate
		this.links.each(function(link) {
				this.embed(link);
			}.bind(this));
	},
	
	emblemize: function(link)
	{
		
	},
	
	// our main function
	embed: function(link)
	{	
		this.link_regx.each(function(r) {
			if(link.href.match(r) !== null) 
			{ 				
				if(this.link_strings[r].param && (link.href == link.innerHTML.unescapeHTML()))
				{
					var params = this.get_vars(link.href,r);
					if(typeof(this.link_strings[r].param) == 'object')
					{
						var emb = this.link_strings[r].embed;
						for(i in this.link_strings[r].param) { emb = emb.gsub('__' + i + '__',params[i]); }
						link.replace(emb);
					}
					else { link.replace(this.link_strings[r].embed.gsub('__' + this.link_strings[r].param + '__',params[this.link_strings[r].param])); }
				}
				else
				{
					link.addClassName('videosite');
				}
			}
		}.bind(this));
	},
	
	// return query string or site specific vars to get movie id
	get_vars: function(href,src)
	{
		if(src == 'collegehumor.com') { return {movie: href.substr(href.indexOf('video:')+6)}; }
		else if(src == 'metacafe.com') { return {id: href.substr(href.indexOf('watch/')+6,((href.length-1)-(href.indexOf('watch/')+6))) }; }
		else if(src == '5min.com') { return {id:href.match(/([0-9]+)$/gm)}; }
		else if(src == 'crackle.com')
		{
			var p = href.split('/');
			var params = {id:'', ml:'', name:''};
			params.id = p[p.length-2];
			params.name = p[p.length-3];
			params.ml = p[p.length-1].substr(4);
			return params;
		}
		else if(src == 'livevideo.com')
		{
			if(href.indexOf('cid') == -1)
			{
				var p = href.split('/');
				return {cid:p[p.length-2] };
			}
			else { return href.toQueryParams(); }
		}
		else { return href.toQueryParams(); }
	}
};

Event.observe(window,'load',function() { new embed_flash_video(); },false);