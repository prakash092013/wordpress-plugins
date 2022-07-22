<?php
/**
 * Team Custom Post Type
 */

defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'Team_Custom_Post_Type' ) ) {

	class Team_Custom_Post_Type {

		public function __construct() {
            // register
			add_action( 'init', array( $this, 'team_post_type' ) );
        }
        public function team_post_type() {
            /* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'Teams', 'post type general name' ),
				'singular_name'      => _x( 'Team', 'post type singular name' ),
				'add_new'            => _x( 'Add New Team', 'team' ),
				'add_new_item'       => __( 'Add New Team' ),
				'edit_item'          => __( 'Edit Team' ),
				'new_item'           => __( 'New Team' ),
				'all_items'          => __( 'Teams' ),
				'view_item'          => __( 'View Team' ),
				'search_items'       => __( 'Search Teams' ),
				'not_found'          => __( 'No Teams found' ),
				'not_found_in_trash' => __( 'No Teams found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Teams' ),
			);
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Team.',
				'public'        	 => true,
				'show_in_menu'  	 => true,
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-groups',
				'taxonomies' 		 => array('team-category'),
				'supports'      	 => array( 'title', 'excerpt', 'thumbnail' ),
				'slug' 				 => 'team',
				'has_archive'   	 => true,
				'hierarchical'   	 => false,
				'show_in_rest' 			=> true, // gutenberg
				/*'template'           => $template,*/
			);
			register_post_type( 'team', $args );
			
			/* taxonomy
			-------------------------------------------------------------*/
			$taxlabels = array(
				'name'               => _x( 'Team Category', 'taxonomy general name' ),
				'singular_name'      => _x( 'Team Category', 'taxonomy singular name' ),
				'search_items'       => __( 'Search Team Categories' ),
				'all_items'          => __( 'All Team Categories' ),
				'parent_item'        => null,
				'parent_item_colon'  => null,
				'edit_item'          => __( 'Edit Team Category' ),
				'update_item'        => __( 'Update Team Category' ),
				'add_new_item'       => __( 'Add New Team Category' ),
				'new_item_name'      => __( 'New Team Category Name' ),
				'menu_name'          => __( 'Team Categories' ),
			);
			$taxargs = array(
				'hierarchical'       => true,
				'labels'             => $taxlabels,
				'show_ui'            => true,
				'show_in_nav_menus'	 => false,
				'show_admin_column'  => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'team-category' ),
				'show_in_rest' 			=> true, // gutenberg
				'rest_base'         => 'team-category',
				'rest_controller_class' => 'WP_REST_Terms_Controller',
			);
			register_taxonomy( 'team-category', 'team', $taxargs );

			wp_insert_term(
				'Member',   // the term 
				'team-category', // the taxonomy
				array(
					'description' => 'A collection of team members.',
					'slug'        => 'team-member',
				)
			);

			wp_insert_term(
				'Leader',   // the term 
				'team-category', // the taxonomy
				array(
					'description' => 'A collection of team leaders.',
					'slug'        => 'team-leader',
				)
			);
        }
    } // end class

	new Team_Custom_Post_Type();
}

register_block_type(
	'cgb/team-members',
	array(
		'attributes'      => array(
			'className'       => array(
				'type' => 'string',
				'default' => 'wp-block-cgb-team-grid',
			),
			'term'       => array(
				'type' => 'string',
			),
			'columns'       => array(
				'type' => 'integer',
				'default' => '5',
			),
			'show_designation'       => array(
				'type' => 'boolean',
				'default' => true,
			),
		),
		'render_callback' => 'yields_render_block_team_members',
	)
);

/**
 * The gutenberg block carousel
 *
 */
function yields_render_block_team_members( $attributes, $content ) {

	$carouselOutput = '';
	$image_indicators = '';
	$thisPageId = get_the_ID();

	// block attributes
	$className = [];
	if ( isset( $attributes['className'] ) ) {
		$classNames[] = $attributes['className'];
	}

	if ( isset( $attributes['align'] ) ) {
		$classNames[] = ' align' . $attributes['align'];
	}

	$term = '';
	if ( isset( $attributes['term'] ) ) {
		$term .= $attributes['term'];
	}

	$columns = '5';
	if ( isset( $attributes['columns'] ) ) {
		$columns = $attributes['columns'];
	} 
	$col_width = 100/$columns;
	$inline_width = 'style="flex-basis:'.$col_width.'%"';

	$show_designation = true;
	if ( isset( $attributes['show_designation'] ) ) {
		$show_designation = $attributes['show_designation'];
	}

	global $post;
	$args = array(
        'post_type' 				=> 'team',
        'posts_per_page' 			=> '-1',
        'team-category' 			=> $term,
        'orderby' 					=> 'menu_order',
        'order' 					=> 'ASC'
    );

    // print_r($args);

	$members = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;

	$carouselOutput .= '<ul class="'.implode( " ",  $classNames ).'">';
		if ( $members->have_posts() ) : 
			while ( $members->have_posts() ) : $members->the_post();

				$carouselOutput .= '<li class="member_item" '.$inline_width.'>';
			    	$carouselOutput .= '<div class="wp-block-image size-large is-resized is-style-rounded">';
			    	$carouselOutput .= '<figure class="aligncenter size-large">'.get_the_post_thumbnail( get_the_ID(), array(128, 128)).'</figure>';
			    	$carouselOutput .= '</div>';
			    	$carouselOutput .= '<p class="has-size-16-font-size has-text-align-center mb-0"><strong>'.get_the_title().'</strong></p>';
			    	$carouselOutput .= '<p class="has-size-14-font-size has-text-align-center mb-0">'.get_the_excerpt().'</p>';
			    $carouselOutput .= '</li>';	

		    	$counter++;
		    endwhile;
		else:
			echo "No team members found";
	    endif;
	    wp_reset_postdata();
	$carouselOutput .= '</ul>';
	return $carouselOutput;
}
?>