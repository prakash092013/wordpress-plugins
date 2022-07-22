<?php
/* ----------------------------------------------------------
 * Custom post type:  Dita Roles dita-ccms-overview
 *-----------------------------------------------------------*/

defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'Events_Custom_Post_Type' ) ) {

	class Events_Custom_Post_Type {

		public function __construct() {
            // register
            add_action( 'init', array( $this, 'custom_post_type' ) );

            // add a custom option for the settings > reading settings page
            // see: https://wordpress.stackexchange.com/questions/293738/add-static-page-to-reading-settings-for-custom-post-type
            add_action('admin_init', array( $this, 'settings_reading_admin_init') );

            // page listing displays the post which is applied to this setting
            //add_filter('display_post_states', array( $this, 'add_custom_post_states') );

            // include archive template for custom post
            add_filter('template_include', array( $this, 'single_event_template'));

            // shortcode for use in grid 3rd party plugin
            //add_shortcode( 'pr_date', array( $this, 'pr_date_shortcode') );
            
        }
        public function custom_post_type() {
			
            /* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'Events', 'post type general name' ),
				'singular_name'      => _x( 'Event', 'post type singular name' ),
				'add_new'            => _x( 'Add New Event', 'dita-ccms-add-ons' ),
				'add_new_item'       => __( 'Add New Event' ),
				'edit_item'          => __( 'Edit Event' ),
				'new_item'           => __( 'New Event' ),
				'all_items'          => __( 'Events' ),
				'view_item'          => __( 'View Event' ),
				'search_items'       => __( 'Search Events' ),
				'not_found'          => __( 'No Events found' ),
				'not_found_in_trash' => __( 'No Events found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Events' ),
            );
            
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Event.',
				'public'        	 => true,
                'show_in_menu'  	 => true,
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-calendar-alt',
				'taxonomies' 		 => array('location', 'event-type'),
                'supports'      	 => array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail', /*'page-attributes',*/ ),
                'rewrite' => [
                    'slug' => 'news-events/event',
                    'with_front' => false
                ],
				'has_archive'   	 => true,
				'hierarchical'   	 => true,
				'show_in_rest' 			=> true, // gutenberg
				//'template'           => $template,
			);
            register_post_type( 'event', $args );

            /* custom meta fields
            -------------------------------------------------------------*/

            register_meta('post', 'post_event_date', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'event', // custom post type
            ));
            register_meta('post', 'post_event_end_date', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'event', // custom post type
            ));
            register_meta('post', 'post_event_all_day', array(
                'show_in_rest' => true,
                'type' => 'boolean',
                'single' => true,
                'object_subtype' => 'event', // custom post type
            ));
            register_meta('post', 'post_event_all_day_text', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'event', // custom post type
            ));
            register_meta('post', 'post_event_time_zone', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'event', // custom post type
            ));
            register_meta('post', 'post_event_date_display', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'event', // custom post type
            ));

            
          
            /* taxonomy
			-------------------------------------------------------------*/
			$taxlabels = array(
				'name'               => _x( 'Locations', 'taxonomy general name' ),
				'singular_name'      => _x( 'Location', 'taxonomy singular name' ),
				'search_items'       => __( 'Search Locations' ),
				'all_items'          => __( 'All Locations' ),
				'parent_item'        => null,
				'parent_item_colon'  => null,
				'edit_item'          => __( 'Edit Location' ),
				'update_item'        => __( 'Update Location' ),
				'add_new_item'       => __( 'Add New Location' ),
				'new_item_name'      => __( 'New Location Name' ),
				'menu_name'          => __( 'Locations' ),
			);
			$taxargs = array(
				'hierarchical'       => true,
				'labels'             => $taxlabels,
				'show_ui'            => true,
				'show_in_nav_menus'	 => false,
				'show_admin_column'  => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'location' ),
				'show_in_rest' 			=> true, // gutenberg
				'rest_base'         => 'location',
				'rest_controller_class' => 'WP_REST_Terms_Controller',
			);
            register_taxonomy( 'location', 'event', $taxargs );
            
            $taxlabels = array(
				'name'               => _x( 'Event Types', 'taxonomy general name' ),
				'singular_name'      => _x( 'Event Type', 'taxonomy singular name' ),
				'search_items'       => __( 'Search Event Types' ),
				'all_items'          => __( 'All Event Types' ),
				'parent_item'        => null,
				'parent_item_colon'  => null,
				'edit_item'          => __( 'Edit Event Type' ),
				'update_item'        => __( 'Update Event Type' ),
				'add_new_item'       => __( 'Add New Event Type' ),
				'new_item_name'      => __( 'New Event Type Name' ),
				'menu_name'          => __( 'Event Types' ),
			);
			$taxargs = array(
				'hierarchical'       => true,
				'labels'             => $taxlabels,
				'show_ui'            => true,
				'show_in_nav_menus'	 => false,
				'show_admin_column'  => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'event-type' ),
				'show_in_rest' 			=> true, // gutenberg
				'rest_base'         => 'event-type',
				'rest_controller_class' => 'WP_REST_Terms_Controller',
			);
			register_taxonomy( 'event-type', 'event', $taxargs );

            
        }
        
        public function settings_reading_admin_init(){
            
            /* Register and define the settings
            -------------------------------------------------------------*/
            /*
            // pull the backend setting for the page.
            $landing_page_id = get_option( 'casestudy_page' );
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
                'events_page', // option name
                $args 
            );

            // add our new setting
            add_settings_field(
                'events_page', // ID
                __('Events Landing Page', 'textdomain'), // Title
                array( $this, 'setting_callback_function'), // Callback
                'reading', // page
                'default', // section
                array( 'label_for' => 'events_page' )
            );


            register_setting( 
                'reading', // option group "reading", default WP group
                'conferences_page', // option name
                $args 
            );

            // add our new setting
            add_settings_field(
                'conferences_page', // ID
                __('Conferences Landing Page', 'textdomain'), // Title
                array( $this, 'setting_callback_function_conference'), // Callback
                'reading', // page
                'default', // section
                array( 'label_for' => 'conferences_page' )
            );

        }

        
        public function setting_callback_function($args){
            
            /* Setting callback function
            -------------------------------------------------------------*/

            // get saved project page ID
            $project_page_id = get_option('events_page');

            // get all pages
            $args = array(
                'posts_per_page'   => -1,
                'orderby'          => 'name',
                'order'            => 'ASC',
                'post_type'        => 'page',
            );
            $items = get_posts( $args );

            echo '<select id="events_page" name="events_page">';
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
            $project_page_id = get_option('events_page');

            // add our custom state after the post title only,
            // if post-type is "page",
            // "$post->ID" matches the "$project_page_id",
            // and "$project_page_id" is not "0"
            if( 'page' == get_post_type($post->ID) && $post->ID == $project_page_id && $project_page_id != '0') {
                $states[] = __('Events Landing Page', 'textdomain');
            }

            return $states;
        }


        public function setting_callback_function_conference($args){
            
            /* Setting callback function
            -------------------------------------------------------------*/

            // get saved project page ID
            $project_page_id = get_option('conferences_page');

            // get all pages
            $args = array(
                'posts_per_page'   => -1,
                'orderby'          => 'name',
                'order'            => 'ASC',
                'post_type'        => 'page',
            );
            $items = get_posts( $args );

            echo '<select id="conferences_page" name="conferences_page">';
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

        /* ----------------------------------------------------------
        *  Include archive custom template
        * see: https://wordpress.stackexchange.com/questions/115968/create-a-custom-archive-page-for-a-custom-post-type-in-a-plugin
        *-----------------------------------------------------------*/
        function single_event_template( $template ) {
            if ( is_singular('event') ) {
                $theme_files = array('single-event.php');
                $exists_in_theme = locate_template($theme_files, false);
                if ( $exists_in_theme != '' ) {
                    return $exists_in_theme;
                } else {
                    return plugin_dir_path(__FILE__) . 'single-event.php';
                }
            }
            return $template;
        }


        /* ---------------------------------------------------------------
		 * REGISTER SHORTCODE
		 *---------------------------------------------------------------*/
        // DOESN'T WORK AS IT IS NOT SITTING WITHIN THE LOOP

		public function pr_date_shortcode( $atts ) {
			extract( shortcode_atts( array(
				'language' => '',
		      ), $atts, 'pr_date' ) );


			ob_start();

			//$post_id = get_the_id();
            $event_start_date = get_post_meta( get_the_ID(), 'post_event_date', true );
            $event_start_date_display = date("F j, Y", strtotime($event_start_date));
            echo $event_start_date_display;

			return ob_get_clean();
		 }
        
    } // end class

	new Events_Custom_Post_Type();
}


