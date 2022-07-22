<?php
/* ----------------------------------------------------------
 * Custom post type:  Dita Roles dita-ccms-overview
 *-----------------------------------------------------------*/

defined( 'ABSPATH' ) || exit;



if ( !class_exists( 'CCMSVersion_Custom_Post_Type' ) ) {

	class CCMSVersion_Custom_Post_Type {

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
				'name'        		 => _x( 'CCMS Versions', 'post type general name' ),
				'singular_name'      => _x( 'CCMS Version', 'post type singular name' ),
				'add_new'            => _x( 'Add New CCMS Version', 'dita-ccms-add-ons' ),
				'add_new_item'       => __( 'Add New CCMS Version' ),
				'edit_item'          => __( 'Edit CCMS Version' ),
				'new_item'           => __( 'New CCMS Version' ),
				'all_items'          => __( 'CCMS Versions' ),
				'view_item'          => __( 'View CCMS Version' ),
				'search_items'       => __( 'Search CCMS Versions' ),
				'not_found'          => __( 'No CCMS Versions found' ),
				'not_found_in_trash' => __( 'No CCMS Versions found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'CCMS Versions' ),
            );
            
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'CCMS Version.',
				'public'        	 => true,
                'show_in_menu'  	 => 'edit.php?post_type=page',
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-admin-page',
				//'taxonomies' 		 => array('addon_category'),
                'supports'      	 => array( 'title', 'editor', 'page-attributes', 'excerpt', 'custom-fields', 'thumbnail'   ),
                'rewrite' => [
                    'slug' => 'documentation-guide',
                    'with_front' => false
                ],
				'has_archive'   	 => true,
				'hierarchical'   	 => true,
				'show_in_rest' 			=> true, // gutenberg
				//'template'           => $template,
			);
            register_post_type( 'ccms-version', $args );

            /* custom meta fields
            -------------------------------------------------------------*/
            register_meta('post', 'post_release_date', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'ccms-version', // custom post type
            ));
            register_meta('post', 'post_color', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'ccms-version', // custom post type
            ));
            register_meta('post', 'post_color_class', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'ccms-version', // custom post type
            ));
            register_meta('post', 'post_background_color_class', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'ccms-version', // custom post type
            ));
            register_meta('post', 'post_nav_style', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'ccms-version', // custom post type
            ));
            
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
                'ccmsversion_page', // option name
                $args 
            );

            // add our new setting
            add_settings_field(
                'ccmsversion_page', // ID
                __('CCMS Versions Landing Page', 'textdomain'), // Title
                array( $this, 'setting_callback_function'), // Callback
                'reading', // page
                'default', // section
                array( 'label_for' => 'ccmsversion_page' )
            );

        }

        
        public function setting_callback_function($args){
            
            /* Setting callback function
            -------------------------------------------------------------*/

            // get saved project page ID
            $project_page_id = get_option('ccmsversion_page');

            // get all pages
            $args = array(
                'posts_per_page'   => -1,
                'orderby'          => 'name',
                'order'            => 'ASC',
                'post_type'        => 'page',
            );
            $items = get_posts( $args );

            echo '<select id="ccmsversion_page" name="ccmsversion_page">';
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
            $project_page_id = get_option('ccmsversion_page');

            // add our custom state after the post title only,
            // if post-type is "page",
            // "$post->ID" matches the "$project_page_id",
            // and "$project_page_id" is not "0"
            if( 'page' == get_post_type(get_the_ID()) && get_the_ID() == $project_page_id && $project_page_id != '0') {
                $states[] = __('CCMS Versions Landing Page', 'textdomain');
            }

            return $states;
        }

        /* ----------------------------------------------------------
        *  Include archive custom template
        * see: https://wordpress.stackexchange.com/questions/115968/create-a-custom-archive-page-for-a-custom-post-type-in-a-plugin
        *-----------------------------------------------------------*/
        function archive_template( $template ) {
            if ( is_post_type_archive('ccms-version') ) {
                $theme_files = array('archive-ccms-version.php');
                $exists_in_theme = locate_template($theme_files, false);
                if ( $exists_in_theme != '' ) {
                    return $exists_in_theme;
                } else {
                    return plugin_dir_path(__FILE__) . 'archive-ccms-version.php';
                }
            }
            return $template;
        }
    } // end class

	new CCMSVersion_Custom_Post_Type();
}

