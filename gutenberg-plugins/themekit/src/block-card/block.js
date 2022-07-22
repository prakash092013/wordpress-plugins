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
const { InnerBlocks } = wp.blockEditor;

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
registerBlockType( 'cgb/card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'feature' ),
		__( 'hover' ),
	],
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
		// Lift info from props and populate various constants.
		const {
			attributes: {
				
			},
			className,
			setAttributes,
		} = props;
		/**
		 * 
		 */
		const TEMPLATE = [
			['cgb/card-body', {}],
			['cgb/card-footer', {}],
		];
		return (
			<div className={ `${className} card wp-block-group is-style-p-0 has-theme-white-background-color has-background` }>
				<InnerBlocks template={TEMPLATE} />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {
		const {
			attributes: {
			},
			className,
		} = props;
		
		return (
			<div className={ `${className} card wp-block-group is-style-p-0 has-theme-white-background-color has-background` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'cgb/card-body', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Inner Card Body' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'feature' ),
		__( 'hover' ),
	],
	parent: ['cgb/card'],
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
		// Lift info from props and populate various constants.
		const {
			attributes: {
				
			},
			className,
			setAttributes,
		} = props;
		/**
		 * 
		 */
		const TEMPLATE = [
			['core/image', {className: 'card-image wp-block-image', align:'center' }],
			['core/heading', {className: 'card-title', placeholder:'Card Title', level: 2, align:'center', fontSize:'body-larger', textColor:'theme-dark'}],
			['core/paragraph', {className: 'card-text', placeholder:'Card Text', align:'center' }],     
		];
		return (
			<div className={ `${className} card-body` }>
				<InnerBlocks template={TEMPLATE} />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {
		const {
			attributes: {
			},
			className,
		} = props;
		
		return (
			<div className={ `${className} card-body` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
registerBlockType( 'cgb/card-footer', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card Footer' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'feature' ),
		__( 'hover' ),
	],
	parent: ['cgb/card'],
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
		// Lift info from props and populate various constants.
		const {
			attributes: {
				
			},
			className,
			setAttributes,
		} = props;
		/**
		 * 
		 */
		const TEMPLATE = [
			[ 'core/buttons', {className: 'card-footer'}, [
				[ 'core/button', {className: '', placeholder:'Button Text', align:'center', textColor:'theme-white', backgroundColor:'theme-secondary', borderRadius:0} ],
			] ],      
		];
		return (
			<InnerBlocks template={TEMPLATE} templateLock="all"/>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {
		const {
			attributes: {
			},
			className,
		} = props;
		
		return (
			<InnerBlocks.Content />
		);
	},
} );


