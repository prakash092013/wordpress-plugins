
<?php
/* modal fix for gravity forms:
 * keep modal open upon submit
-------------------------------------------------------------*/

register_block_type(
	'cgb/bootstrap-modal',
	array(
        'attributes'      => array(
			'modalId'       => array(
				'type' => 'string',
				'default' => 'modal-example',
			),
		),
		'render_callback' => 'dj_render_block_modal',
	)
);
function dj_render_block_modal( $attributes, $content ) {

    $output = '';
    $modal_id = 'modal-example';
	if ( isset( $attributes['modalId'] ) ) {
		$modal_id = $attributes['modalId'];
	}
	/**
	 * ERRORS:  this $_POST conflicts with WPML,
	 * 
	 */
    if (isset($_POST['gform_submit']) ){
        
        $output .= '<script>';
        $output .= 'jQuery(document).ready(function($){
            $("#'.$modal_id.'").modal("show");
        });'; 
        $output .= '</script>';
    }
    

    return $output.$content;
}
?>