register_block_type(
	'cgb/posts-ccms-versions',
	array(
		'attributes'      => array(
			'className'       => array(
				'type' => 'string',
			),
			'align'       => array(
				'type' => 'string',
			),
			'toggleContent' => array(
				'type' => 'boolean',
				'default' => false,
			),
			'rangeColumns' => array(
				'type' => 'number',
				'default' => 2,
			),
			'readmore'       => array(
				'type' => 'string',
				'default' => 'Learn More',
            ),
            'archiveHeading'       => array(
				'type' => 'string',
                'default' => 'Archives',
			),
            'archiveSelect'       => array(
				'type' => 'string',
                'default' => 'show-recent-documentation',
			),
		),
		'render_callback' => 'dj_render_block_ccms_versions',
	)
);

/**
 * The gutenberg block 
 *
 */
function dj_render_block_ccms_versions( $attributes, $content ) {

	$blockOutput = '';
	$thisPageId = get_the_ID();

	/* block attributes
 	*-----------------------------------------------------------*/
	$className = '';
	if ( isset( $attributes['className'] ) ) {
		$className .= ' ' . $attributes['className'];
	}

	$align = '';
	if ( isset( $attributes['align'] ) ) {
		$className .= ' align' . $attributes['align'];
	}

	$content_display = '';
	if ( isset( $attributes['toggleContent'] ) ) {
		$content_display .= $attributes['toggleContent'];
	}

	$range_columns = '';
	if ( isset( $attributes['rangeColumns'] ) ) {
		$range_columns .= $attributes['rangeColumns'];
	}

	$readmore = '';
	if ( isset( $attributes['readmore'] ) ) {
		$readmore .= $attributes['readmore'];
    }

    $archiveHeading = '';
	if ( isset( $attributes['archiveHeading'] ) ) {
		$archiveHeading .= $attributes['archiveHeading'];
	}
    
    $archiveSelect = '';
	if ( isset( $attributes['archiveSelect'] ) ) {
		$archiveSelect .= $attributes['archiveSelect'];
	}

	$blockOutput .= '<div class="wp-block-cgb-ccms-versions '.$className.'"><div class="row">';
	/* ----------------------------------------------------------
	*  	documentation ccms-version - the loop
	*-----------------------------------------------------------*/

	global $post;
	$args = array(
        'post_type' 		=> 'ccms-version',
        /*'orderby' 			=> 'menu_order',
        'order' 			=> 'ASC',*/
        'post_parent' => 0,
	);

    //$args['posts_per_page'] = '6';
    if ( isset( $attributes['archiveSelect'] ) ) {
		if ($archiveSelect == 'show-recent-documentation'){
            $args['posts_per_page'] = '6';
        } else if ($archiveSelect == 'show-archive-documentation'){
            $args['posts_per_page'] = '999'; // -1 doesn't work with offset
            $args['offset'] = '6';
        }
	}


	$loop = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;

    $cardOutput ='';
    $archiveHeadingDisplay = '';
    $archiveOutput = '';
    $archiveLinks = '';
	
	if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();

		$img_url = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'large');
		$img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), 'large' );
		$img_alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
		if (!$img_alt) { $img_alt = get_the_title($post->ID); }
		
		if ($content_display == false) {
			$content = apply_filters('the_content',  ( get_post($post->ID)->post_excerpt) );
		} else {
			$content = apply_filters('the_content',  ( get_post($post->ID)->post_content) );
		}
		
		$title = get_the_title($post->ID);
        $url = get_permalink($post->ID);
        $release_notes_url = $url.'release-notes';
        $release_date = get_post_meta(get_the_ID(), 'post_release_date', true);

        $post_color_class = get_post_meta(get_the_ID(), 'post_color_class', true);
        $post_background_color_class = get_post_meta(get_the_ID(), 'post_background_color_class', true);

        /* format date */
        if (!$release_date) {
            $release_date = get_the_date();   
        } 

        $datetime = date( 'c',strtotime($release_date) );
        $time = date( 'F j, Y',strtotime($release_date) );
        
        if(function_exists('icl_object_id')) {
            // french & japanese date formatting
            if(ICL_LANGUAGE_CODE=='fr'){
                $time = dateToFrench($release_date,'j F Y');
            } else if(ICL_LANGUAGE_CODE=='ja'){
                // TODO: verify format is working correctly
                $time = date( '%Y年%B%e日(%a)',strtotime($release_date) );
            }
        }

        $displayDate = '<time datetime="'.$datetime.'" class="wp-block-latest-posts__post-date">'.$time.'</time>';
		
		/*$job_title = get_post_meta( get_the_ID(), 'team-title', true );
		$linkedin = get_post_meta( get_the_ID(), 'linkedin-href', true );*/

		$column_class = 'col-sm-6';
		if ($range_columns == 3) {
			$column_class = 'col-md-6 col-lg-4';
		} else if ($range_columns == 2) {
			$column_class = 'col-sm-6';
		}
		
		/* card content
        *-----------------------------------------------------------*/

        //if ($counter < 6) {
            $cardOutput .= '<div class="card-column '.$column_class.'">
                                <div class="wp-block-cgb-card card h-100">
                                    <figure class="card-img-top text-center">
                                        <img class="img-fluid" src="'. esc_url( $img_url ).'"
                                            srcset="'.esc_attr( $img_srcset ).'"
                                            sizes="(max-width: 50em) 100vw, 100%" class="" alt="'.esc_attr( $img_alt ).'">
                                    </figure>
                                   
                                    <div class="card-body text-center"> ';
                                    
                                        if ($counter == 0) {
                                            $iconUnicode = '&#xf005;';
                                        } else {
                                            $iconUnicode = '&#xf108;';
                                        }
                                        $iconDisplay = '<div class="wp-block-cgb-icon-button undefined is-style-icon-md '.$post_color_class.' is-style-offset-top is-style-icon-fill"><div class="icon-button link-disabled"><i class="fa fas"><span class="sr-only">Monitor</span>'. $iconUnicode .'</i></div></div>';
                                        $cardOutput .= $iconDisplay;
                                        
                                        if ($release_date){
                                            $cardOutput .= $displayDate;
                                        }
                                        $cardOutput .= '<h3 class="card-title">'. $title.'</h3>';
                                        
                                        $cardOutput .= $content;

                                    $cardOutput .= '</div>';
                                    /* depricated, dj.
                                    $blockOutput .= '<div class="wp-block-buttons card-footer">
                                    <div class="wp-block-button aligncenter"><a class="wp-block-button__link has-theme-white-color '.$post_background_color_class.' has-text-color has-background no-border-radius" href="'.$url.'" title="Documentation: '.$title.'">'.$readmore.'</a></div><div class="wp-block-button aligncenter"><a class="wp-block-button__link has-theme-white-color '.$post_background_color_class.' has-text-color has-background no-border-radius" href="'.$release_notes_url.'" title="Release Notes: '.$title.'">'.__('Release Notes', 'paintedrobot').'</a></div>
                                    </div>';
                                    */
                                    $cardOutput .= '<div class="wp-block-buttons card-footer">
                                    <div class="wp-block-button aligncenter"><a class="wp-block-button__link has-theme-white-color '.$post_background_color_class.' has-text-color has-background no-border-radius" href="'.$url.'" title="Documentation: '.$title.'">'.$readmore.'</a></div>
                                    </div>';

							
							
                                    $cardOutput .= '</div></div>';
       /*} else {
            
            if ($archiveHeadingDisplay != $archiveHeading) {
                $archiveHeadingDisplay = $archiveHeading;
                $archiveOutput .= '</div><h2 class="archive-heading has-text-align-center is-style-heading-style-1">'.$archiveHeadingDisplay.'</h3>';
            }
            $archiveLinks .= '<a href="'.$url.'" title="Documentation: '.$title.'" class="ccms-versions-archive-link">'.$title.'</a>';
            
        }*/
		
        $counter++;

	endwhile; else:
	endif;
	wp_reset_postdata();
    $blockOutput .= $cardOutput . $archiveOutput. '<div class="row"><div class="col-sm-12">'.$archiveLinks.'</div></div></div></div>'; // row


	//return $blockOutput;

    return 'Under construction - testing';
}





?>