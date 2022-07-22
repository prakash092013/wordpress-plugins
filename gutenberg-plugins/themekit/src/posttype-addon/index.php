<?php
/**
 * Addons Custom Post Type:
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
				'add_new'            => _x( 'Add New Addon', 'dita-ccms-add-ons' ),
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
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-admin-page',
				//'taxonomies' 		 => array('addon_category'),
                'supports'      	 => array( 'title', 'editor', 'page-attributes' /*'excerpt',  'thumbnail' */  ),
                'rewrite' => [
                    'slug' => 'products-services/dita-ccms-addons',
                    'with_front' => false
                ],
				'has_archive'   	 => true,
				'hierarchical'   	 => true,
				'show_in_rest' 			=> true, // gutenberg
				//'template'           => $template,
			);
            register_post_type( 'dita-ccms-add-ons', $args );

            
        }
    } // end class

	new Addons_Custom_Post_Type();
}


/* ----------------------------------------------------------
 *  Settings > reading: Set landing page for post type
 * add a custom option for the settings > reading settings page
 * see: https://wordpress.stackexchange.com/questions/293738/add-static-page-to-reading-settings-for-custom-post-type
 *-----------------------------------------------------------*/
/*
// pull the backend setting for the page.
$addon_landing_page_id = get_option( 'addon_page' );
if(function_exists('icl_object_id')) {
    $addon_landing_page_id = icl_object_id($addon_landing_page_id, 'addon', false, ICL_LANGUAGE_CODE);
}
*/
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
    if( 'page' == get_post_type(get_the_ID()) && get_the_ID() == $project_page_id && $project_page_id != '0') {
        $states[] = __('Addons Landing Page', 'textdomain');
    }

    return $states;
}


add_filter('template_include', 'lessons_template');

/* ----------------------------------------------------------
 *  Include archive custom template
 * see: https://wordpress.stackexchange.com/questions/115968/create-a-custom-archive-page-for-a-custom-post-type-in-a-plugin
 *-----------------------------------------------------------*/
function lessons_template( $template ) {
  if ( is_post_type_archive('dita-ccms-add-ons') ) {
    $theme_files = array('archive-dita-ccms-add-ons.php');
    $exists_in_theme = locate_template($theme_files, false);
    if ( $exists_in_theme != '' ) {
      return $exists_in_theme;
    } else {
      return plugin_dir_path(__FILE__) . 'archive-dita-ccms-add-ons.php';
    }
  }
  return $template;
}

?>
