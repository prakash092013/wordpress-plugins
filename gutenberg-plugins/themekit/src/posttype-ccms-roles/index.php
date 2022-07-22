<?php
/* ----------------------------------------------------------
 * Custom post type:  Dita Roles dita-ccms-overview
 *-----------------------------------------------------------*/

defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'DitaRoles_Custom_Post_Type' ) ) {

	class DitaRoles_Custom_Post_Type {

		public function __construct() {
            // register
            add_action( 'init', array( $this, 'custom_post_type' ) );

            // add a custom option for the settings > reading settings page
            // see: https://wordpress.stackexchange.com/questions/293738/add-static-page-to-reading-settings-for-custom-post-type
            add_action('admin_init', array( $this, 'settings_reading_admin_init') );

            // page listing displays the post which is applied to this setting
            add_filter('display_post_states', array( $this, 'add_custom_post_states') );

            // include archive template for custom post
            add_filter('template_include', array( $this, 'archive_template'));
        }
        public function custom_post_type() {
			
            /* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'CCMS Roles', 'post type general name' ),
				'singular_name'      => _x( 'CCMS Role', 'post type singular name' ),
				'add_new'            => _x( 'Add New CCMS Role', 'dita-ccms-add-ons' ),
				'add_new_item'       => __( 'Add New CCMS Role' ),
				'edit_item'          => __( 'Edit CCMS Role' ),
				'new_item'           => __( 'New CCMS Role' ),
				'all_items'          => __( 'CCMS Roles' ),
				'view_item'          => __( 'View CCMS Role' ),
				'search_items'       => __( 'Search CCMS Roles' ),
				'not_found'          => __( 'No CCMS Roles found' ),
				'not_found_in_trash' => __( 'No CCMS Roles found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'CCMS Roles' ),
            );
            
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'CCMS Role.',
				'public'        	 => true,
                'show_in_menu'  	 => 'edit.php?post_type=page',
				'show_in_nav_menus'	 => true,
				'menu_icon'          => 'dashicons-admin-page',
				//'taxonomies' 		 => array('addon_category'),
                'supports'      	 => array( 'title', 'editor', 'page-attributes' /*'excerpt',  'thumbnail' */  ),
                'rewrite' => [
                    'slug' => 'product-services/ccms-roles',
                    'with_front' => false
                ],
				'has_archive'   	 => true,
				'hierarchical'   	 => true,
				'show_in_rest' 			=> true, // gutenberg
				//'template'           => $template,
			);
            register_post_type( 'dita-ccms-overview', $args );

            
        }
        
        public function settings_reading_admin_init(){
            
            /* Register and define the settings
            -------------------------------------------------------------*/
            /*
            // pull the backend setting for the page.
            $landing_page_id = get_option( 'ditarole_page' );
            if(function_exists('icl_object_id')) {
                $landing_page_id = icl_object_id($landing_page_id, 'page', false, ICL_LANGUAGE_CODE);
            }
            */

            // register our setting
            $args = array(
                'type' => 'string', 
                'sanitize_callback' => 'sanitize_text_field',
                'default' => NULL,
            );
            register_setting( 
                'reading', // option group "reading", default WP group
                'ditarole_page', // option name
                $args 
            );

            // add our new setting
            add_settings_field(
                'ditarole_page', // ID
                __('CCMS Roles Landing Page', 'textdomain'), // Title
                array( $this, 'setting_callback_function'), // Callback
                'reading', // page
                'default', // section
                array( 'label_for' => 'ditarole_page' )
            );

        }

        
        public function setting_callback_function($args){
            
            /* Setting callback function
            -------------------------------------------------------------*/

            // get saved project page ID
            $project_page_id = get_option('ditarole_page');

            // get all pages
            $args = array(
                'posts_per_page'   => -1,
                'orderby'          => 'name',
                'order'            => 'ASC',
                'post_type'        => 'page',
            );
            $items = get_posts( $args );

            echo '<select id="ditarole_page" name="ditarole_page">';
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

        function add_custom_post_states($states) {
            
            /* display setting next to page listing
            -------------------------------------------------------------*/
            
            global $post;

            // get saved project page ID
            $project_page_id = get_option('ditarole_page');

            // add our custom state after the post title only,
            // if post-type is "page",
            // "$post->ID" matches the "$project_page_id",
            // and "$project_page_id" is not "0"
            if( 'page' == get_post_type(get_the_ID()) && get_the_ID() == $project_page_id && $project_page_id != '0') {
                $states[] = __('Dita Roles Landing Page', 'textdomain');
            }

            return $states;
        }

        /* ----------------------------------------------------------
        *  Include archive custom template
        * see: https://wordpress.stackexchange.com/questions/115968/create-a-custom-archive-page-for-a-custom-post-type-in-a-plugin
        *-----------------------------------------------------------*/
        function archive_template( $template ) {
            if ( is_post_type_archive('dita-ccms-overview') ) {
                $theme_files = array('archive-dita-ccms-overview.php');
                $exists_in_theme = locate_template($theme_files, false);
                if ( $exists_in_theme != '' ) {
                    return $exists_in_theme;
                } else {
                    return plugin_dir_path(__FILE__) . 'archive-dita-ccms-overview.php';
                }
            }
            return $template;
        }
    } // end class

	new DitaRoles_Custom_Post_Type();
}









?>
