/* eslint-disable */
( function( $ ) {
	$( document ).ready( function() {
		$('.wp-block-cgb-tab .nav-item').appendTo('.wp-block-cgb-tabs .nav-tabs');
		$('.wp-block-cgb-tabs .nav-tabs .nav-item:first-of-type').attr('aria-selected', 'true').addClass('active');

	} );
}( jQuery ) );
