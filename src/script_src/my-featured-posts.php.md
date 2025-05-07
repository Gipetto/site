---
layout: source
title: my-featured-posts.php
article: /2009/03/02/wordcamp_denver_2009-my_humble_experience/
---

{% highlight php linenos %}
<?php
/*
Plugin Name: My Featured Posts
Plugin URI: http://denver.wordcamp.org
Description:  Simple plugin to mark posts as featured. Extra comments added after the WordCamp presentation.
Version: 1
Author: Shawn Parker
Author URI: http://denver.wordcamp.org
*/

/**
 * This is a simple plugin written to illustrate the basics of how to develop plugins for WordPress.
 * It has no warranty and no intention of merchantability. It is simply here as an example of how content can
 * be manipulated in WordPress without modifying WordPress or the current Theme files.
 *
 * The code in this example should be followed from top to bottom as a procedure for adding a post meta box to 
 * the WordPress admin, then showing the featured status of the post, then adding a widget to show a list
 * of recent featured posts, then showing that same list at the bottom of each post.
 *
 * This document is long because it is (hopefully) verbosely commented to describe what each step is doing.
 *
 * A couple of things to note before we begin.
 * -	all the examples below use an mfp_ prefix. This is an easy way to separate your functions from other
 * 		functions and avoid name space conflicts in the event that another plugin choses the same name as yours.
 * 		mfp_admin_init is my safer than say my_admin_init
 * - 	The header sections (the first few lines at the top of this file) are required for WordPress to recognize
 * 		a php file as being a plugin.
 * - 	While it isn't necessary to comment your plugins as much as this one has been, it is prudent to document
 *		your plugin so much that someone who has never seen it before can come in and figure out what is going on.
 *		It may seem frivilous but when you come back to your plugin after 6 months of working on other things you
 *		will almost be like someone who has never seen the file before... ;) 
 * - 	If your plugin takes in content that is actually written by users then you'll want to "scrub" that data
 * 		before shoving it in your database. Basically: never trust user content! Always sanitize it to reduce the
 * 		chance of malicious things happening on your site.
 */

// ADMIN ACTIONS
	// tie a function in at admin init so we can add a post meta box
	add_action('admin_init', 'mfp_admin_init');

	/**
	 * add a post meta-box to the post-edit admin page
	 * also add our hook at save post so that we can attach our data as post-meta
	 */	
	function mfp_admin_init() {
		// tell WordPress the box id, box title, function to run to show the box, the page to display 
		// the box on, where to display the box, and what priority to assign to the box display
		add_meta_box('featured-post', 'FEATURED POST', 'mfp_meta_box', 'post', 'side', 'default');
		// hook on the the save_post action so that we can save our data at the same time the post is saved by WordPress
		add_action('save_post', 'mfp_save_post');
	}

	/**
	 * Display a select element in our meta-box
	 * I Chose a select element because its easier to only work on its returned data when we find the element in $_POST.
	 * This helps the data to be left alone if the post is later edited by an external client that doesn't get the 
	 * added benefit of seeing our select item.
	 *
	 * Actions are an opportunity to interject something in the page load sequence. You can do whatever you 
	 * need to do in an action and the action does not need to return any data.
	 *
	 * @param object $post - the current post object
	 * @param object $box - the current meta-box details
	 */
	function mfp_meta_box($post,$box) {
		// pull any existing post_meta data associated with this post, the true statement tells WordPress you're
		// only interested in the value, and to not return anything but the meta value. Default is to return the meta-key as well
		// @NOTE $post is an object which means its member variables are addressed differently than array data by using the -> operator.
		// Check out http://us3.php.net/manual/en/language.types.object.php for an introduction to PHP objects.
		$featured = get_post_meta($post->ID, '_mfp_is_featured', true);

		// display our meta-bax
		echo '
			<p class="meta_options">
				<label for="mfp_featured_post"><select name="mfp_featured_post" id="mfp_featured_post">
			 		<option value="0" ' . (is_null($featured) || $featured == '0' ? 'selected="selected" ' : '') . // *
					'>Not Featured</option>
				 	<option value="1" ' . ($featured == '1' ? 'selected="selected" ' : '') . // *
					'>Feature this post</option>
				</select>
			</p>
			';
		// * notation used here is called a ternary operator which basically written out is: if_this ? then_this : else_this
		// go to: http://us2.php.net/manual/en/language.operators.comparison.php#language.operators.comparison.ternary for more information
	}
	
	/**
	 * Save post handler
	 * Here we check for the presence of our $_POST content and save the appropriate data
	 *
	 * @param int $post_id - the id of the current post
	 * @param object $post - the current post object
	 */
	function mfp_save_post($post_id,$post) {
		// save post runs for active posts and for their revisions
		// we don't want to run on revisions so simply return if we're on a post revision
		if($post->post_type == 'revision') { 
			return; 
		}
		
		// only proceed if we find our content in $_POST
		// this way if the post was modified in, say, the iPhone client we don't change the 
		// data if the user wasn't presented with the means to do so.
		if(isset($_POST['mfp_featured_post'])) {
			// save the meta key name with a prefixed underscore so that it doesn't
			// show up in the custom post-meta section of the post-edit admin page
			update_post_meta($post_id, '_mfp_is_featured', $_POST['mfp_featured_post']);
		}
	}
	
