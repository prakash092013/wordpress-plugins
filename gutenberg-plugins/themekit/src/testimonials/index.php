<?php
/**
 * Testimonial Custom Post Type
 */

defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'Testimonial_Custom_Post_Type' ) ) {

	class Testimonial_Custom_Post_Type {

		public function __construct() {
            // register
			add_action( 'init', array( $this, 'testimonial_post_type' ) );
        }
        public function testimonial_post_type() {
            /* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'Testimonials', 'post type general name' ),
				'singular_name'      => _x( 'Testimonial', 'post type singular name' ),
				'add_new'            => _x( 'Add New Testimonial', 'testimonial' ),
				'add_new_item'       => __( 'Add New Testimonial' ),
				'edit_item'          => __( 'Edit Testimonial' ),
				'new_item'           => __( 'New Testimonial' ),
				'all_items'          => __( 'Testimonials' ),
				'view_item'          => __( 'View Testimonial' ),
				'search_items'       => __( 'Search Testimonials' ),
				'not_found'          => __( 'No Testimonials found' ),
				'not_found_in_trash' => __( 'No Testimonials found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Testimonials' ),
			);
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Testimonial.',
				'public'        	 => true,
				'show_in_menu'  	 => true,
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-testimonial',
				'taxonomies' 		 => array('testimonial-category'),
				'supports'      	 => array( 'title', 'editor', 'excerpt',  'thumbnail', 'custom-fields', 'page-attributes'  ),
				'slug' 				 => 'testimonial',
				'has_archive'   	 => true,
				'hierarchical'   	 => false,
				'show_in_rest' 			=> true, // gutenberg
				/*'template'           => $template,*/
			);
			register_post_type( 'testimonial', $args );
			
			/* taxonomy
			-------------------------------------------------------------*/
			$taxlabels = array(
				'name'               => _x( 'Testimonial Category', 'taxonomy general name' ),
				'singular_name'      => _x( 'Testimonial Category', 'taxonomy singular name' ),
				'search_items'       => __( 'Search Testimonial Categories' ),
				'all_items'          => __( 'All Testimonial Categories' ),
				'parent_item'        => null,
				'parent_item_colon'  => null,
				'edit_item'          => __( 'Edit Testimonial Category' ),
				'update_item'        => __( 'Update Testimonial Category' ),
				'add_new_item'       => __( 'Add New Testimonial Category' ),
				'new_item_name'      => __( 'New Testimonial Category Name' ),
				'menu_name'          => __( 'Testimonial Categories' ),
			);
			$taxargs = array(
				'hierarchical'       => true,
				'labels'             => $taxlabels,
				'show_ui'            => true,
				'show_in_nav_menus'	 => false,
				'show_admin_column'  => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'testimonial-category' ),
				'show_in_rest' 			=> true, // gutenberg
				'rest_base'         => 'testimonial-category',
				'rest_controller_class' => 'WP_REST_Terms_Controller',
			);
			register_taxonomy( 'testimonial-category', 'testimonial', $taxargs );

			/* custom meta
			-------------------------------------------------------------*/

			register_meta('post', 'testimonial-author-name', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'testimonial', // custom post type
			));
			register_meta('post', 'testimonial-author-title', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'testimonial', // custom post type
			));
			register_meta('post', 'testimonial-color', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'testimonial', // custom post type
			));
			register_meta('post', 'testimonial_color_class', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'testimonial', // custom post type
            ));
            register_meta('post', 'testimonial_background_color_class', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'testimonial', // custom post type
			));
			register_meta('post', 'testimonial_hide', array(
                'show_in_rest' => true,
                'type' => 'boolean',
                'single' => true,
                'object_subtype' => 'testimonial', // custom post type
            ));

        }
    } // end class

	new Testimonial_Custom_Post_Type();
}

/* ---------------------------------------------------------------
 * testimonial carousel
 *---------------------------------------------------------------*/
register_block_type(
	'cgb/testimonial-carousel',
	array(
		'attributes'      => array(
			'className'       => array(
				'type' => 'string',
				'default' => 'wp-block-cgb-carousel',
			),
			'term'       => array(
				'type' => 'string',
				'default' => 'home-page',
			),
			'interval'       => array(
				'type' => 'string',
				'default' => '5000',
			),
			'height'       => array(
				'type' => 'string',
				'default' => '500px',
			),
			'heightxl'       => array(
				'type' => 'string',
			),
			'heightlg'       => array(
				'type' => 'string',
			),
			'heightmd'       => array(
				'type' => 'string',
			),
			'heightsm'       => array(
				'type' => 'string',
			),
			'heightxs'       => array(
				'type' => 'string',
			),
		),
		'render_callback' => 'dj_render_block_testimonial_carousel',
	)
);

