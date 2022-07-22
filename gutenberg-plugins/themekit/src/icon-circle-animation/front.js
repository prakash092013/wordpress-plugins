/* eslint-disable */
( function( $ ) {
	$( document ).ready( function() {
		$('.circle-container > li > a').hover(function() {
			//$(this).trigger('click');
			//$(this).tab('show');
			//$(this).parent().siblings().children().removeClass('active');
			$(this).closest('.wp-block-cgb-icon-carousel').find('.circle-container li a').removeClass('active');
			$(this).closest('.wp-block-cgb-icon-carousel').find('p').removeClass('active').removeClass('show');
			$(this).trigger('click');
		});
	} );
}( jQuery ) );