// THE TITLE
	// attach to the_title filter so that we can prepend a "featured" flag to it
	add_filter('the_title', 'mfp_the_title');

	/**
	 * Prepend a flag to the beginning of the title to mark the post as featured.
	 * Filters modify information and then pass the information back out, be sure that after you modify the data
	 * that you give it back to WordPress so that your changes show up. Also, if you don't return information at all
	 * then the value gets nulled by your function.
	 *
	 * @param string $the_title - the current title string as selected by WordPress
	 * @return string
	 */
	function mfp_the_title($the_title) {
		// since we weren't give the post object, grab it from the global 
		// scope so that we can pull our information based on its ID
		global $post;
		
		// we only want to operate on titles in the main content area
		// to work everywhere simply remove the in_the_loop() check
		if(in_the_loop()) {
			// get and check the current value of the post-meta, output as necessary
			$featured = get_post_meta($post->ID, '_mfp_is_featured', true);
			if($featured == '1') {
				// prepend our flag to the beginning of the title
				$the_title = '<span class="mfp-featured">[FEATURED POST] </span>' . $the_title;
			}
		}
		// pass the data back to WordPress
		return $the_title;
	}

// WIDGET
	// hook in to widgets_init so that we can add our own widget
	add_action('widgets_init', 'mfp_widgets_init');

	/**
	 * Register a sidebar widget. This adds a widget box to WordPress' Widget admin screen
	 */
	function mfp_widgets_init() {
		// give WordPress the widget id, the widget title, and the function to use when displaying the widget
		wp_register_sidebar_widget('mfp-widget', 'My Featured Post', 'mfp_widget');
	}

	/**
	 * Function to display the widget
	 *
	 * @param string $args 
	 * @return void
	 */
	function mfp_widget($args) {
		// extract the WordPress defined args in to the local scope
		extract($args);

		// The bare minimums of displaying a widget
		// Use standard WordPress args for layout formatting included inside the
		// variables before_widget, after_widget, before_title, after_title.		
		// These can be modified globally by using the 'dynamic_sidebar_params' filter.
		echo $before_widget.
			$before_title.'My Featured Posts' . $after_title.
			mfp_featured_posts_list(5) . // pull our list from a reusable function that builds a list of featured posts
			$after_widget;
	}
	
	/**
	 * Get a list of featured posts
	 * Starts a new WP_Query object to query for just the posts we want.
	 * Only returns an array of the returned posts, not the whole object since we don't need
	 * the entire object for our purposes.
	 *
	 * @param int $showposts - number of posts to return 
	 * @return array
	 */
	function mfp_get_featured_posts($showposts = 5) {
		// most documentation shows the WP_Query object being modified with a string, but it can also
		// take arrays whice are much easier to construct and read in code
		$queryObject = new WP_Query(array(
			'showposts' => $showposts, 			// how many posts to retrieve
			'meta_key' => '_mfp_is_featured', 	// only pull the posts with out metadata
			'meta_value' => '1'					// only pull the posts who have 1 as a value to our metadata
		));
		// @NOTE if you plan to distribute your plugin this would be a good opportunity to add filter of your own
		// to the returned content to allow others to modify your plugin's behavior without actually having to modify your plugin
		return $queryObject->posts;
	}

	/**
	 * Build a list of featured posts
	 * Created as an individual function so that we can easily use this elsewhere as either direct output
	 * in a template or by another filter (as illustrated later on in this code)
	 *
	 * @param int $showposts - number of posts to put in the list
	 * @param string $id - id to give the list that we're building for easy css targeting
	 * @return void
	 */
	function mfp_featured_posts_list($showposts, $id = 'mfp-featured-posts-list') {
		// grab our list of featured posts
		$featured_posts = mfp_get_featured_posts($showposts);

		// start out dynamic list output
		$html = '<ul id="' . $id . '">';
		
		// only build the list if we have data to work on, just a security measure to keep PHP from barfing
		// warnings in to your logs, and possibly your screen, when the plugin is turned on and no featured post data is present
		if(count($featured_posts)) {
			foreach($featured_posts as $fp) {
				// use get_permalink to allow WordPress to apply permalink settings, and apply any the_title filters to your title output
				// applying filters ensures that any other filters that need to be run, possibly even your own, are consitently applied across the page load
				// each post is an object so we use the -> operator again to get at the post information
				$html .= '<li><a href="' . get_permalink($fp->ID) . '">' . apply_filters('the_title', $fp->post_title) . '</a></li>';
				// @NOTE the .= notation used above is an easy way to tack information on to the end of a string
			}
		} else {
			// give a nice message if there is nothing to display
			$html .= '<li>There are no featured posts at this time.</li>';
		}
		$html .= '</ul>';

		// return the list to who asked for it
		return $html;
	}


// THE CONTENT
	// attach to the_content filter so that we can add a list of featured posts at the bottom of every post
	add_filter('the_content', 'mfp_the_content');
	
	/**
	 * Append a list of featured posts to the content, but only on Single post pages
	 *
	 * @param string $the_content 
	 * @return void
	 */
	function mfp_the_content($the_content) {	
		// only operate on single post pages
		if(is_single()) {
			// add the list to the end of the content
			$the_content .= '<div id="more-featured-posts">
					<h2>Other Featured Posts</h2>
					' . mfp_featured_posts_list(10, 'more-featured-posts-list') . // pull our list from a reusable function that builds a list of featured posts
					'
				</div>
				';
		}
		// send the data back to WordPress
		return $the_content;
	}
?>
{% endhighlight %}