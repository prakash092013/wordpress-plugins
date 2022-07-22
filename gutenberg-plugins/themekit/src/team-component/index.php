<?php
defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'DJ_Team' ) ) {

	class DJ_Team {

		public function __construct() {

			/* add support for featured images
			-------------------------------------------------------------*/
			if ( function_exists('add_theme_support') ) {
			    add_theme_support('post-thumbnails');
			}

			/* functions
			-------------------------------------------------------------*/
			// register
			add_action( 'init', array( $this, 'team_dj' ) );

		}

		/* ---------------------------------------------------------------
		 * REGISTER CUSTOM POSTTYPE & TAXONOMY
		 *---------------------------------------------------------------*/
		public function team_dj() {

			/* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'Team Members', 'post type general name' ),
				'singular_name'      => _x( 'Team Member', 'post type singular name' ),
				'add_new'            => _x( 'Add New Team Member', 'team' ),
				'add_new_item'       => __( 'Add New Team Member' ),
				'edit_item'          => __( 'Edit Team Member' ),
				'new_item'           => __( 'New Team Member' ),
				'all_items'          => __( 'Team Members' ),
				'view_item'          => __( 'View Team Member' ),
				'search_items'       => __( 'Search Team Members' ),
				'not_found'          => __( 'No Team Members found' ),
				'not_found_in_trash' => __( 'No Team Members found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Team Members' ),
			);
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Team Members.',
				'public'        	 => true,
				'show_in_menu'  	 => true,
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-id',
				/*'taxonomies' 		 => array('carousel'),*/
				'supports'      	 => array( 'title', 'excerpt', 'thumbnail', 'editor', 'page-attributes', 'custom-fields'  ),
				'slug' 				 => 'team-member',
				'has_archive'   	 => true,
				'hierarchical'   	 => false,
				'show_in_rest' 			=> true, // gutenberg
				/*'template'           => $template,*/
			);
			register_post_type( 'team-member', $args );

			/* taxonomy
			-------------------------------------------------------------*/
			$taxlabels = array(
				'name'               => _x( 'Team Committees', 'taxonomy general name' ),
				'singular_name'      => _x( 'Team Committee', 'taxonomy singular name' ),
				'search_items'       => __( 'Search Team Committees' ),
				'all_items'          => __( 'All Team Committees' ),
				'parent_item'        => null,
				'parent_item_colon'  => null,
				'edit_item'          => __( 'Edit Team Committee' ),
				'update_item'        => __( 'Update Team Committee' ),
				'add_new_item'       => __( 'Add New Team Committee' ),
				'new_item_name'      => __( 'New Team Committee Name' ),
				'menu_name'          => __( 'Team Committees' ),
			);
			$taxargs = array(
				'hierarchical'       => true,
				'labels'             => $taxlabels,
				'show_ui'            => true,
				'show_in_nav_menus'	 => false,
				'show_admin_column'  => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'team-committee' ),
				'show_in_rest' 			=> true, // gutenberg
				'rest_base'         => 'team-committee',
				'rest_controller_class' => 'WP_REST_Terms_Controller',
			);
			register_taxonomy( 'team-committee', 'team-member', $taxargs );

			/* custom meta fields
			-------------------------------------------------------------*/
			register_meta('post', 'team-title', array(
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'object_subtype' => 'team-member', // custom post type
			));
			register_meta('post', 'linkedin-href', array(
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'object_subtype' => 'team-member', // custom post type
			));
			register_meta('post', 'team-member-quote', array(
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'object_subtype' => 'team-member', // custom post type
			));

		} // end function

	} // end class

	new DJ_Team();
}

register_block_type(
	'cgb/team',
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
				'default' => true,
			),
			'rangeColumns' => array(
				'type' => 'number',
				'default' => 2,
			),
			'readmore'       => array(
				'type' => 'string',
				'default' => 'Continue Reading',
			),
			'toggleQuote' => array(
				'type' => 'boolean',
				'default' => false,
			),
			
		),
		'render_callback' => 'dj_render_block_team',
	)
);

/**
 * The gutenberg block team
 *
 */
function dj_render_block_team( $attributes, $content ) {

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

	$quote_display = '';
	if ( isset( $attributes['toggleQuote'] ) ) {
		$quote_display = $attributes['toggleQuote'];
	}

	$blockOutput .= '<div class="wp-block-cgb-team row'.$className.'">';
	/* ----------------------------------------------------------
	*  	team members - the loop
	*-----------------------------------------------------------*/

	global $post;
	$args = array(
        'post_type' 		=> 'team-member',
        'posts_per_page' 	=> '-1',
        'orderby' 			=> 'menu_order',
        'order' 			=> 'ASC'
	);
	
	if ( isset( $attributes['term'] ) ) {
		$args['team-committee'] = $term;
	}

	$loop = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;
	
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
		
		$job_title = get_post_meta( get_the_ID(), 'team-title', true );
		$linkedin = get_post_meta( get_the_ID(), 'linkedin-href', true );
		$team_member_quote = get_post_meta( get_the_ID(), 'team-member-quote', true );

		$column_class = 'col-sm-6';
		if ($range_columns == 3) {
			$column_class = 'col-lg-4 col-md-6';
		} else if ($range_columns == 2) {
			$column_class = 'col-sm-6';
		}

		if ($quote_display == false) {
			$quote = '';
		} else {
			if ($team_member_quote) {
				$quote = '<blockquote class="wp-block-quote is-style-default"><p>'.$team_member_quote.'</p></blockquote>';
			} else {
				$quote = '';
			}
		}

		$card_title_class = 'card-title text-center';
		if (!$job_title) {
			$card_title_class .= ' short-underline';
		}
		
		
		/* card content
		*-----------------------------------------------------------*/
			$blockOutput .= '<div class="card-column '.$column_class.'"><div class="card h-100">
							<figure class="card-img-top">
								<img src="'. esc_url( $img_url ).'"
									srcset="'.esc_attr( $img_srcset ).'"
									sizes="(max-width: 50em) 100vw, 100%" class="" alt="'.esc_attr( $img_alt ).'">
							</figure>
							<div class="card-body">
								
								<h3 class="'.$card_title_class.'">'.$title.'</h3>';
								
								if ( $job_title ) {
									$blockOutput .= '<p class="card-text job-title text-center">'.$job_title.'</p>';
								} 

								if ($linkedin) {
									$blockOutput .= '<a href="'.$linkedin.'" class="linkedin-href text-center" target="_blank"><i class="fab fa-linkedin"><span class="sr-only">Linkedin Icon</span></i></a>';
								}

								$blockOutput .= $quote;

								$blockOutput .= $content;

							$blockOutput .= '</div>
							
							
						</div></div>';
		

	endwhile; else:
	endif;
	wp_reset_postdata();
$blockOutput .= '</div>';


	return $blockOutput;
}


?>
