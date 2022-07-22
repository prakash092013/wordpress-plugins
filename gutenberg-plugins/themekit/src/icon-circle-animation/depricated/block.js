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
const { InnerBlocks, InspectorControls, BlockIcon } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl, Placeholder } = wp.components;
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
registerBlockType( 'cgb/icon-animation', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon: Animation' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon' ),
		__( 'carousel' ),
		__( 'toggle' ),
		__( 'animation' ),
	],
	attributes: {
		
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
				

			},
			className,
			setAttributes,
			clientId,
		} = props;

		const TEMPLATE = [
			['cgb/icon-animation-inner', {}],
			
		];
		const ALLOWED_BLOCKS = [ 'cgb/icon-animation-inner' ];


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ `Icon Settings`}
						initialOpen={ false }
					>
						
					</PanelBody>
				</InspectorControls>

				
				<div className={`${className} wrapper`}>
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS}/>
				</div>
			</Fragment>
		);
		/*return (
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
		);*/
		/*return (
			<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="Icon Circle Tabs" className={`${className} wrapper`} isColumnLayout="true">
				<InnerBlocks template={ TEMPLATE } allowedBlocks="cgb/icon-carousel-template"/>
			</Placeholder>
		);*/
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
				
				

			},
			className,
		} = props;



		return (
			<div className={`${className} wrapper`}>
				<ul className="icon-circle-container"></ul>
				<InnerBlocks.Content/>
			</div>
		);

		/*return (
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
		);*/
		/*return (
			<div className={`${className} wrapper`}>
				<InnerBlocks.Content />
			</div>
		);*/
		
	},
} );

registerBlockType( 'cgb/icon-animation-inner', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon: Animation List Item' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent:['cgb/icon-animation'],
	keywords: [
		__( 'icon' ),
		__( 'carousel' ),
		__( 'toggle' ),
		__( 'animation' ),
	],
	attributes: {
		iconUnicode:{
			type: 'string',
			default: 'e04b',
		},
		textArea:{
			type: 'string',
		},
		uniqueLabel:{
			type: 'string',
			default: 'About'
		},
		uniqueLabel:{
			type: 'string',
			default: 'About'
		},
		uniqueLabelFormatted:{
			type: 'string',
			default: 'about'
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
				iconUnicode,
				textArea,
				uniqueLabel,
				uniqueLabelFormatted

			},
			className,
			setAttributes,
			clientId,
		} = props;

		const onTextControl = value => {
			var temp_id = value.replace(/\s/g, '-').toLowerCase();
			setAttributes( {
				uniqueLabel: value,
				uniqueLabelFormatted: temp_id
			} );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ `Icon Settings`}
						initialOpen={ false }
					>
						<TextControl
							label="Unique Label"
							value={ uniqueLabel }
							onChange={ onTextControl }
							help="Required.  This is used for AODA, ensure it is contextual."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode }
							onChange={ ( iconUnicode ) => setAttributes( { iconUnicode } ) }
							help="example: f1ab"
						/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea}
							onChange={ ( textArea ) => setAttributes( { textArea } ) }
							help="This is the text which appears in the center upon trigger."
						/>
						
					</PanelBody>
				</InspectorControls>
				
				<div className='item-wrapper'>
					<li>
						<a class="nav-link" id={`nav-${uniqueLabelFormatted}`} data-toggle="tab" href={`#content-${uniqueLabelFormatted}`} role="tab" aria-controls={`content-${uniqueLabelFormatted}`} aria-selected="false"><i className="fa fas"><span className="sr-only">{__('Icon Display')}</span>{ decodeEntities(`&#x${iconUnicode};`)}</i></a>
					</li>
					<p class="tab-pane fade" id={`content-${uniqueLabelFormatted}`}  role="tabpanel" aria-labelledby={`nav-${uniqueLabelFormatted}`}>{textArea}</p>
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
		const {
			attributes: {
				iconUnicode,
				textArea,
				uniqueLabelFormatted

			},
			className,
		} = props;



		return (
			<div className='item-wrapper'>
					<li>
						<a class="nav-link" id={`nav-${uniqueLabelFormatted}`} data-toggle="tab" href={`#content-${uniqueLabelFormatted}`} role="tab" aria-controls={`content-${uniqueLabelFormatted}`} aria-selected="false"><i className="fa fas"><span className="sr-only">{__('Icon Display')}</span>{ decodeEntities(`&#x${iconUnicode};`)}</i></a></li>
					<p class="tab-pane fade" id={`content-${uniqueLabelFormatted}`}  role="tabpanel" aria-labelledby={`nav-${uniqueLabelFormatted}`}>{textArea}</p>
				</div>
		);

		/*return (
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
		);*/
		/*return (
			<div className={`${className} wrapper`}>
				<InnerBlocks.Content />
			</div>
		);*/
		
	},
} );



