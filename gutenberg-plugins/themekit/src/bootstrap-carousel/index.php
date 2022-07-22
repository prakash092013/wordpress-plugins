<?php
defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'DJ_Bootstrap_Carousel' ) ) {

	class DJ_Bootstrap_Carousel {

		public function __construct() {

			/* add support for featured images
			-------------------------------------------------------------*/
			if ( function_exists('add_theme_support') ) {
			    add_theme_support('post-thumbnails');
			    //add_image_size('wide', 1200, 1200, false);
			    //add_image_size('admin-preview', 75, 75, true);
			}

			/* gutenberg blocks
			-------------------------------------------------------------*/
			/*if ( is_admin() ) {
				add_action( 'admin_init', array( $this, 'admin_init' ) );

			}
			else {
				// ONLY LOAD THIS IF THE CURRENT PAGE HAS
				add_action( 'init', array( $this, 'init' ) );
			}*/

			/* functions
			-------------------------------------------------------------*/
			// register
			add_action( 'init', array( $this, 'carousel_dj' ) );

			// admin columns
			add_filter( 'manage_edit-slide_columns', array( $this, 'dj_columns_filter' ), 10, 1  );
			add_filter( 'manage_edit-carousel_columns', array( $this, 'djtax_columns_filter'), 10, 1 );
			add_filter( 'manage_carousel_custom_column', array( $this, 'dj_tax_column_action'), 10, 3 );
			add_action( 'manage_slide_posts_custom_column', array( $this, 'dj_column_action'), 10, 1 );
			add_filter( 'manage_edit-slide_sortable_columns', array( $this, 'be_custom_post_columns_sortable') );
			add_action( 'pre_get_posts', array( $this, 'dj_slide_orderby') );

			add_shortcode( 'dj_carousel', array( $this, 'dj_carousel_shortcode') );



		}

		public function init() {
			wp_enqueue_style(
				'bootstrap-carousel-css', plugin_dir_url( __FILE__ ) . 'style.css',
				null, filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
			);

			/**
			 * Load all translations for our plugin from the MO file.
			*/
			load_plugin_textdomain( 'bootstrap-gutenberg', false, basename( __DIR__ ) . '/languages' );

		}


		public function admin_init() {
			if ( ! function_exists( 'register_block_type' ) ) {
				// Gutenberg is not active.
				return;
			}

			wp_register_script(
				'bootstrap-carousel',
				plugins_url( 'block.js', __FILE__ ),
				array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
				filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
			);
			wp_register_style(
				'bootstrap-carousel-css',
				plugins_url( 'style.css', __FILE__ ),
				array( ),
				filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
			);

			register_block_type( 'bootstrap-gutenberg/carousel', array(
				'style' => 'bootstrap-carousel-css',
				'editor_script' => 'bootstrap-carousel',
			) );

			/*
			 * Pass already loaded translations to our JavaScript.
			 *
			 * This happens _before_ our JavaScript runs, afterwards it's too late.
			 */
			wp_add_inline_script(
				'bootstrap-gutenberg-collapsible',
				sprintf(
					'var bootstrap-carousel = { localeData: %s };',
					json_encode( ! function_exists( 'wp_get_jed_locale_data' ) ? gutenberg_get_jed_locale_data( 'bootstrap-gutenberg' ) : wp_get_jed_locale_data( 'bootstrap-gutenberg' ) )
				),
				'before'
			);

		}

		/* ---------------------------------------------------------------
		 * REGISTER CUSTOM POSTTYPE & TAXONOMY
		 *---------------------------------------------------------------*/
		public function carousel_dj() {
			/*$template = array(
				array( 'core/columns', array('align' => 'wide', 'className' => 'default-carousel-columns'), array(
	                array( 'core/column', array('className' => 'default-carousel-image'), array(
	                    array( 'core/image', array() ),
	                ) ),
	                array( 'core/column', array('className' => 'default-carousel-content'), array(
	                    array( 'core/heading', array(
	                        'placeholder' => 'Add title',
	                        'level' => 3
	                    ) ),
	                    array( 'core/separator', array(

			            ) ),
	                    array( 'core/paragraph', array(
	                        'placeholder' => 'Add content'
	                    ) ),
	                ) ),
	            ) ),
		    );*/

			/* posttype
			-------------------------------------------------------------*/
			$labels = array(
				'name'        		 => _x( 'Bootstrap Slides', 'post type general name' ),
				'singular_name'      => _x( 'Slide', 'post type singular name' ),
				'add_new'            => _x( 'Add New Slide', 'slide' ),
				'add_new_item'       => __( 'Add New Slide' ),
				'edit_item'          => __( 'Edit Slide' ),
				'new_item'           => __( 'New Slide' ),
				'all_items'          => __( 'Slides' ),
				'view_item'          => __( 'View Slide' ),
				'search_items'       => __( 'Search Slides' ),
				'not_found'          => __( 'No Slides found' ),
				'not_found_in_trash' => __( 'No Slides found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Carousels' ),
			);
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Carousel Slide.',
				'public'        	 => true,
				'show_in_menu'  	 => true,
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-slides',
				'taxonomies' 		 => array('carousel'),
				'supports'      	 => array( 'title', /*'excerpt', */ 'thumbnail','editor', 'page-attributes'  ),
				'slug' 				 => 'slide',
				'has_archive'   	 => true,
				'hierarchical'   	 => false,
				'show_in_rest' 			=> true, // gutenberg
				/*'template'           => $template,*/
			);
			register_post_type( 'slide', $args );

			/* taxonomy
			-------------------------------------------------------------*/
			$taxlabels = array(
				'name'               => _x( 'Bootstrap Carousel', 'taxonomy general name' ),
				'singular_name'      => _x( 'Carousel', 'taxonomy singular name' ),
				'search_items'       => __( 'Search Carousels' ),
				'all_items'          => __( 'All Carousels' ),
				'parent_item'        => null,
				'parent_item_colon'  => null,
				'edit_item'          => __( 'Edit Carousel' ),
				'update_item'        => __( 'Update Carousel' ),
				'add_new_item'       => __( 'Add New Carousel' ),
				'new_item_name'      => __( 'New Carousel Name' ),
				'menu_name'          => __( 'Carousels' ),
			);
			$taxargs = array(
				'hierarchical'       => true,
				'labels'             => $taxlabels,
				'show_ui'            => true,
				'show_in_nav_menus'	 => false,
				'show_admin_column'  => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'carousel' ),
				'show_in_rest' 			=> true, // gutenberg
				'rest_base'         => 'carousel',
				'rest_controller_class' => 'WP_REST_Terms_Controller',
			);
			register_taxonomy( 'carousel', 'slide', $taxargs );
		} // end function


		/* ---------------------------------------------------------------
		 * ADMIN COLUMNS
		 *---------------------------------------------------------------*/

		public function dj_columns_filter( $columns ) {

			/* set up custom admin columns - posts
			-------------------------------------------------------------*/

			// unset defaults to reorder
			unset( $columns['title'] );
			unset( $columns['taxonomy-carousel'] );
			unset( $columns['date'] );

			// customize columns
			//$columns['thumbnail'] = 'Image';
			$columns['title'] = 'Slide';
			$columns['taxonomy-carousel'] = 'Assigned Carousel';
			$columns['slideorder'] = 'Slide Order';
			$columns['date'] = 'Published';

			return $columns;
		}

		public function djtax_columns_filter( $columns ) {

			/* set up custom admin columns - taxonomy
			-------------------------------------------------------------*/

			// unset defaults to reorder
			unset( $columns['description'] );
			unset( $columns['slug'] );
			unset( $columns['posts'] );

			// customize columns
			$columns['name'] = 'Carousel';
			$columns['carouselid'] = 'Carousel ID';
			$columns['shortcode'] = 'Shortcode';
			$columns['posts'] = 'Assigned Slides';

			return $columns;
		}

		public function dj_tax_column_action( $out, $column, $theme_id ) {

			/* get content for custom admin columns -taxonomy
			-------------------------------------------------------------*/
			$theme = get_term($theme_id, 'carousel');
			switch ( $column ) {
				case 'carouselid':
					$data = maybe_unserialize($theme->slug);
					$out .=  'dj_carousel_'.$data;
					break;
				case 'shortcode':
					$data = maybe_unserialize($theme->slug);
					$out .=  '[dj_carousel id="'.$data.'"]';
					break;
			}
			return $out;
		}

		public function dj_column_action( $column ) {

			/* get content for custom admin columns
			-------------------------------------------------------------*/
			global $post;
			switch ( $column ) {
				case 'thumbnail':
					echo get_the_post_thumbnail( $post->ID, 'thumbnail' );
					break;
				case 'slideorder':
					echo  $post->menu_order;
					break;
			}
		}

		public function be_custom_post_columns_sortable( $columns ) {

			/* declare which columns to be sortable and assign orderby label
			-------------------------------------------------------------*/
			$columns['slideorder'] = 'slideord';
			$columns['date'] = 'date';
			return $columns;
		}

		public function dj_slide_orderby( $query ) {

			/* set post order in admin list view
			-------------------------------------------------------------*/

		    if( ! is_admin() )
		        return;

		    // set default order (published date)
		    $post_type = $query->get('post_type');
		    if ( $post_type == 'slide' ) {
			        if ( $query->get( 'orderby' ) == '' ) {
			            $query->set( 'orderby', 'date' );
			        }
			        if( $query->get( 'order' ) == '' ){
			            $query->set( 'order', 'DESC' );
			        }
			        if( $query->get( 'posts_per_page' ) == '' ){
			            $query->set( 'posts_per_page', '-1' );
			        }
			}

		 	// set custom sortable order (upon selection)
		    $orderby = $query->get( 'orderby');
		    if( 'slideord' == $orderby ) {
		        $query->set('orderby','menu_order');
		    }
		} // end function

		/* ---------------------------------------------------------------
		 * REGISTER SHORTCODE
		 *---------------------------------------------------------------*/


		public function dj_carousel_shortcode( $atts ) {
			extract( shortcode_atts( array(
				'id' => '',
		      ), $atts, 'dj_carousel' ) );


			ob_start();

			global $post;
			$args = array(
		        'post_type' 		=> 'slide',
		        'posts_per_page' 	=> '-1',
		        'carousel' 			=> $id,
		        'orderby' 			=> 'menu_order',
		        'order' 			=> 'ASC'
		    );

			$loop = new WP_Query($args);

			$counter = 0;
			$total_posts = $loop->post_count;

			$carousel = get_term_by( 'slug', $id, 'carousel' );
			$title = $carousel->name;
			$description = $carousel->description;
			$description = $description ? $description : 'This is the '.$title.' - Carousel Display. The author has not provided a description.' ;

			echo '<div id="carouselExampleIndicators_'. $id .'" class="carousel slide carousel-fade" data-ride="carousel" data-interval="5000" data-pause="hover" role="complementary" aria-labelledby="id_title" aria-describedby="id_desc">
					<h2 id="id_title" class="sr-only">'.$title.' - Carousel Display</h2>
					<p id="id_desc" class="sr-only">'.$description.'</p>
			';



				echo '<div class="carousel-inner">';
					if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();
						/* retrieve the featured image -- aoda */
						$img_url = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'large');
						$img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), 'large' );
						$img_alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
						if (!$img_alt) { $img_alt = get_the_title($post->ID); }
						$content = apply_filters('the_content',  ( get_post($post->ID)->post_content) );

						$style = '';
						if ( !has_post_thumbnail() ) {
							$style='style="position:static"';
						}

						if ($counter == 0){ $activeclass = "active"; } else { $activeclass = ""; };
						echo '<div class="carousel-item '.$activeclass.'" role="tabpanel" id="tabpanel-'.$id.'-'.$counter.'" aria-labelledby="tab-'.$id.'-'.$counter.'">';
							if ( has_post_thumbnail() ) {
								echo '<figure><img class="d-block w-100" src="'.$img_url.'" alt="'.$img_alt.'" data-caption="#caption'.($counter + 1).'"></figure>';
							}
							if ($content){
								echo '<div class="carousel-caption" '.$style.' >
								'.$content.'
								</div>';
							}
						echo '</div>';

						$counter++;
					endwhile; else:
					endif;
					wp_reset_postdata();
				echo '</div>';

				echo '<ol class="carousel-indicators" role="tablist">';
				for( $i = 0; $i < $total_posts; $i++ ) {
					if ($i == 0){ $activeclass = "active"; } else { $activeclass = ""; };
					echo '<li data-target="#carouselExampleIndicators_'. $id .'" data-slide-to="'.$i.'" class="'.$activeclass.'" role="tablist" id="tab-'.$id.'-'.$i.'" aria-controls="tabpanel-'.$id.'-'.$i.'" aria-selected="false" tabindex="-1"><span class="sr-only">Slide '.($i+1).'</span></li>';
				}
				echo '</ol>';


				echo'<a class="carousel-control-prev" href="#carouselExampleIndicators_'. $id .'" role="button" data-slide="prev" aria-label="Show previous slide">
				    <span class="carousel-control-prev-icon" aria-hidden="true">
				    	<i class="fas fa-chevron-left"></i>
				    </span>
				    <span class="sr-only">Previous</span>
				  </a>
				  <a class="carousel-control-next" href="#carouselExampleIndicators_'. $id .'" role="button" data-slide="next" aria-label="Show next slide">
				    <span class="carousel-control-next-icon" aria-hidden="true">
				    	<i class="fas fa-chevron-right"></i>
				    </span>
				    <span class="sr-only">Next</span>
				  </a>';


			echo '</div>';

			return ob_get_clean();
		 }



	} // end class

	new DJ_Bootstrap_Carousel();
}

