<?php
/**
 * Addons Custom Post Type:
 */
/*
// pull the backend setting for the page.
$addon_landing_page_id = get_option( 'addon_page' );
  if(function_exists('icl_object_id')) {
    $addon_landing_page_id = icl_object_id($addon_landing_page_id, 'addon', false, ICL_LANGUAGE_CODE);
  }
*/

defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'Addons_Custom_Post_Type' ) ) {

	class Addons_Custom_Post_Type {

		public function __construct() {
            // register
			add_action( 'init', array( $this, 'addons_post_type' ) );
        }
        public function addons_post_type() {
			/* posttype template init
			-------------------------------------------------------------*/
			$template = array(
				array( 'cgb/addon-menu', array() ),
		    );
            /* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'Addons', 'post type general name' ),
				'singular_name'      => _x( 'Addon', 'post type singular name' ),
				'add_new'            => _x( 'Add New Addon', 'addon' ),
				'add_new_item'       => __( 'Add New Addon' ),
				'edit_item'          => __( 'Edit Addon' ),
				'new_item'           => __( 'New Addon' ),
				'all_items'          => __( 'Addons' ),
				'view_item'          => __( 'View Addon' ),
				'search_items'       => __( 'Search Addons' ),
				'not_found'          => __( 'No Addons found' ),
				'not_found_in_trash' => __( 'No Addons found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Addons' ),
			);
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Addon.',
				'public'        	 => true,
				'show_in_menu'  	 => 'edit.php?post_type=page',
				'show_in_nav_menus'	 => true,
				'menu_icon'          => 'dashicons-admin-page',
				/*'taxonomies' 		 => array('testimonial-category'),*/
				'supports'      	 => array( 'title', 'editor', 'custom-fields', 'page-attributes' /*'excerpt',  'thumbnail' */  ),
				'slug' 				 => 'addon',
				'has_archive'   	 => true,
				'hierarchical'   	 => false,
				'show_in_rest' 			=> true, // gutenberg
				//'template'           => $template,
			);
			register_post_type( 'addon', $args );

			register_meta('post', 'addon_feature_color', array(
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'object_subtype' => 'addon', // custom post type
			));
			register_meta('post', 'addon_feature_icon_unicode', array(
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'object_subtype' => 'addon', // custom post type
			));
			register_meta('post', 'addon_feature_icon_unicode_class', array(
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'object_subtype' => 'addon', // custom post type
			));
			
        }
    } // end class

	new Addons_Custom_Post_Type();
}

/* ----------------------------------------------------------
 *  Landing Page Setting:
 * add a custom option for the settings > reading settings page
 * see: https://wordpress.stackexchange.com/questions/293738/add-static-page-to-reading-settings-for-custom-post-type
 *-----------------------------------------------------------*/

/**
 * Register and define the settings
 */
add_action('admin_init', 'addon_admin_init');
function addon_admin_init(){

    // register our setting
    $args = array(
        'type' => 'string', 
        'sanitize_callback' => 'sanitize_text_field',
        'default' => NULL,
    );
    register_setting( 
        'reading', // option group "reading", default WP group
        'addon_page', // option name
        $args 
    );

    // add our new setting
    add_settings_field(
        'addon_page', // ID
        __('Addons Landing Page', 'textdomain'), // Title
        'addon_setting_callback_function', // Callback
        'reading', // page
        'default', // section
        array( 'label_for' => 'addon_page' )
    );
}

/**
 * Custom field callback
 */
function addon_setting_callback_function($args){
    // get saved project page ID
    $project_page_id = get_option('addon_page');

    // get all pages
    $args = array(
        'posts_per_page'   => -1,
        'orderby'          => 'name',
        'order'            => 'ASC',
        'post_type'        => 'page',
    );
    $items = get_posts( $args );

    echo '<select id="addon_page" name="addon_page">';
    // empty option as default
    echo '<option value="0">'.__('— Select —', 'wordpress').'</option>';

    // foreach page we create an option element, with the post-ID as value
    foreach($items as $item) {

        // add selected to the option if value is the same as $project_page_id
        $selected = ($project_page_id == $item->ID) ? 'selected="selected"' : '';

        echo '<option value="'.$item->ID.'" '.$selected.'>'.$item->post_title.'</option>';
    }

    echo '</select>';
}

/**
 * Add custom state to post/page list
 */
add_filter('display_post_states', 'addon_add_custom_post_states');

function addon_add_custom_post_states($states) {
    global $post;

    // get saved project page ID
    $project_page_id = get_option('addon_page');

    // add our custom state after the post title only,
    // if post-type is "page",
    // "$post->ID" matches the "$project_page_id",
    // and "$project_page_id" is not "0"
    if( 'page' == get_post_type($post->ID) && $post->ID == $project_page_id && $project_page_id != '0') {
        $states[] = __('Addons Landing Page', 'textdomain');
    }

    return $states;
}
/* ----------------------------------------------------------
 *  REGISTER MENU
 *-----------------------------------------------------------*/
//add_action( 'init', 'register_menus_addon' );
function register_menus_addon (){
	register_nav_menus( array(
		'addon_menu' => 'Addon Menu', 
	) );
}

/* ----------------------------------------------------------
 *  block menu output
 *-----------------------------------------------------------*/
/*register_block_type(
	'cgb/addon-menu',
	array(
		'render_callback' => 'dj_render_block_addon_menu',
	)
);*/
function dj_render_block_addon_menu( $attributes, $content ) { 
	$output = '';

	/*$output .= wp_nav_menu( array(
		'theme_location'  	=> 'addon_menu',
		'menu_class'    	=> 'nav navbar-nav addon_menu',
		'container'			=> false, 
		'fallback_cb'   	=> '__return_false',
		'items_wrap'   		=> '<nav role="navigation"><ul id="%1$s" class="%2$s">%3$s</ul></nav>',
		'depth'       		=> 2,
		'walker'      		=> new WP_Bootstrap_Navwalker(), 
		'echo'				=> false
	) );*/

	global $post;
	$args = array(
        'post_type' 		=> 'addon',
        'posts_per_page' 	=> '-1',
        'orderby' 			=> 'menu_order',
        'order' 			=> 'ASC'
	);
	
	$loop = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;

	if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();

		$title = get_the_title();
		

		$output .= $counter. $title;

		$counter++;

	endwhile; else:
	endif;
	wp_reset_postdata();

	return $output;
}
?>