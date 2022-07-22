<?php 
/**
 * Enqueue frontend script for tabs block
 *
 * @return void
 */
function add_frontend_assets_gallery_carousel() {
    wp_enqueue_script(
        'gallery-carousel-front-script',
        plugins_url( 'block-styles/gallerycarousel.js', dirname( __FILE__ ) ),
        array( 'jquery' ),
        '1.0',
        true
    );
}

add_action( 'wp_enqueue_scripts', 'add_frontend_assets_gallery_carousel' );
?>