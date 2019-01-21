jQuery(document).ready(function(){
	// image slider
	if(viewer_images = $('.gallery-viewer img')) {
		active = 0;
		width = $('.gallery-viewer').width();
		sliding = false;
		// create gallery nav bar
		$('.gallery-viewer').parent().after('<ul class="gallery-nav">');
		viewer_images.each(function(i){
			var $a = $('<a>').appendTo('<li'+(i == 0 ? ' class="active"' : '')+'>')
						.parent().appendTo(".gallery-nav").end()
						.html(i+1).attr({'href':"#",'number':i}).click(function(){
							number = $(this).attr('number'); // grab position reference
							if(sliding || active == number) { return false; } // don't do anything if we're already on the move or this is the active image

							sliding = true; // enter sliding mode

							var distance = ((active * width) - (number * width));
							$('.slider').animate({"left":'+='+distance},'slow','swing'); // slide...

							// switch active link styles
							$('.gallery-nav a[number="' + active +'"]').parent('li').removeClass('active');
							$(this).parent('li').addClass('active');
							window.location.hash = i+1;

							active = number; // set new active
							sliding = false; // exit sliding mode
							return false; // return false so link doesn't activate
						});
		});
		// if there's a hash value, try to use it to target a default slider position
 		$('.gallery-nav a[number="' + (parseInt(document.location.hash.replace('#',''))-1) + '"]').trigger('click');
	}    
});