/**
 * BLOCK: accordion
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { ToggleControl, PanelBody, TextControl } = wp.components;
const { withState } = wp.compose;
const { Fragment } = wp.element;
const { select, dispatch } = wp.data;
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
registerBlockType( 'cgb/icon-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon Carousel' ), // Block title.
	icon: 'list-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon' ),
		__( 'carousel' ),
		__( 'toggle' ),
	],
	attributes: {
	    accordionId: {
			type: 'string',
			default: 'accordion'
		},
		accordionClass:{
			type: 'string',
			default: 'accordion',
		},
		containerClassName:{
			type: 'string',
			default: '',
		},
		toggleCollapse: {
			type: 'boolean',
			default: false,
		},
		buttonClass:{
			type: 'string',
			default: '',
		},
		divClass:{
			type: 'string',
			default: '',
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
				accordionId,
				accordionClass,
				containerClassName,
				toggleCollapse,
				buttonClass,
				divClass,
			},
			className,
			setAttributes,
			clientId,
		} = props;

		setAttributes( {
			accordionId: 'accordion_' + clientId,
			containerClassName: className + ' ' + accordionClass,
		} );

		// set the toggle value.
		const onToggleSelectCollapse = checked => {
			setAttributes( {
				toggleCollapse: checked,
			} );
			/* the parent block client id
			* https://wordpress.org/gutenberg/handbook/designers-developers/developers/data/data-core-editor/#selectors
			* https://wordpress.org/gutenberg/handbook/designers-developers/developers/data/data-core-block-editor/
			* https://github.com/WordPress/gutenberg/issues/9032
			*   var rootClientId = dispatch('core/editor').getBlockRootClientId(clientId); // DID NOT WORK WITH DISPATCH
			-------------------------------------------------------------*/
			var parentBlock = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];
			var childBlocks = parentBlock.innerBlocks;
			var getChildClientID = childBlocks[0].attributes.childClientId;
			if (checked === true){
            	// change classes of only the first innerblock
				dispatch('core/block-editor').updateBlockAttributes(getChildClientID, { buttonClass: 'btn btn-link', divClass: 'collapse show' } );
            } else {
            	// change classes of only the first innerblock
				dispatch('core/block-editor').updateBlockAttributes(getChildClientID, { buttonClass: 'btn btn-link collapsed', divClass: 'collapse' } );
            }
		};

		return (
			<div className={`${props.className} wrapper`}>
				<ul className="circle-container">
					<li><a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><i className="fa fas fa-language"><span className="sr-only"></span></i></li>
				</ul>
				<p class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">testing paragraph content 1</p>
				<p class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">testing paragraph content 2</p>
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
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const {
			attributes: {
				containerClassName,
				accordionId
			},
			className,
		} = props;

		return (
			<div className="wrapper">
				<ul className="circle-container">
					<li><a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><i className="fa fas fa-language"><span className="sr-only"></span></i></li>
				</ul>
				<p class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">testing paragraph content 1</p>
				<p class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">testing paragraph content 2</p>
			</div>
		);
	},
} );