register_block_type(
	'cgb/carousel',
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
		'render_callback' => 'dj_render_block_carousel',
	)
);

/**
 * The gutenberg block carousel
 *
 */
function dj_render_block_carousel( $attributes, $content ) {

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
		$css_style .= '#carousel_'. $term .' .carousel-inner { height:'. $attributes['height'] .' }';
		$css_style .= '#carousel_'. $term .' .carousel-inner .carousel-item { height:'. $attributes['height'] .' }';

		if ( isset( $attributes['align'] ) ) {
			if ($attributes['align'] === 'full'){
				$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:initial }';
			}
		} else {
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:'. $attributes['height'] .' }';
		}
	}
	if ( isset( $attributes['heightxl'] ) ) {
		$css_style .= '@media (min-width: 1500px) {';
		$css_style .= '#carousel_'. $term .' .carousel-inner { height:'. $attributes['heightxl'] .' }';
		$css_style .= '#carousel_'. $term .' .carousel-inner .carousel-item { height:'. $attributes['heightxl'] .' }';

		if ($attributes['align'] === 'full'){
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:initial }';
		} else {
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:'. $attributes['heightxl'] .' }';
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightlg'] ) ) {
		$css_style .= '@media (max-width: 1199px) {';
		$css_style .= '#carousel_'. $term .' .carousel-inner { height:'. $attributes['heightlg'] .' }';
		$css_style .= '#carousel_'. $term .' .carousel-inner .carousel-item { height:'. $attributes['heightlg'] .' }';

		if ($attributes['align'] === 'full'){
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:initial }';
		} else {
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:'. $attributes['heightlg'] .' }';
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightmd'] ) ) {
		$css_style .= '@media (max-width: 991px) {';
		$css_style .= '#carousel_'. $term .' .carousel-inner { height:'. $attributes['heightmd'] .' }';
		$css_style .= '#carousel_'. $term .' .carousel-inner .carousel-item { height:'. $attributes['heightmd'] .' }';

		if ($attributes['align'] === 'full'){
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:initial }';
		} else {
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:'. $attributes['heightmd'] .' }';
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightsm'] ) ) {
		$css_style .= '@media (max-width: 767px) {';
		$css_style .= '#carousel_'. $term .' .carousel-inner { height:'. $attributes['heightsm'] .' }';
		$css_style .= '#carousel_'. $term .' .carousel-inner .carousel-item { height:'. $attributes['heightsm'] .' }';

		if ($attributes['align'] === 'full'){
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:initial }';
		} else {
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:'. $attributes['heightsm'] .' }';
		}
		$css_style .= '}';
	}
	if ( isset( $attributes['heightxs'] ) ) {
		$css_style .= '@media (max-width: 575px) {';
		$css_style .= '#carousel_'. $term .' .carousel-inner { height:'. $attributes['heightxs'] .' }';
		$css_style .= '#carousel_'. $term .' .carousel-inner .carousel-item { height:'. $attributes['heightxs'] .' }';

		if ($attributes['align'] === 'full'){
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:initial }';
		} else {
			$css_style .= '#carousel_'. $term .' .carousel-inner figure img{ max-height:'. $attributes['heightxs'] .' }';
		}
		$css_style .= '}';
	}



	global $post;
	$args = array(
        'post_type' 		=> 'slide',
        'posts_per_page' 	=> '-1',
        'carousel' 			=> $term,
        'orderby' 			=> 'menu_order',
        'order' 			=> 'ASC'
	);
	
	$loop = new WP_Query($args);

	$counter = 0;
	$total_posts = $loop->post_count;

	$carousel = get_term_by( 'slug', $term, 'carousel' );
	$title = $carousel->name;
	$description = $carousel->description;
	$description = $description ? $description : 'This is the '.$title.' - Carousel Display. The author has not provided a description.' ;

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

				if ( has_post_thumbnail() ) {
					$carouselOutput .= '<figure class="featured-figure"><img class="d-block" src="'.$img_url.'" srcset="'.esc_attr( $img_srcset ).'" sizes="(max-width: 50em) 100vw, 100%" alt="'.$img_alt.'" data-caption="#caption'.($counter + 1).'"></figure>';
				}

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
		$carouselOutput .= '<p class="mb-0 p-carousel-controls"><a class="carousel-control-prev" href="#carousel_'. $term .'" role="button" data-slide="prev" aria-label="Show previous slide" title="Show previous slide"><span class="carousel-control-prev-icon fas fa-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carousel_'. $term .'" role="button" data-slide="next" aria-label="Show next slide" title="Show next slide"><span class="carousel-control-next-icon fas fa-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></p>';
	}

	$carouselOutput .= '</div>';

	$css_style .= '</style>';

	return $css_style.$carouselOutput;
}


?>
