<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( !class_exists( 'ThemeSupport' ) ) {
    class ThemeSupport{

        public function __construct(){

			// Hook: Block assets.
			add_action( 'init', array( $this, 'themekit_cgb_block_assets' ));

		}

		/**
		 * Enqueue Gutenberg block assets for both frontend + backend.
		 *
		 * Assets enqueued:
		 * 1. blocks.style.build.css - Frontend + Backend.
		 * 2. blocks.build.js - Backend.
		 * 3. blocks.editor.build.css - Backend.
		 *
		 * @uses {wp-blocks} for block type registration & related functions.
		 * @uses {wp-element} for WP Element abstraction — structure of blocks.
		 * @uses {wp-i18n} to internationalize the block's text.
		 * @uses {wp-editor} for WP editor styles.
		 * @since 1.0.0
		 */
		function themekit_cgb_block_assets() { // phpcs:ignore
			// Register block styles for both frontend + backend.
			wp_register_style(
				'themekit-cgb-style-css', // Handle.
				plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
				is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
				filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
			);

			// Register block editor script for backend.
			wp_register_script(
				'themekit-cgb-block-js', // Handle.
				plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
				array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-html-entities'), // Dependencies, defined above.
				filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
				true // Enqueue the script in the footer.
			);

			// Register block editor styles for backend.
			wp_register_style(
				'themekit-cgb-block-editor-css', // Handle.
				plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
				array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
				filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
			);

			// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
			wp_localize_script(
				'themekit-cgb-block-js',
				'cgbGlobal', // Array containing dynamic data for a JS Global.
				[
					'pluginDirPath' => plugin_dir_path( __DIR__ ),
					'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
					// Add more data here that you want to access from `cgbGlobal` object.
				]
			);

			/**
			 * Register Gutenberg block on server-side.
			 *
			 * Register the block on server-side to ensure that the block
			 * scripts and styles for both frontend and backend are
			 * enqueued when the editor loads.
			 *
			 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
			 * @since 1.16.0
			 */
			register_block_type(
				'cgb/block-themekit', array(
					// Enqueue blocks.style.build.css on both frontend & backend.
					'style'         => 'themekit-cgb-style-css',
					// Enqueue blocks.build.js in the editor only.
					'editor_script' => 'themekit-cgb-block-js',
					// Enqueue blocks.editor.build.css in the editor only.
					'editor_style'  => 'themekit-cgb-block-editor-css',
				)
			);
		}

	} //end class
	new ThemeSupport();
}// end if

/* ----------------------------------------------------------
 * ADD php output dependencies
 *-----------------------------------------------------------*/
include 'testimonials/index.php';
include 'bootstrap-carousel/index.php';
include 'bootstrap-tabs/index.php';
include 'block-patterns/index.php';
include 'team-component/index.php';

//include 'bootstrap-modal/index.php'; // causes error

include 'posttype-addon/index.php';
include 'posttype-ccms-roles/index.php';
include 'ccms-menu/index.php';

include 'posttype-case-studies/index.php';
include 'posttype-events/index.php';
include 'posttype-events/taxonomy-custom-image-field.php';
include 'posttype-ccms-versions/index.php';

include 'block-pricing-packs/index.php';

include 'icon-circle-animation/index.php';

include 'block-styles/gallerycarousel.php';