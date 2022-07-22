<?php 
/**
 * Enqueue frontend script for tabs block
 *
 * @return void
 */
function add_frontend_assets_icon_animation() {
    wp_enqueue_script(
        'icon-animation-front-script',
        plugins_url( 'icon-circle-animation/front.js', dirname( __FILE__ ) ),
        array( 'jquery' ),
        '1.0',
        true
    );
}

add_action( 'wp_enqueue_scripts', 'add_frontend_assets_icon_animation' );
?>