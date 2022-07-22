<?php
defined( 'ABSPATH' ) || exit;

add_action( 'init', 'register_ditaroles_menu' );
function register_ditaroles_menu (){
        register_nav_menus( array(
            'ditaroles_menu' => 'CCMS Roles Navigation Menu',
        ) );
}

register_block_type(
	'cgb/ditaroles-menu',
	array(
		'attributes'      => array(
			'className'       => array(
				'type' => 'string',
				'default' => 'wp-block-cgb-ditaroles-menu',
			),
			'align'       => array(
				'type' => 'string',
			),

		),
		'render_callback' => 'dj_render_block_ditaroles_menu',
	)
);

function dj_render_block_ditaroles_menu( $attributes, $content ) {

	$className = 'wp-block-cgb-ditaroles-menu mb-3 icon-menu';
	if ( isset( $attributes['className'] ) ) {
		$className .= ' ' . $attributes['className'];
	}

	$align = '';
	if ( isset( $attributes['align'] ) ) {
		$className .= ' align' . $attributes['align'];
	}

	$locations = get_registered_nav_menus();
	$menus = wp_get_nav_menus();
	$menu_locations = get_nav_menu_locations();
	$menu_items = '';

	$location_id = 'ditaroles_menu';
	if (isset($menu_locations[ $location_id ])) {
	foreach ($menus as $menu) {
	  if ($menu->term_id == $menu_locations[ $location_id ]) {
	    $menu_items = $menu->name;
	    break;
	  }//endif
	}//endfor
	}//endif
	// echo '<h4>'.$menu_items.'</h4>';

	$navMenu = wp_nav_menu( array(
	    'theme_location'  	=> $location_id,
	    'menu_class'    	=> 'nav nav-fill ditaroles-menu',
	    'container'			=> false,
	    'fallback_cb'   	=> '__return_false',
	    'items_wrap'   		=> '<ul id="%1$s" class="%2$s">%3$s</ul>',
	    'depth'       		=> 2,
	    'walker'      		=> new WP_Bootstrap_Navwalker(),
	    'echo'				=> false
	) );

    return '<nav role="navigation" class="'.$className.'"><h2 class="sr-only">'.$menu_items.'</h4>'. $navMenu .'</nav>';
}

?>