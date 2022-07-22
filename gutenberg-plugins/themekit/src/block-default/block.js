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
const { TextareaControl } = wp.components;
const { decodeEntities } = wp.htmlEntities;

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
registerBlockType( 'cgb/block-default', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Placeholder' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'place' ),
		__( 'holder' ),
		__( 'default' ),
	],
	attributes: {
		textArea: {
			type: 'string',
		},
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
	edit: ( props ) => {
		const {
			attributes: {
				textArea,
			},
			className,
			setAttributes,
		} = props;

		console.log( 'My message' )
		return (
			<div className={ `${className} alert alert-success` }>
				<h4 class="alert-heading"><i className="fa fas"><span className="sr-only">Under construction</span>{ decodeEntities(`&#xf85d;`)}</i>Constructing </h4>
				<p>
					<TextareaControl
						label="Notes"
						value={ textArea}
						onChange={ ( textArea ) => setAttributes( { textArea } ) }
					/>
				</p>
				<hr/>
				<p class="mb-0">Note: development in progress.</p>
			</div>
		);

		/**
		 * 
		 */
		/*
		<div class="alert alert-success" role="alert">
			<h4 class="alert-heading">Well done!</h4>
			<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
			<hr>
			<p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
			</div>
			*/
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
		const {
			attributes: {
				textArea,
			},
			className,
		} = props;
		return (
			<div className={ `${className} alert alert-success` }>
				<h4 class="alert-heading"><i className="fa fas"><span className="sr-only">Under construction</span>{ decodeEntities(`&#xf85d;`)}</i>Constructing </h4>
				<p>
					{textArea}
				</p>
				<hr/>
				<p class="mb-0">Note: development in progress.</p>
			</div>
		);
	},
} );
