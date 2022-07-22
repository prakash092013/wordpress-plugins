/* eslint-disable */
( function( $ ) {
	$( document ).ready( function() {
		/*$('.wp-block-cgb-tab .nav-item').appendTo('.wp-block-cgb-tabs .nav-tabs');
		$('.wp-block-cgb-tabs .nav-tabs .nav-item:first-of-type').attr('aria-selected', 'true').addClass('active');*/
		
		$( ".wp-block-cgb-tabs" ).each(function() {
			$( this ).find( ".tab-content > .wp-block-cgb-tab > .nav-item" ).appendTo( $( this ).find(".nav-tabs"));
			$( this ).find(' .nav-tabs .nav-item:first-of-type').attr('aria-selected', 'true').addClass('active');
		});
	} );
}( jQuery ) );
