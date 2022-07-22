<?php 

  $addon_landing_page_id = get_option( 'addon_page' );
  
  if(function_exists('icl_object_id')) {
    $addon_landing_page_id_new = icl_object_id($addon_landing_page_id, 'addon', false, ICL_LANGUAGE_CODE);
  }

?>
<?php get_header(); ?>
<main role="main" class="template-wrapper template-wrapper-archive" > 
  <article role="article">

  <?php
    $args = array(
      'page_id' => $addon_landing_page_id,
    );

    $loop = new WP_Query($args);

    if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();?>
        <!-- inside the loop -->
          
          <?php
            global $post;
            setup_postdata( $post );

            /* retrieve the featured image -- aoda */
            $img_url = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'full');
            $img_srcset = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), 'full' );
            $img_alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true); 
              
            // fallback banner image
            /*$image_id = get_option( 'myprefix_image_id' );
            if (!$img_url){
              $img_url = wp_get_attachment_image_url( $image_id, 'full');
              $img_srcset = wp_get_attachment_image_srcset( $image_id, 'full' );
              $img_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true); 
            }*/
            
            if (!$img_alt) { $img_alt = get_the_title($post->ID); }
      
            $the_title = get_the_title();
            
          ?>
          
          <?php the_content(); ?>
                
                
        <!-- end the loop -->
        <?php endwhile; else: ?>
      <?php endif; ?>
    <?php wp_reset_postdata(); ?>


  </article>
</main>

<?php get_footer(); ?>