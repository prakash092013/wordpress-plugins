<?php
/* ----------------------------------------------------------
 * Custom post type:  Dita Roles dita-ccms-overview
 *-----------------------------------------------------------*/

defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'CaseStudies_Custom_Post_Type' ) ) {

	class CaseStudies_Custom_Post_Type {

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
				'name'        		 => _x( 'Case Studies', 'post type general name' ),
				'singular_name'      => _x( 'Case Study', 'post type singular name' ),
				'add_new'            => _x( 'Add New Case Study', 'dita-ccms-add-ons' ),
				'add_new_item'       => __( 'Add New Case Study' ),
				'edit_item'          => __( 'Edit Case Study' ),
				'new_item'           => __( 'New Case Study' ),
				'all_items'          => __( 'Case Studies' ),
				'view_item'          => __( 'View Case Study' ),
				'search_items'       => __( 'Search Case Studies' ),
				'not_found'          => __( 'No Case Studies found' ),
				'not_found_in_trash' => __( 'No Case Studies found in the Trash' ),
				'parent_item_colon'  => '',
				'menu_name'          => __( 'Case Studies' ),
            );
            
			$args = array(
				'labels'       		 => $labels,
				'description'   	 => 'Case Study.',
				'public'        	 => true,
                'show_in_menu'  	 => 'edit.php?post_type=page',
				'show_in_nav_menus'	 => false,
				'menu_icon'          => 'dashicons-admin-page',
				//'taxonomies' 		 => array('addon_category'),
                'supports'      	 => array( 'title', 'editor', 'page-attributes', 'excerpt',  'thumbnail', 'custom-fields'  ),
                'rewrite' => [
                    'slug' => 'why-ixiasoft/ccms-success-story',
                    'with_front' => false
                ],
				'has_archive'   	 => true,
				'hierarchical'   	 => true,
				'show_in_rest' 			=> true, // gutenberg
				//'template'           => $template,
			);
            register_post_type( 'cms-case-studies', $args );

             /* custom meta fields
            -------------------------------------------------------------*/
            register_meta('post', 'case_study_readmore', array(
                'show_in_rest' => true,
                'type' => 'string',
                'single' => true,
                'object_subtype' => 'cms-case-studies', // custom post type
            ));

            
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
                'casestudy_page', // option name
                $args 
            );

            // add our new setting
            add_settings_field(
                'casestudy_page', // ID
                __('Case Studies Landing Page', 'textdomain'), // Title
                array( $this, 'setting_callback_function'), // Callback
                'reading', // page
                'default', // section
                array( 'label_for' => 'casestudy_page' )
            );

        }

        
        public function setting_callback_function($args){
            
            /* Setting callback function
            -------------------------------------------------------------*/

            // get saved project page ID
            $project_page_id = get_option('casestudy_page');

            // get all pages
            $args = array(
                'posts_per_page'   => -1,
                'orderby'          => 'name',
                'order'            => 'ASC',
                'post_type'        => 'page',
            );
            $items = get_posts( $args );

            echo '<select id="casestudy_page" name="casestudy_page">';
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
            $project_page_id = get_option('casestudy_page');

            // add our custom state after the post title only,
            // if post-type is "page",
            // "$post->ID" matches the "$project_page_id",
            // and "$project_page_id" is not "0"
            if( 'page' == get_post_type(get_the_ID()) && get_the_ID() == $project_page_id && $project_page_id != '0') {
                $states[] = __('Case Studies Landing Page', 'textdomain');
            }

            return $states;
        }

        /* ----------------------------------------------------------
        *  Include archive custom template
        * see: https://wordpress.stackexchange.com/questions/115968/create-a-custom-archive-page-for-a-custom-post-type-in-a-plugin
        *-----------------------------------------------------------*/
        function archive_template( $template ) {
            if ( is_post_type_archive('cms-case-studies') ) {
                $theme_files = array('archive-cms-case-studies.php');
                $exists_in_theme = locate_template($theme_files, false);
                if ( $exists_in_theme != '' ) {
                    return $exists_in_theme;
                } else {
                    return plugin_dir_path(__FILE__) . 'archive-cms-case-studies.php';
                }
            }
            return $template;
        }



        
    } // end class

	new CaseStudies_Custom_Post_Type();
}


/**
 * Register block patterns.
 * Include this file in your theme, and update image paths, prefix and text domain.
 *
 * @link https://developer.wordpress.org/block-editor/developers/block-api/block-patterns/
 * @link https://fullsiteediting.com/lessons/introduction-to-block-patterns/
 */

/**
 * Make sure that block patterns are enabled before registering.
 * Requires WordPress version 5.5 or Gutenberg version 7.8.
 */