/**
 * register the php/js variables
 *
 */
register_block_type(
	'cgb/event-listing-excerpt',
	array(
		'attributes'      => array(
			'className'       => array(
				'type' => 'string',
			),
			'align'       => array(
				'type' => 'string',
			),
			'term'       => array(
				'type' => 'string',
            ),
            'toggleDisplayUpcoming'  => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'toggleDisplayMonthHeadings'  => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'toggleDisplayYearHeadings'  => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'selectDisplayEvents'  => array(
                'type' => 'string',
                'default' => 'all',
            ),
            
			
		),
		'render_callback' => 'dj_render_block_property_events',
	)
);

/**
 * The gutenberg block output
 *
 */
function dj_render_block_property_events( $attributes, $content ) {
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

	$term = '';
	if ( isset( $attributes['term'] ) ) {
		$term .= $attributes['term'];
    }
    
    $toggleDisplayUpcoming = '';
	if ( isset( $attributes['toggleDisplayUpcoming'] ) ) {
		$toggleDisplayUpcoming .= $attributes['toggleDisplayUpcoming'];
    }
    $selectDisplayEvents = '';
	if ( isset( $attributes['selectDisplayEvents'] ) ) {
		$selectDisplayEvents .= $attributes['selectDisplayEvents'];
    }
    

    $toggleDisplayMonthHeadings = '';
	if ( isset( $attributes['toggleDisplayMonthHeadings'] ) ) {
		$toggleDisplayMonthHeadings .= $attributes['toggleDisplayMonthHeadings'];
    }
    $toggleDisplayYearHeadings = '';
	if ( isset( $attributes['toggleDisplayYearHeadings'] ) ) {
		$toggleDisplayYearHeadings .= $attributes['toggleDisplayYearHeadings'];
    }


    $blockOutput = '';
    /* ----------------------------------------------------------
	*  	the loop
	*-----------------------------------------------------------*/

    // query args
    global $post;
    $today = date('c');
    $one_year_ago = date("c", strtotime("-1 year", strtotime($today)));
    //$one_year_ago_format = 
    
    $args = array(
        'post_type' 		=> 'event',
        'meta_key' => 'post_event_date',
        'posts_per_page' => -1,
        'orderby' => 'meta_value',
        'order' => 'DESC',
        'meta_query' => [
            [
                'key' => 'post_event_date',
                'value' => $one_year_ago,
                'compare' => '>=',
                'type' => 'DATE'
            ]
        ]
	);
    
    $args['event-type'] = $term;
    
    //if ( $toggleDisplayUpcoming == true ) {
    if ( $selectDisplayEvents == 'upcoming' ) {
        $args['meta_query'] = array(
            [
            'key' => 'post_event_date',
            'value' => $today,
            'compare' => '>=',
            'type' => 'DATE'
            ]
        );
    } else if ( $selectDisplayEvents == 'past' ) {
        $args['meta_query'] = array(
            [
            'key' => 'post_event_date',
            'value' => $today,
            'compare' => '<=',
            'type' => 'DATE'
            ]
        );
    } else if ( $selectDisplayEvents == 'all' ) {
        $args['meta_query'] = array(
            [
                'key' => 'post_event_date',
                'value' => $one_year_ago,
                'compare' => '>=',
                'type' => 'DATE'
            ]
        );
    }

    
    
    $loop = new WP_Query($args);

    // post vars
    $counter = 0;
    $countheading = 0;
    $countyear = 0;
    $total_posts = $loop->post_count;

    $event_start_heading_display = '';
    $event_start_year_display = '';
    //$event_future_past_heading_display = '';
    
    if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();
        $title = get_the_title();

        $event_start_date = get_post_meta( get_the_ID(), 'post_event_date', true );
        $event_end_date = get_post_meta( get_the_ID(), 'post_event_end_date', true );
        $event_all_day = get_post_meta( get_the_ID(), 'post_event_all_day', true );
        $event_time_zone = get_post_meta( get_the_ID(), 'post_event_time_zone', true );

        $event_start_date_formatted = date("c", strtotime($event_start_date));
        $event_start_heading = date("F Y", strtotime($event_start_date));
        $event_start_year = date("Y", strtotime($event_start_date));
        $event_start_month = date("M", strtotime($event_start_date));
        $event_start_day = date("d", strtotime($event_start_date));

        $event_start_time = date("g:i a", strtotime($event_start_date));
        $event_end_time = date("g:i a", strtotime($event_end_date));
        
        $event_display_time = '';
        if ($event_all_day == true ){
            $event_display_time = __('All Day', 'paintedrobotevent');
        } else {
            $event_display_time = $event_start_time. ' - ' .$event_end_time . ' ' . $event_time_zone;
        }
       

        /*$event_future_past = '';
        if ($event_start_date_formatted >= $today) {
            echo 'UPCOMING EVENT';
        } else {
            echo 'PAST';
        }*/
        $blockEndOutput = '';


        // ASSUMES there is always the first one.
        if ( $toggleDisplayMonthHeadings == true ) {
            if ($event_start_heading != $event_start_heading_display) {
                $event_start_heading_display = $event_start_heading;
                if ($countyear !== 0){
                    $blockOutput .= '</div>';  
                }
                $blockOutput .= '<h4 class="event-start-heading-display mb-4 mt-5">'.$event_start_heading_display.'</h4>';
                $blockOutput .= '<div class="row row-cols-1 row-cols-lg-3 row-cols-md-2">';
                //$blockEndOutput = '</div>';
                $countyear++;
            }

        } else if ( $toggleDisplayYearHeadings == true ) {
            if ($event_start_year != $event_start_year_display) {
                $event_start_year_display = $event_start_year;
                if ($countheading !== 0){
                    $blockOutput .= '</div>';  
                }
                $blockOutput .= '<h4 class="event-start-heading-display mb-4 mt-5">'.$event_start_year_display.'</h4>';
                $blockOutput .= '<div class="row row-cols-1 row-cols-lg-3 row-cols-md-2">';
                //$blockEndOutput = '</div>';
                $countheading++;
            }

        } else {
            if ($counter == 0){
                $blockOutput .= '<div class="row row-cols-1 row-cols-lg-3 row-cols-md-2">';
            }
        }
        
        
        $terms_event_type = '';
        $term_event_type = get_the_terms( get_the_ID(), 'event-type' );
        if ($term_event_type){
            $terms_event_type = join(', ', wp_list_pluck($term_event_type, 'name'));
            $terms_event_type .= ' - ';
        }

        $terms_location = '';
        $term_location = get_the_terms( get_the_ID(), 'location' );
        if ($term_location){
            $terms_location = ' <i class="far fa-map-marker-alt location"><span class="sr-only">Map Marker Icon</span></i> ';
            $terms_location .= join(', ', wp_list_pluck($term_location, 'name'));
        }

        $card = '';
        $cardImage = '';

        $img_url = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'medium');
		$img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), 'medium' );
		$img_alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
        if (!$img_alt) { $img_alt = get_the_title($post->ID); }
        /*$cardImage = '<figure>
                        <img class="img-fluid" src="'. esc_url( $img_url ).'"
                            srcset="'.esc_attr( $img_srcset ).'"
                            sizes="(max-width: 50em) 100vw, 100%" class="" alt="'.esc_attr( $img_alt ).'" loading="lazy">
                    </figure>';

        $card .= '<div class="card card-event mb-3" >
                    <div class="row g-0">
                        <div class="col-md-4">
                            '.$cardImage.'
                            <div class="card-img-overlay">
                                <time class="day-month" datetime="'.$event_start_date_formatted.'" itemprop="dateEvent"><span class="day">'.$event_start_day.'</span><span class="month">'.$event_start_month.'</span></time>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">'. $terms_event_type .$title.'</h4>
                                <p class="card-text mb-4">'.get_the_excerpt().'</p>
                                <p class="card-text"><small class="text-muted"><i class="far fa-clock"><span class="sr-only">Clock Icon</span></i> '.$event_display_time .$terms_location.' </small></p>
                                <p class="card-text"><small class="text-muted"><i class="fas fa-link"><span class="sr-only">Link Icon</span></i> <a class="readmore" href="'.get_permalink().'" title="View: '.$title.'" target="_self">'. __('Learn More', 'paintedrobotevent') .'</a> </small></p>
                            </div>
                        </div>
                    </div>
                </div>';
                */
        if ($img_url){
            $cardImage = '<a class="readmore" href="'.get_permalink().'" title="View: '.$title.'" target="_self"><figure class="card-img-top">
                    <img class="img-fluid" src="'. esc_url( $img_url ).'"
                        srcset="'.esc_attr( $img_srcset ).'"
                        sizes="(max-width: 50em) 100vw, 100%" class="" alt="'.esc_attr( $img_alt ).'" loading="lazy">
                </figure></a> ';
        } else {
            if ( is_active_sidebar( 'ixiashows-fallback-image' ) ) { 
                ob_start();
                dynamic_sidebar( 'ixiashows-fallback-image' ); 
                $cardImage .= ob_get_contents();
                ob_end_clean();
            } 
        }
       

        $card .= '<div class="col mb-5"><div class="card h-100">
                    '.$cardImage.' <time class="day-month" datetime="'.$event_start_date_formatted.'" itemprop="dateEvent"><span class="day">'.$event_start_day.'</span><span class="month">'.$event_start_month.'</span></time>
                    <div class="card-body">
                        <h4 class="card-title">'. $terms_event_type .$title.'</h4>
                        <p class="card-text">'.get_the_excerpt().'</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted d-block"><i class="far fa-clock"><span class="sr-only">Clock Icon</span></i> '.$event_display_time .' </small>
                        <small class="text-muted d-block"> '.$terms_location.' </small>
                        <small class="text-muted d-block"><i class="fas fa-link"><span class="sr-only">Link Icon</span></i> <a class="readmore" href="'.get_permalink().'" title="View: '.$title.'" target="_self">'. __('Learn More', 'paintedrobotevent') .'</a> </small>
                    </div>
                </div></div>';
        
        $blockOutput .= $card;

        $counter++;
       
    endwhile; else:
    endif;
    wp_reset_postdata();

    $blockOutput .= '</div>';

    return $blockOutput;
}
?>
