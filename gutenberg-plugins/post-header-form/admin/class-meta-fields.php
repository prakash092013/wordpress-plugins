<?php 
/**
 * Collection of meta data to be used throughout the website
 */
class bn_meta_collection{
	

	/*
	 * IMPORTANT : DO NOT CHANGE THESE
	*/

	public $meta_fields = array(
		'is_active_campaign' => array(
			'title' => 'Make this post has Active Campaign Form',
			'type' => 'boolean',
		),
		'form_script' => array(
			'title' => 'Form Script',
			'type' => 'string',
		),
		'popup_button_title' => array(
			'title' => 'Button Title',
			'type' => 'string',
		),
		'header_background_color' => array(
			'title' => 'Header Background Color',
			'type' => 'string',
		)
	);
	
}
 ?>