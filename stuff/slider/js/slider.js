jQuery(document).ready(function(){
	// image slider
	viewer_images = $('.gallery-viewer img');
	if(viewer_images.length > 1) {
		// create gallery nav bar
		navbar = '<ul class="gallery-nav">';
		for(i=0; i < viewer_images.length; i++) {
			navbar += '<li'+(i == 0 ? ' class="active"' : '')+'><a href="#">'+ (i + 1) +'</a></li>';
		}
		navbar += '</ul>';
		$('.gallery-viewer').parent().after(navbar);
	
		// assign slider functions
		active = 0;
		width = $('.gallery-viewer').width();
		sliding = false;
		$('.gallery-nav li a').each(function(i){
			// assign position reference
			$(this).attr('number',i);
			$(this).click(function(){
				if(sliding) { return false; } // don't do anything if we're already on the move
				number = $(this).attr('number'); // grab position reference
			
				if(active == number) { return false; } // if the active button is clicked, do nothing
				sliding = true; // enter sliding mode
			
				if(active < number) { // move to the right
					distance = ((active * width) - (number * width));
				}
				else { // move to the left
					distance = ((active * width) - (number * width));
				}
				$('.slider').animate({"left":'+='+distance},'slow','swing'); // slide...

				// switch active link styles
				$('.gallery-nav a[number="' + active +'"]').parent('li').removeClass('active');
				$(this).parent('li').addClass('active');
			
				active = number; // set new active
				sliding = false; // exit sliding mode
				return false; // return false so link doesn't activate
			});
		});
	}	
});