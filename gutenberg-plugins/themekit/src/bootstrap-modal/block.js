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

const { InnerBlocks, BlockIcon, InspectorControls } = wp.blockEditor;
const { PanelBody, Placeholder, TextControl } = wp.components;
const { select, dispatch } = wp.data;

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
registerBlockType( 'cgb/bootstrap-modal', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Modal' ), // Block title.
	icon: 'welcome-comments', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'modal' ),
		__( 'pop' ),
	],
	attributes: {
	    panelHeading: {
			type: 'string',
		},
		panelOpen: {
            type:'boolean',
            default: true,
		},
		modalTitle: {
			type: 'string',
			default: 'Modal Example',
		},
		modalId: {
			type: 'string',
			default: 'modal-example',
		},
	},
	styles: [
		{
			name: 'default',
			label: __( 'Default', "cgb" ),
			isDefault: true
		},
		{
			name: 'modal-sm',
			label: __( 'Small Modal', "cgb" )
		},
		{
			name: 'modal-lg',
			label: __( 'Large Modal', "cgb" )
		},
		{
			name: 'modal-xl',
			label: __( 'Extra Large Modal', "cgb" )
		}
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
		const {
			attributes: {
				panelOpen,
				panelHeading,
				modalTitle,
				modalId,
			},
			className,
			setAttributes,
		} = props;

		
		// set the text value.
		const onTextControl = value => {
			var temp_id = value.replace(/\s/g, '-').toLowerCase();
			setAttributes( {
				modalTitle: value,
				modalId: 'modal-'+temp_id,
			} );
		};

		return (
			<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label={`Modal: ${modalTitle}`} className={className} isColumnLayout="true">
					
					
					<TextControl
						label="Modal Title"
						value={ modalTitle }
						onChange={ onTextControl }
					/>
					
					<p> <b>{__('To trigger this modal, add the following to the anchor link', 'cgb')}</b><br/>
						{__('Link class:  modal-trigger', 'cgb')}<br/>
						{__('Link href: #'+modalId, 'cgb')}</p>

					<p> <b>{__('Modal Content:', 'cgb')}</b></p>
						<InnerBlocks />

			</Placeholder>
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
		const {
			attributes: {
				panelOpen,
				panelHeading,
				modalTitle,
				modalId
			},
			className,
		} = props;
		
		return (
			<div className={`modal fade ${className}`} id={modalId} tabindex="-1" role="dialog" aria-labelledby={`${modalId}-Heading`} aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id={`${modalId}-Heading`}>{modalTitle}</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);

	},
} );
