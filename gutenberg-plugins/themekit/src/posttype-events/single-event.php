<?php get_header(); ?>
<main role="main" class="template-wrapper template-wrapper-single-event" > 
  <article role="article">

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <!-- inside the loop -->
      
      <?php
        /* retrieve the post featured image -- aoda */
        $feat_img_url = wp_get_attachment_image_url( get_post_thumbnail_id( get_the_ID() ), 'large');
        $feat_img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( get_the_ID() ), 'large' );
        $feat_img_alt = get_post_meta(get_post_thumbnail_id(get_the_ID()), '_wp_attachment_image_alt', true); 
        
        if (!$feat_img_alt) { $feat_img_alt = get_the_title(get_the_ID()); }        
     
        $the_title = get_the_title();
        
        // add Event Type header before content
        $term_obj_list = get_the_terms( get_the_ID(), 'event-type' );
        
        
        if ($term_obj_list) {
            $cat_id = $term_obj_list[0]->term_id;
            $term_id = apply_filters( 'wpml_object_id', $cat_id, 'event-type', FALSE, 'en'); // Replace category with taxonomy name and en with language code and pass the term ID in $original_term_id_here.
            $term = get_term_by('id', $term_id, 'event-type', 'ARRAY_A'); // get category details in array
            $image_id = get_term_meta ( $term['term_id'], 'category-image-id', true );

            /* retrieve the taxonomy term featured image -- aoda */
            $img_url = wp_get_attachment_image_url( $image_id, 'full');
            $img_srcset = wp_get_attachment_image_srcset( $image_id, 'full' );
            $img_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true); 
            
            if (!$img_alt) { $img_alt = get_the_title(get_the_ID()); }  

            if ($image_id){
              
              echo '<header class="wp-block-cover alignfull header-event" style="background-image:url('.$img_url.')">
                      <span class="sr-only"> IXIATalks Events </span>
                      </header>';
              echo '<section class="has-theme-light-background-color alignfull pb-5"><div class="container">';
            } 

        }

        $event_start_date = get_post_meta( get_the_ID(), 'post_event_date', true );
        $event_end_date = get_post_meta( get_the_ID(), 'post_event_end_date', true );
        $event_all_day = get_post_meta( get_the_ID(), 'post_event_all_day', true );

        $event_time_zone = get_post_meta( get_the_ID(), 'post_event_time_zone', true );

        $event_start_date_formatted = date("c", strtotime($event_start_date));
        $event_start_heading = date("F Y", strtotime($event_start_date));
        $event_start_month = date("M", strtotime($event_start_date));
        $event_start_day = date("d", strtotime($event_start_date));
        
        $event_start_date_display = date("F j, Y", strtotime($event_start_date));

        $event_start_time = date("g:i a", strtotime($event_start_date));
        $event_end_time = date("g:i a", strtotime($event_end_date));
        
        $event_display_time = '';
        if ($event_all_day == true ){
            $event_display_time = __('All Day', 'paintedrobotevent');
        } else {
            $event_display_time = $event_start_time. ' - ' .$event_end_time . ' ' .$event_time_zone;
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

      
      ?>

      <?php // event details */ ?>
      <hr class="alignfull style-line"/>
      <div class="wp-block-cover alignfull has-theme-primary-dark-background-color has-background-dim" style="min-height:200px">
        <div class="wp-block-cover__inner-container">
          <div class="row title-row align-items-end">
            <div class="col-lg-9 col-md-8">
              <h1 class="has-lead-font-size mb-0"><?php the_title(); ?></h1>
            </div>
            <div class="col-lg-3 col-md-4">
                <p class="has-text-align-left has-theme-secondary-color has-text-color event-date-p"><i class="fas fa-calendar-alt"><span class="sr-only">Date Icon</span></i> <time datetime="<?php echo $event_start_date_formatted; ?>" itemprop="dateEvent"><?php echo $event_start_date_display; ?></time></p>
                <p class="has-text-align-left has-theme-white-color has-text-color "><i class="far fa-clock"><span class="sr-only">Clock Icon</span></i> <?php echo $event_display_time;?>
                  <br><?php echo $terms_location;?>
                </p>
            </div>
          </div>
      </div></div>
      <?php
        echo '<section class="has-theme-light-background-color alignfull pb-5"><div class="container">';

      ?>
      <?php
        /* featured image */
         
       /*if ($feat_img_url){
          echo'<div class="wp-block-cover" style="background-image:url('.$feat_img_url.');min-height:530px">
          <div class="wp-block-cover__inner-container"></div></div>';
      } else {
        if ($term['slug'] == 'ixiashows')
          if ( is_active_sidebar( 'ixiashows-fallback-image' ) ) { 
            dynamic_sidebar( 'ixiashows-fallback-image' ); 
          } 
      }*/
      ?>
      
      <?php the_content(); ?>
      
      <?php 
        //$term_event_type = category
        /*$queried_object_cat = $term_event_type[0];
        $term_id = apply_filters( 'wpml_object_id', $queried_object_cat, 'event-type', FALSE, 'en'); // translate compatibility
        $term = get_term_by('id', $term_id, 'category', 'ARRAY_A'); // get category details in array
        $term_link = get_term_link( $term['term_id'], 'category' );*/
        
        
       // pagination 

        $term_link = get_term_link( $term['term_id'], 'event-type' );
        //print_r($term);
        if ($term['slug']  == 'conference'){
          $landing_page_id = get_option( 'conferences_page' );
        } else {
          $landing_page_id = get_option( 'events_page' );
        }

        // wpml compatibility
        if(function_exists('icl_object_id')) {
          $landing_page_id = icl_object_id($landing_page_id, 'event', false, ICL_LANGUAGE_CODE);
        }
        $pagination_back = get_permalink($landing_page_id);
        
      ?>
      <div class="row post-pagination-row py-5 align-items-end alignwide justify-content-around">
        <div class="col justify-content-center align-items-center d-flex has-theme-default-color flex-grow-0 flex-shrink-1">
          <div class="nav-back aligncenter d-flex flex-column has-para-lead-font-size">
            <i class="fas fa-chevron-up has-theme-secondary-color"><span class="sr-only"><?php echo  __('Chevron Right Icon', 'paintedrobot'); ?></span></i>
            <a href="<?php echo $pagination_back; ?>" rel="back"><?php echo __('Back', 'paintedrobot'); ?></a>
            <small><a href="<?php echo $pagination_back; ?>" rel="back"><?php echo __('All', 'paintedrobot'); ?></a></small>
          </div>
        </div>
      </div>
      
      <?php
        // share
        echo '<hr class="mt-5"/>';
          $post_title = esc_html( get_the_title($post->ID) );
          $share_post_title = rawurlencode($post_title);
          
          $post_URL = esc_url( get_permalink($post->ID) );
          $share_post_URL = str_replace(':', '%3A', $post_URL);

          $share_excerpt =  get_the_excerpt($post->ID);
          if (strlen($share_excerpt) > 200) { 
            $share_excerpt = substr($share_excerpt, 0, strrpos(substr($share_excerpt, 0, 200), ' '));
          }
          $share_excerpt = rawurlencode($share_excerpt);

          $share_site_title = get_bloginfo('name');
          $share_site_url = get_bloginfo('url');

          $facebook_URL = 'https://www.facebook.com/sharer/sharer.php?u='.$share_post_URL;

          $share_output = '<ul class="social-media-share-nav"><li class="title sr-only">Share:</li><li class="nav-item"><a href="'.$facebook_URL.'" target="_blank" title="Share this post on Facebook" class="share-link nav-link"><i class="fab fa-facebook-f"></i><span class="sr-only">Share this post on Facebook</span></a></li><li class="nav-item"><a href="http://twitter.com/share?text='.$share_post_title.'&amp;url='.$share_post_URL.'" target="_blank" title="Share this post on Twitter" class="share-link li-share-link nav-link"><i class="fab fa-twitter"><span class="sr-only">Share this post on Twitter</span></i></a></li><li class="nav-item"><a href="http://www.linkedin.com/shareArticle?mini=true&url='.$post_URL.'" target="_blank" title="Share this post on LinkedIn" class="share-link li-share-link nav-link"><i class="fab fa-linkedin-in"><span class="sr-only">Share this post on LinkedIn</span></i></a></li></ul>';

          echo $share_output;

        echo '<hr/>';
      ?>

      <?php 
        if ($term_obj_list) { 
          echo '</div></section>';
        }
      ?>
               
              
    <!-- end the loop -->
    <?php endwhile; else: ?>
    <?php endif; ?>

    
  </article>
</main>

<?php get_footer(); ?>