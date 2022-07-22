/**
 * BLOCK: themekit
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { TextControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/animate-number', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Animate Number' ), // Block title.
	icon: 'clock', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'animate' ),
		__( 'counter' ),
		__( 'number' ),
	],
	attributes: {
	    prefix: {
			type: 'string',
	    },
	    number: {
	        type: 'string',
	    },
	    suffix: {
			type: 'string',
		},
	},
	supports: {
		align:true
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: function( props ) {
		const { attributes: { prefix, number, suffix }, setAttributes, className} = props;
		// Creates a <p class='wp-block-cgb-block-themekit'></p>.
		return (
			<Fragment>
        		<InspectorControls>
					<PanelBody title="Animate Settings"></PanelBody>
					<TextControl
						label="Prefix"
						value={ prefix }
						onChange={ ( prefix ) => setAttributes( { prefix } ) }
						help = {__( 'Leave blank if no prefix.' )}
					/>
					<TextControl
						label="Animated Number"
						value={ number }
						onChange={ ( number ) => setAttributes( { number } ) }
						help = {__( 'Number to animate.' )}
					/>
					<TextControl
						label="Suffix"
						value={ suffix }
						onChange={ ( suffix ) => setAttributes( { suffix } ) }
						help = {__( 'Leave blank if no suffix.' )}
					/>
				</InspectorControls>
				<div className={ props.className }>
					<p>
				
					<span class="prefix">
						{ prefix }
					</span>
					<span class="number-animation">
						{ number }
					</span>
					<span class="suffix">
						{ suffix }
					</span>
					</p>
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const { attributes: { prefix, number, suffix }, className} = props;
		return (
			<div className={ props.className }>
				<p>
				<span class="prefix">{prefix}</span>
				<span class="number-animation">{number}</span>
				<span class="suffix">{suffix}</span>
				</p>
			</div>
		);
	},
} );