/**
 * The gutenberg block carousel
 *
 */
function dj_render_block_testimonial_carousel( $attributes, $content ) {

	$carouselOutput = '';
	$image_indicators = '';
	$thisPageId = get_the_ID();

	// block attributes
	$className = '';
	if ( isset( $attributes['className'] ) ) {
		$className .= ' ' . $attributes['className'];
	}

	$term = '';
	if ( isset( $attributes['term'] ) ) {
		$term .= $attributes['term'];
	}

	$interval = '';
	if ( isset( $attributes['interval'] ) ) {
		$interval = $attributes['interval'];
	} else {
		$interval = '5000';
	}

	$align = '';
	if ( isset( $attributes['align'] ) ) {
		$className .= ' align' . $attributes['align'];
	}

	$css_style = '<style>';
	$height = '';
	if ( isset( $attributes['height'] ) ) {
		$css_style .= '.carousel-inner { height:'. $attributes['height'] .' }';
		$css_style .= '.carousel-inner .carousel-item { height:'. $attributes['height'] .' }';

		if ( isset( $attributes['align'] ) ) {
			if ($attributes['align'] === 'full'){
				$css_style .= '.carousel-inner figure img{ max-height:initial }';
			}
		} else {
			$css_style .= '.carousel-inner figure img{ max-height:'. $attributes['height'] .' }';
		}
	}
	if ( isset( $attributes['heightxl'] ) ) {
		$css_style .= '@media (min-width: 1500px) {';
		$css_style .= '.carousel-inner { height:'. $attributes['heightxl'] .' }';
		$css_style .= '.carousel-inner .carousel-item { height:'. $attributes['heightxl'] .' }';

		if ($attributes['align'] === 'full'){
			$css_style .= '.carousel-inner figure img{ max-height:initial }';
		} else {
			$css_style .= '.carousel-inner figure img{ max-height:'. $attributes['heightxl'] .' }';
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightlg'] ) ) {
		$css_style .= '@media (max-width: 1199px) {';
		$css_style .= '.carousel-inner { height:'. $attributes['heightlg'] .' }';
		$css_style .= '.carousel-inner .carousel-item { height:'. $attributes['heightlg'] .' }';

		if ( isset( $attributes['align'] ) ) {
			if ($attributes['align'] === 'full'){
				$css_style .= '.carousel-inner figure img{ max-height:initial }';
			} else {
				$css_style .= '.carousel-inner figure img{ max-height:'. $attributes['heightlg'] .' }';
			}
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightmd'] ) ) {
		$css_style .= '@media (max-width: 991px) {';
		$css_style .= '.carousel-inner { height:'. $attributes['heightmd'] .' }';
		$css_style .= '.carousel-inner .carousel-item { height:'. $attributes['heightmd'] .' }';
		
		if ( isset( $attributes['align'] ) ) {
			if ($attributes['align'] === 'full'){
				$css_style .= '.carousel-inner figure img{ max-height:initial }';
			} else {
				$css_style .= '.carousel-inner figure img{ max-height:'. $attributes['heightmd'] .' }';
			}
			$css_style .= '}';
		}
	}
	if ( isset( $attributes['heightsm'] ) ) {
		$css_style .= '@media (max-width: 767px) {';
		$css_style .= '.carousel-inner { height:'. $attributes['heightsm'] .' }';
		$css_style .= '.carousel-inner .carousel-item { height:'. $attributes['heightsm'] .' }';

		if ( isset( $attributes['align'] ) ) {
			if ($attributes['align'] === 'full'){
				$css_style .= '.carousel-inner figure img{ max-height:initial }';
			} else {
				$css_style .= '.carousel-inner figure img{ max-height:'. $attributes['heightsm'] .' }';
			}
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightxs'] ) ) {
		$css_style .= '@media (max-width: 575px) {';
		$css_style .= '.carousel-inner { height:'. $attributes['heightxs'] .' }';
		$css_style .= '.carousel-inner .carousel-item { height:'. $attributes['heightxs'] .' }';

		if ( isset( $attributes['align'] ) ) {
			if ($attributes['align'] === 'full'){
				$css_style .= '.carousel-inner figure img{ max-height:initial }';
			} else {
				$css_style .= '.carousel-inner figure img{ max-height:'. $attributes['heightxs'] .' }';
			}
		}
		$css_style .= '}';
	}



	// post slug = testimonial
	// taxonomy slug = testimonial-category
	
	global $post;
	$args = array(
        'post_type' 				=> 'testimonial',
        'posts_per_page' 			=> '-1',
        'testimonial-category' 		=> $term,
        'orderby' 					=> 'menu_order',
        'order' 					=> 'ASC'
    );

	$loop = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;

	$carousel = get_term_by( 'slug', $term, 'testimonial-category' );
	if ($carousel){
		$title = $carousel->name;
		$description = $carousel->description;
		$description = $description ? $description : 'This is the '.$title.' - Carousel Display. The author has not provided a description.' ;
	} else {
		$title = __('Testimonial', 'themekit');
		$description = 'This is the '.$title.' - Carousel Display. The author has not provided a description.' ;
	}

	$carouselOutput .= '<div id="carousel_'. $term .'" class=" carousel slide wp-carousel-block '.$className.'" data-ride="carousel" data-interval="'.$interval.'" data-pause="hover" role="complementary" aria-labelledby="'. $term .'_title" aria-describedby="'. $term .'_desc">
			<h2 id="'. $term .'_title" class="sr-only">'.$title.' - Carousel Display</h2>
			<p id="'. $term .'_desc" class="sr-only">'.$description.'</p>
	';

	$carouselOutput .= '<div class="carousel-inner ">';
		if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();

			$img_url = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'full');
			$img_url_thumb = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'thumbnail');
		    $img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), 'full' );
		    $img_alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
		    if (!$img_alt) { $img_alt = get_the_title($post->ID); }

			$content = apply_filters('the_content',  ( get_post($post->ID)->post_content) );

		    $style = '';
		    $addItemClass = '';
		    if ( !has_post_thumbnail() ) {
			    $style='style="position:static"';
			    $addItemClass = ' static-caption';
			}

		    if ($counter == 0){ $activeclass = "active"; } else { $activeclass = ""; };
			$carouselOutput .= '<div class="carousel-item '. $activeclass . $addItemClass .'" role="tabpanel" id="tabpanel-'.$term.'-'.$counter.'" aria-labelledby="tab-'.$term.'-'.$counter.'">';

				/*if ( has_post_thumbnail() ) {
					$carouselOutput .= '<figure class="featured-figure"><img class="d-block" src="'.$img_url.'" srcset="'.esc_attr( $img_srcset ).'" sizes="(max-width: 50em) 100vw, 100%" alt="'.$img_alt.'" data-caption="#caption'.($counter + 1).'"></figure>';
				}*/
				
				$carousel_caption_class = "carousel-caption";
				if ($total_posts == 1){
					$carousel_caption_class = "auto-carousel-caption";
				}
				$carouselOutput .= '<div class="'.$carousel_caption_class.'">';
					if ($content){
					$carouselOutput .= $content;
					}

				$carouselOutput .= '</div>';

			$carouselOutput .= '</div>';


			/** Image indicators - part one */
			/*if ($counter == 0){ $activeclass_indicators = "active"; } else { $activeclass_indicators = ""; };
			$image_indicators .= '<li data-target="#carousel_'. $term .'" data-slide-to="'.$counter.'" class="'.$activeclass_indicators.'" role="tablist" id="tab-'.$term.'-'.$counter.'" aria-controls="tabpanel-'.$term.'-'.$counter.'" aria-selected="false" tabindex="-1"><span class="sr-only">Slide '.($counter).'</span><img class="" src="'.$img_url_thumb.'" alt="'.$img_alt.'" data-caption="#caption'.($counter).'"></li>';
					*/
			$counter++;

	    endwhile; else:
	    endif;
	    wp_reset_postdata();
	$carouselOutput .= '</div>';

	/** Default indicators */
	if ($counter > 1) {
	    $carouselOutput .= '<ol class="carousel-indicators" role="tablist">';
	  	for( $i = 0; $i < $counter; $i++ ) {
	  		if ($i == 0){ $activeclass = "active"; } else { $activeclass = ""; };
	      	$carouselOutput .= '<li data-target="#carousel_'. $term .'" data-slide-to="'.$i.'" class="'.$activeclass.'" role="tablist" id="tab-'.$term.'-'.$i.'" aria-controls="tabpanel-'.$term.'-'.$i.'" aria-selected="false" tabindex="-1"><span class="sr-only">Slide '.($i+1).'</span></li>';
		}
	  	$carouselOutput .= '</ol>';
	}

	/** Image indicators - part two */
	/*if ($counter > 0) {
	    $carouselOutput .= '<ol class="carousel-indicators image-indicators" role="tablist">';
	  	$carouselOutput .= $image_indicators;
	  	$carouselOutput .= '</ol>';
	}*/

	/** controls prev/next */
	if ($counter > 1) {
		$carouselOutput .= '<p class="mb-0 p-carousel-controls"><a class="carousel-control-prev" href="#carousel_'. $term .'" role="button" data-slide="prev" aria-label="Show previous slide"><span class="carousel-control-prev-icon fas fa-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carousel_'. $term .'" role="button" data-slide="next" aria-label="Show next slide"><span class="carousel-control-next-icon fas fa-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></p>';
	}

	$carouselOutput .= '</div>';

	$css_style .= '</style>';

	return $css_style.$carouselOutput;
}

