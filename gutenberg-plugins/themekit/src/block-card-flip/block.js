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
const { PanelBody } = wp.components;

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
registerBlockType( 'cgb/inner-card-flip', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'feature' ),
		__( 'hover' ),
		__( 'flip' ),
	],
	parent: [ 'cgb/card-flip' ],
	
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
			['core/image', {className: 'card-image', align:'center' }],    
		];
		return (
				
			<div className={ className }>
				<InnerBlocks template={TEMPLATE} templateLock="all"/>
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
			<div className={ className }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
registerBlockType( 'cgb/inner-card-hover-flip', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'feature' ),
		__( 'hover' ),
	],
	parent: [ 'cgb/card-flip' ],
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
			['core/heading', {className: 'card-title-hover', placeholder:'Card Title', level: 3, align:'center'}],
			['core/paragraph', {className: 'card-text-hover', placeholder:'Card Text', align:'center' }],       
		];
		return (
			<PanelBody
				title={__( 'Hover State', 'blockkit' )}
				icon="id"
				initialOpen={ false }
			>
				<div className="components-base-control">
					<div className="components-base-control__field">
						<label className="components-base-control__label">
							{ __( 'Hover State', 'blockkit' ) }
						</label>
						<div className={ className }>
							<InnerBlocks template={TEMPLATE} templateLock="all"/>
						</div>
					</div>
				</div>
			</PanelBody>
				
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
			<div className={ className }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );


registerBlockType( 'cgb/card-flip', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card - with Flip' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'feature' ),
		__( 'hover' ),
		__( 'flip' ),
	],
	supports: {
		align:true
	},
	styles: [
		{
			name: 'default-border',
			label: __( 'Default Border', "cgb" ),
			isDefault: true
		},
		{
			name: 'highlighted-border',
			label: __( 'Highlighted Border', "cgb" )
		},
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
			['cgb/inner-card-flip', {className: 'card-body' }],   
			['cgb/inner-card-hover-flip', {className: 'card-body card-body-hover' }],   
		];
		return (
				<div className={ `${className} card`}>
					<InnerBlocks template={TEMPLATE} templateLock="all"/>
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
			<div className={ `${className} card`}>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
