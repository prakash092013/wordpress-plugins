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
const { PanelBody, ColorPalette, } = wp.components;
const { InnerBlocks, InspectorControls, getColorClassName, getColorObjectByColorValue, } = wp.blockEditor;
const { withState } = wp.compose;
const { withSelect, select } = wp.data;
const { Fragment } = wp.element;

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
registerBlockType( 'cgb/icon-heading', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon: Heading' ), // Block title.
	icon: 'heading', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'text', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon' ),
		__( 'heading' ),
	],
	supports: {
		align:true
	},
	attributes: {
		align: {
			type: 'string',
		},
		headingColor: {
			type: 'string',
			default: '#818181',
		},
		headingColorClass: {
			type: 'string',
			default: 'has-theme-primary-color',
		},
	},
	styles: [
		{
			name: 'default',
			label: __( 'Default', "cgb" ),
			isDefault: true
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
				align,
				headingColor,
				headingColorClass,
			},
			className,
			setAttributes,
		} = props;
		/**
		 * 
		 */
		const TEMPLATE = [
			['cgb/icon-button', {className: 'is-style-icon-no-fill', iconSize:'is-style-icon-lg'}],
			['core/heading', {level: 2, fontSize:'body-larger'}],
		];

		const MyColorPalette = withState( {
			color: headingColor,
		} )( ( { color, setState } ) => {
			
			// use theme color palette
			const colors = select( 'core/editor' ).getEditorSettings().colors;
			const settings = select( 'core/editor' ).getEditorSettings().colors;
			const colorObject = getColorObjectByColorValue( settings, color );

			if ( colorObject !== undefined ) {
				setAttributes( {
					headingColorClass: getColorClassName( 'color', colorObject.slug ),
				} );
			}

			setAttributes( {
				headingColor: color,
			} );
		 
			return (
				<ColorPalette
					colors={ colors }
					value={ color }
					onChange={ ( color ) => setState( { color } ) }
				/>
			)
		} );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon Options', 'themekit' ) }
						initialOpen={ true }
					>
						<MyColorPalette/>
					</PanelBody>
				</InspectorControls>
				<div className={ `${className} ${headingColorClass}` }>
					<InnerBlocks template={TEMPLATE} templateLock="all"/>
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
	 */
	save: ( props ) => {
		const {
			attributes: {
				align,
				headingColor,
				headingColorClass,
			},
			className,
		} = props;
		
		return (
			<div className={ `${className} ${headingColorClass}` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
