<?php
/**
* Plugin Name: Ixiasoft Theme Kit
* Plugin URI: https://paintedrobot.com/
* Description: Theme support and gutenberg blocks customized for this website.
* Author: Diette Janssen, Prakash Rao, PaintedRobot
* Author URI: https://paintedrobot.com/
* Version: 3.0.0
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
