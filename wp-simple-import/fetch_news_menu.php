<?php
add_action( 'admin_menu', 'mn_add_menu_page_callback');
function mn_add_menu_page_callback() {
    add_menu_page(
          'Simple Import',
          'Import XML',
          'manage_options',
          'simple-import',
          'import_api_callback',
          'dashicons-admin-site',
          9
    );

    add_submenu_page( 
          'simple-import',
          'Import History',
          'Import History',
          'manage_options',
          'import-history',
          'import_history_api_callback'
    );

}

add_action( 'admin_enqueue_scripts', 'enqueue_admin_js');
function enqueue_admin_js($hook){
    if( $hook == "toplevel_page_simple-import" ){

      $js_path = plugins_url().'/wp-simple-import/js/my_script.js';
      $css_path = plugins_url().'/wp-simple-import/css/my_styles.css';
      $bs_css_url = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';

      wp_register_style( 'custom_bootstrap_css', $bs_css_url );
      wp_enqueue_style( 'custom_bootstrap_css' );

      wp_register_style( 'custom_style_css', $css_path );
      wp_enqueue_style( 'custom_style_css' );

      // Register the script
      wp_register_script( 'my_custom_script', $js_path );

      // Localize the script with new data
      $translation_array = array(  
                            'ajaxurl'    => admin_url( 'admin-ajax.php' ),
                            'ajax_nonce' => wp_create_nonce('auth_xml_file'),
                           );
      wp_localize_script( 'my_custom_script', 'my_obj', $translation_array );

      // Enqueued script with localized data.
      wp_enqueue_script( 'my_custom_script' );
      
    }
}

// callback function for displaying the listing in admin
function import_api_callback(){ 
  $Import_xml = new Import_xml();
  ?>
  
  <div class="wrap">
      <h2><span class="dashicons dashicons-category" style="font-size: 30px;margin-right: 20px;"></span> Import XML</h2>
      <div class="row">
        <div class="col-md-4">
            <?php echo $Import_xml->display_import_form(); ?>
        </div>
      </div>
  </div>
<?php }

function import_history_api_callback(){
    $exampleListTable = new Example_List_Table();
    $exampleListTable->prepare_items();
    ?>
        <div class="wrap">
            <h2><span class="dashicons dashicons-backup" style="font-size: 30px;margin-right: 20px;"></span> Import History</h2>
            <div id="ajax_response_news"></div>
            <?php $exampleListTable->display(); ?>
        </div>
    <?php
}
?>