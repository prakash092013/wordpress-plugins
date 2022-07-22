/* eslint-disable */
( function( $ ) {
	$( document ).ready( function() {
		  /**
		   * select menu - need to move script into component, dj 
		   */

		  $('.select-options .wp-block-cgb-pricing-currency-content:not(:first-of-type)').hide();

		  $(".custom-select").change(function() {
			  //var value = $("#inputGroupSelect02 option:selected").val();
			  var value = $(this).find('option:selected').val();
			  //var theDiv = $(".is" + value);
			  var theDiv = $(this).parent().next('.select-options').find( $(".is" + value) );
	  
			  theDiv.show();
			  theDiv.siblings('.wp-block-cgb-pricing-currency-content').hide();
		  });
	} );
}( jQuery ) );
