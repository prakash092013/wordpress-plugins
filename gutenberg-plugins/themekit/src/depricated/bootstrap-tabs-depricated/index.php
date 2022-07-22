<?php 
/**
 * Enqueue frontend script for tabs block
 *
 * @return void
 */
function add_frontend_assets_tabs() {
    wp_enqueue_script(
        'tabs-front-script',
        plugins_url( 'bootstrap-tabs/front.js', dirname( __FILE__ ) ),
        array( 'jquery' ),
        '1.0',
        true
    );
}

add_action( 'wp_enqueue_scripts', 'add_frontend_assets_tabs' );
?>