/* ---------------------------------------------------------------
 * testimonial post excerpts
 *---------------------------------------------------------------*/
register_block_type(
	'cgb/excerpt-testimonials',
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
			
		),
		'render_callback' => 'dj_render_block_excerpt_testimonials',
	)
);

/**
 * The gutenberg block 
 *
 */
function dj_render_block_excerpt_testimonials( $attributes, $content ) {

	$blockOutput = '';
	//$thisPageId = get_the_ID();
	$thisPageId = icl_object_id(get_the_ID(), 'page', false, ICL_LANGUAGE_CODE);

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

	$blockOutput .= '<div class="wp-block-cgb-testimonial-posts row'.$className.'">';
	/* ----------------------------------------------------------
	*  	team members - the loop
	*-----------------------------------------------------------*/

	

	/*if (!$testimonial_hide){
		$testimonial_hide = false;
	}*/

	global $post;
	$args = array(
        'post_type' 		=> 'testimonial',
        'posts_per_page' 	=> '-1',
        //'orderby' 			=> 'menu_order',
		//'order' 			=> 'ASC',
		'meta_query' => array(
			'relation' => 'OR',
			 array(
			  'key' => 'testimonial_hide',
			  'compare' => 'NOT EXISTS', // works!
			  'value' => '' // This is ignored, but is necessary...
			 ),
			 array(
			  'key' => 'testimonial_hide',
			  'value' => false
			 )
		 )
		
	);
	
	if ( isset( $attributes['term'] ) ) {
		$args['team-committee'] = $term;
	}

	$loop = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;

	
	if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();

		$post_id = icl_object_id(get_the_ID(), 'testimonial', false, ICL_LANGUAGE_CODE);

		$img_url = wp_get_attachment_image_url( get_post_thumbnail_id( $post_id ), 'large');
		$img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post_id ), 'large' );
		$img_alt = get_post_meta(get_post_thumbnail_id($post_id), '_wp_attachment_image_alt', true);
		if (!$img_alt) { $img_alt = get_the_title($post_id); }
		
		
		
		$title = get_the_title($post_id);
		$url = get_permalink($post_id);
		
		$testimonial_author_name = get_post_meta($post_id, 'testimonial-author-name', true);
		$testimonial_author_title = get_post_meta($post_id, 'testimonial-author-title', true);
		$testimonial_color = get_post_meta($post_id, 'testimonial_color_class', true);

		$testimonial_hide = get_post_meta($post_id, 'testimonial_hide', true);

		

		$content = '';
		if ($content_display == false) {
			if ($img_url){
				$content .= '<figure class="text-center">
				  <img src="'.esc_url( $img_url ).'"
					srcset="'.esc_attr( $img_srcset ).'"
					sizes="(max-width: 50em) 100vw, 100%" class="img-fluid" alt="'.esc_attr( $img_alt ).'" loading="lazy"></figure>';
			} 
			if ($testimonial_author_name){
				$content .= '<p class="testimonial-excerpt-title text-center '.$testimonial_color.'">'.$testimonial_author_name.$testimonial_hide.'</p>';
			}
			if ($testimonial_author_title){
				$content .= '<p class="testimonial-excerpt-title text-center '.$testimonial_color.'">'.$testimonial_author_title.'</p>';
			}
			$content .= '<blockquote class="wp-block-quote testimonial-landing-blockquote is-style-default blockquote-'.$testimonial_color.'">'.apply_filters('the_content',  ( get_post($post->ID)->post_excerpt) ).'</blockquote>';
		} else {
			$content = apply_filters('the_content',  ( get_post($post->ID)->post_content) );
		}
        
		$column_class = 'col-sm-6';
		if ($range_columns == 3) {
			$column_class = 'col-lg-4 col-md-6';
		} else if ($range_columns == 2) {
			$column_class = 'col-sm-6';
		}
		
		/* card content
		*-----------------------------------------------------------*/
            $blockOutput .= '<div class="card-column '.$column_class.'">
                                <div class="wp-block-cgb-card card h-100">
                                    
									<div class="card-body "> ';
                                                                                                           
                                        $blockOutput .= $content;

                                    $blockOutput .= '</div>';
                                    
							
							
                                $blockOutput .= '</div></div>';
		
        $counter++;

	endwhile; else:
	endif;
	wp_reset_postdata();
    $blockOutput .= '</div>'; // row


	return $blockOutput;
}
?>