<?php
/*
Plugin Name: Post Header Form
Description: Post Header From plugin
Author: WordPress Capital
Author URI: https://wordpresscapital.com
Text Domain: post-header-form
Version: 1.1
*/

define( 'BN_VERSION', '1.0' );
define( 'BN_PLUGIN', __FILE__ );
define( 'BN_PLUGIN_BASENAME', plugin_basename( BN_PLUGIN ) );
define( 'BN_PLUGIN_NAME', trim( dirname( BN_PLUGIN_BASENAME ), '/' ) );
define( 'BN_PLUGIN_DIR', untrailingslashit( dirname( BN_PLUGIN ) ) );
// define( 'BN_PLUGIN_MODULES_DIR', BN_PLUGIN_DIR . '/modules' );


if ( ! defined( 'BN_VERIFY_NONCE' ) ) {
	define( 'BN_VERIFY_NONCE', false );
}

// Deprecated, not used in the plugin core. Use BN_plugin_url() instead.
define( 'BN_PLUGIN_URL',
	untrailingslashit( plugins_url( '', BN_PLUGIN ) ) );

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/*
 * Post meta fields registered
 */
require_once plugin_dir_path( __FILE__ ) . 'admin/class-meta-fields.php';

/*
 * Hook to register the Gutenberg Sidebar
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
?>