if ( function_exists( 'register_block_pattern' ) ) {
    /*
    example from https://fullsiteediting.com/lessons/introduction-to-block-patterns/ :
        register_block_pattern(
            'twentytwenty/contact-form',
            array(
                'title'         => The visible name in the editor,
                'viewportWidth' => The width of the pattern preview (int),
                'categories'    => An array of categories,
                'description'   => A description of the pattern,
                'keywords'      => An array of keywords used in the search,
                'content'       => The block comment and markup,
            )
        );
    */

    /**
     * Check if the register_block_pattern_category exists.
     * Requires WordPress 5.5 or Gutenberg version 8.2.
     */
    if ( function_exists( 'register_block_pattern_category' ) ) {
        register_block_pattern_category(
            'case-study',
            array( 'label' => __( 'Case Study', 'cgb' ) )
        );
    }

    register_block_pattern(
        'cgb/call-to-action',
        array(
            'title'       => __( 'Case Study', 'cgb' ),
            'description' => _x( 'Case Study Template.', 'Block pattern description', 'cgb' ),
            'categories'  => array('case-study'),
            'keywords'    => array('case', 'study', 'success', 'story'),
            'content'     => "<!-- wp:group {\"align\":\"full\",\"backgroundColor\":\"theme-light\"} -->\n<div class=\"wp-block-group alignfull has-theme-light-background-color has-background\"><div class=\"wp-block-group__inner-container\"><!-- wp:paragraph {\"align\":\"center\",\"className\":\"is-style-subheading\",\"textColor\":\"theme-secondary-dark\"} -->\n<p class=\"has-text-align-center is-style-subheading has-theme-secondary-dark-color has-text-color\">SUCCESS STORIES</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {\"align\":\"center\",\"level\":1,\"className\":\"is-style-heading-style-primary\"} -->\n<h1 class=\"has-text-align-center is-style-heading-style-primary\">Customer Case Study</h1>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\",\"fontSize\":\"lead\"} -->\n<p class=\"has-text-align-center has-lead-font-size\"><span class=\"is-style-font-weight-light\">Read this case study to find out how a global leader in mining technology evolved from Microsoft Word to IXIASOFT CCMS to streamline documentation.</span></p>\n<!-- /wp:paragraph --></div></div>\n<!-- /wp:group -->\n\n<!-- wp:group {\"align\":\"full\",\"backgroundColor\":\"theme-medium-light\"} -->\n<div class=\"wp-block-group alignfull has-theme-medium-light-background-color has-background\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns {\"align\":\"wide\"} -->\n<div class=\"wp-block-columns alignwide\"><!-- wp:column {\"width\":25} -->\n<div class=\"wp-block-column\" style=\"flex-basis:25%\"><!-- wp:paragraph {\"className\":\"is-style-subheading\",\"textColor\":\"theme-primary-dark\"} -->\n<p class=\"is-style-subheading has-theme-primary-dark-color has-text-color\">HOW A GLOBAL LEADER IN MINING TECHNOLOGY SWITCHED FROM MICROSOFT WORD TO IXIASOFT CCMS TO MANAGE DOCUMENTATION</p>\n<!-- /wp:paragraph --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:paragraph -->\n<p>One of IXIASOFT’s European customers is a global leader in mineral and metal processing technology. It comprises more than 4,500 employees, a global network of service centres and research facilities, and sees annual sales reaching past one billion (EUR). The company works to provide technologies and services to encourage the sustainable use of the earth’s natural resources. Over the past few years, the company has developed numerous breakthrough technologies and innovative solutions for industrial water treatment, the utilization of alternative energy sources, and the chemical industry.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>The company operates in two main business areas: minerals processing and materials, and energy and water. Each area is divided into seven product groups, containing a total of seventeen product lines, with each product line holding dozens of products. In total, the company offers more than 1,400 solutions.</p>\n<!-- /wp:paragraph --></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"width\":25} -->\n<div class=\"wp-block-column\" style=\"flex-basis:25%\"><!-- wp:image {\"id\":2095,\"sizeSlug\":\"large\"} -->\n<figure class=\"wp-block-image size-large\"><img src=\"http://www-new.ixiasoft.com/wp-content/uploads/2020/09/no-logos_360x280.png\" alt=\"\" class=\"wp-image-2095\"/></figure>\n<!-- /wp:image --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns -->\n\n<!-- wp:paragraph -->\n<p>Each area is divided into seven product groups, containing a total of seventeen product lines, with each product line holding dozens of products. In total, the company offers more than 1,400 solutions.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>Prior to adopting a CCMS, this company used Microsoft Word to create and manage documentation. In an industry that often involves dealing with large, complicated, and high-risk equipment, abiding to local laws and regulations is crucial. One small error can cause a 100-degree sulfuric acid leak…or worse. Creating consistent, maintainable, user friendly, and accurate content was challenging, especially as the company continued to grow and expand. In 2019, this company deployed IXIASOFT CCMS. Here is their story:</p>\n<!-- /wp:paragraph --></div></div>\n<!-- /wp:group -->\n\n<!-- wp:group {\"align\":\"full\",\"backgroundColor\":\"theme-white\"} -->\n<div class=\"wp-block-group alignfull has-theme-white-background-color has-background\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column {\"width\":66.66} -->\n<div class=\"wp-block-column\" style=\"flex-basis:66.66%\"><!-- wp:heading {\"align\":\"center\",\"className\":\"is-style-heading-style-1\"} -->\n<h2 class=\"has-text-align-center is-style-heading-style-1 mt-0\">DRIVERS FOR ADOPTING A CCMS</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Leading up to the selection of IXIASOFT CCMS, the company faced several pain points in their previous documentation environment that made it difficult to streamline the documentation process. These included:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Struggle to produce consistent, harmonized documentation</li><li>Difficulty maintaining content (lots of repetition, tracking versions)</li><li>Limited searchability for writers and users</li><li>High printing costs (some documentation packs with 100,000+ pages)</li><li>Silos between geographically dispersed departments and teams within the company</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:paragraph -->\n<p>In addition to wanting to overcome their pain points, the company had other drivers that led them to adopt IXIASOFT CCMS:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Needed to localize to 20-30 different languages while increasing localization efficiency and decreasing costs</li><li>A greater need for accuracy within documentation, especially handling product variants</li><li>Wanted to promote consistent branding across all documents and platforms</li><li>Desire to cut down on DTP costs for source and translated content</li></ul>\n<!-- /wp:list --></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"width\":33.33} -->\n<div class=\"wp-block-column\" style=\"flex-basis:33.33%\"><!-- wp:paragraph {\"className\":\"is-style-subheading\",\"textColor\":\"theme-secondary-dark\"} -->\n<p class=\"is-style-subheading has-theme-secondary-dark-color has-text-color\">QUICK FACTS</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Illustrative combined sales 2019: 4.5k/+1billion revenue</li><li>4,500 employees</li><li>Business areas: Minerals Processing and Metals, Energy &amp; Water</li><li>Shares listed on NASDAQ OMX Helsinki</li></ul>\n<!-- /wp:list --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns -->\n\n<!-- wp:image {\"align\":\"center\",\"id\":2092,\"width\":880,\"height\":503,\"sizeSlug\":\"full\"} -->\n<div class=\"wp-block-image\"><figure class=\"aligncenter size-full is-resized\"><img src=\"http://www-new.ixiasoft.com/wp-content/uploads/2020/09/MicrosoftTeams-image.jpg\" alt=\"\" class=\"wp-image-2092\" width=\"880\" height=\"503\"/></figure></div>\n<!-- /wp:image -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:group {\"align\":\"full\",\"backgroundColor\":\"theme-medium-light\"} -->\n<div class=\"wp-block-group alignfull has-theme-medium-light-background-color has-background\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"align\":\"center\",\"className\":\"is-style-heading-style-1\"} -->\n<h2 class=\"has-text-align-center is-style-heading-style-1\">WHY IXIASOFT CCMS?</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"textColor\":\"theme-secondary-dark\",\"fontSize\":\"para-lead\"} -->\n<p class=\"has-theme-secondary-dark-color has-text-color has-para-lead-font-size\">Greater Control of Content</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>One reason for adopting IXIASOFT CCMS was to gain more control over content, particularly in the production of IOMS (installation, operation, maintenance, service) manuals for proprietary equipment and service workbooks for both customers and internal audiences. These equipment user manuals cover the entire lifecycle of a product. Each manual is split up into 10 sections including: description of equipment, safety, transportation and storage, installation, operation, maintenance, de-commissioning, and disposal with a perfect opportunity for reuse.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"textColor\":\"theme-secondary-dark\",\"fontSize\":\"para-lead\"} -->\n<p class=\"has-theme-secondary-dark-color has-text-color has-para-lead-font-size\">Dynamic Release Management (DRM)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>The company describes IXIASOFT’s DRM module as the “deal maker” in their CCMS selection process. At the time of selection, the company had 19 flotation cell projects on the go. Each project contained multiple sizes of flotation cells, and each cell contained multiple variables, and had its own unique delivery. Other CCMS suppliers’ solutions required a total freeze of the structure each time something was published, thus duplicating content and multiplying versions checks. With DRM, the company can branch out variables from its master manual, which provides a much more efficient solution and more control on updates.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"textColor\":\"theme-secondary-dark\",\"fontSize\":\"para-lead\"} -->\n<p class=\"has-theme-secondary-dark-color has-text-color has-para-lead-font-size\">Possibility to Localize Efficiently to Multiple Languages</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>IXIASOFT CCMS facilitates not only the production of manuals, but the localization process as well. Localization was another essential point for this company. By law, the company is required to deliver content in the user’s language. With this essential component , the company can deliver documentation in up to 30 languages in an robust, cost- and time-effective way.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph {\"textColor\":\"theme-secondary-dark\",\"fontSize\":\"para-lead\"} -->\n<p class=\"has-theme-secondary-dark-color has-text-color has-para-lead-font-size\">Simple Interface</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>Another component that attracted the company to IXIASOFT CCMS was its simple user interface. Compared to other tools they had considered, the dashboard layout was intuitive for users who had never used DITA before.</p>\n<!-- /wp:paragraph --></div></div>\n<!-- /wp:group -->\n\n<!-- wp:group {\"align\":\"full\"} -->\n<div class=\"wp-block-group alignfull\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"align\":\"center\",\"className\":\"is-style-heading-style-1\"} -->\n<h2 class=\"has-text-align-center is-style-heading-style-1\">WHY MOVE TO STRUCTURED CONTENT/DITA?</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>This company, having previous in-house experiences with DITA, did not think twice about the decision – DITA was a&nbsp;<em>must</em>. The company chose IXIASOFT CCMS because it would provide them with an “off the shelf” solution. They wanted to choose a CCMS that offered an abundance of features so they could pick and choose which ones to use throughout the documentation journey. They recommend DITA and IXIASOFT for any company looking to scalable content architecture and toolset.</p>\n<!-- /wp:paragraph --></div></div>\n<!-- /wp:group --></div></div>\n<!-- /wp:group -->\n\n<!-- wp:group {\"align\":\"full\",\"backgroundColor\":\"theme-medium-light\"} -->\n<div class=\"wp-block-group alignfull has-theme-medium-light-background-color has-background\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading {\"align\":\"center\",\"className\":\"is-style-heading-style-1\"} -->\n<h2 class=\"has-text-align-center is-style-heading-style-1\">LOOKING INTO THE FUTURE</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>As the company progresses through its documentation journey, it plans to use IXIASOFT CCMS to its full advantage to continue to produce high quality documents for customers, and to help build the brand in a consistent manner across all publications.&nbsp;</p>\n<!-- /wp:paragraph --></div></div>\n<!-- /wp:group -->",
        )
    );
}


