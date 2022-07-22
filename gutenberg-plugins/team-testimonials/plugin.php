<?php
/**
* Plugin Name: WPC Theme Kit
* Plugin URI: https://wordpresscapital.com/
* Description: Theme support and gutenberg blocks customized for this website.
* Author: Prakash Rao, WordPress Capital
* Author URI: https://wordpresscapital.com/
* Version: 1.0.0
* License: GPL2+
* License URI: https://www.gnu.org/licenses/gpl-2.0.txt
*
* @package cgb
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