register_block_type(
	'cgb/excerpt-case-studies',
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
				'default' => 'Continue Reading',
			),
			
		),
		'render_callback' => 'dj_render_block_case_studies',
	)
);

/**
 * The gutenberg block 
 *
 */
function dj_render_block_case_studies( $attributes, $content ) {

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

	$blockOutput .= '<div class="wp-block-cgb-case-studies row'.$className.'">';
	/* ----------------------------------------------------------
	*  	team members - the loop
	*-----------------------------------------------------------*/

	global $post;
	$args = array(
        'post_type' 		=> 'cms-case-studies',
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
        
        $read_more_text = get_post_meta( get_the_ID(), 'case_study_readmore', true );

		$column_class = 'col-sm-6';
		if ($range_columns == 3) {
			$column_class = 'col-md-4 col-sm-6';
		} else if ($range_columns == 2) {
			$column_class = 'col-sm-6';
        }
        
        if ($read_more_text) {
            $readmore = $read_more_text;
        }
		
		/* card content
		*-----------------------------------------------------------*/
            $blockOutput .= '<div class="card-column '.$column_class.'">
                                <div class="wp-block-cgb-card card h-100">
                                    <figure class="card-img-top text-center">
                                        <img class="img-fluid" src="'. esc_url( $img_url ).'"
                                            srcset="'.esc_attr( $img_srcset ).'"
                                            sizes="(max-width: 50em) 100vw, 100%" class="" alt="'.esc_attr( $img_alt ).'">
                                    </figure>
                                    <div class="card-body text-center">
                                        
                                        <h3 class="card-title  sr-only">'.$title.'</h3>';
                                        
                                        /*if ( $job_title ) {
                                            $blockOutput .= '<p class="card-text job-title text-center">'.$job_title.'</p>';
                                        } 

                                        if ($linkedin) {
                                            $blockOutput .= '<a href="'.$linkedin.'" class="linkedin-href text-center" target="_blank"><i class="fab fa-linkedin"><span class="sr-only">Linkedin Icon</span></i></a>';
                                        }*/

                                        $blockOutput .= $content;

                                    $blockOutput .= '</div>';
                                    $blockOutput .= '<div class="wp-block-buttons card-footer">
                                    <div class="wp-block-button aligncenter"><a class="wp-block-button__link has-theme-white-color has-theme-secondary-background-color has-text-color has-background no-border-radius" href="'.$url.'" title="View: '.$title.'">'.$readmore.'</a></div>
                                    </div>';
							
							
                                $blockOutput .= '</div></div>';
		

	endwhile; else:
	endif;
	wp_reset_postdata();
    $blockOutput .= '</div>'; // row


	return $blockOutput;
}

?>
