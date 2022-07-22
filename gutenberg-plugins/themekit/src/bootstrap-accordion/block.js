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
registerBlockType( 'cgb/accordion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion' ), // Block title.
	icon: 'list-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'accordion' ),
		__( 'collapse' ),
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
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Collapsible Heading', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
								{ /* eslint-disable-next-line jsx-a11y/label-has-for */ }
								<label className="components-base-control__label">
									{ __( 'Open first collapsible by default', 'blockkit' ) }
								</label>
								<ToggleControl
									label={ __( 'First Collapsible Item' ) }
									help={ toggleCollapse ? __( 'Open by default.', 'blockkit' ) : __( 'All closed by default.', 'blockkit' ) }
									checked={ toggleCollapse }
									onChange={ onToggleSelectCollapse }
								/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ containerClassName } id={ accordionId }>
					<InnerBlocks allowedBlocks={ [ 'cgb/accordion-collapse' ]} />
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
				containerClassName,
				accordionId
			},
			className,
		} = props;

		return (
			<div className={ containerClassName } id={ accordionId }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
registerBlockType( 'cgb/accordion-collapse', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Collapse' ), // Block title.
	icon: 'list-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: [ 'cgb/accordion' ],
	keywords: [
		__( 'accordion' ),
		__( 'collapse' ),
		__( 'toggle' ),
	],
	attributes: {
		containerClassName :{
			type:'string',
			default: 'card'
		},
		childClientId:{
        	type: 'string',
		},
		parentClientId:{
			type: 'string',
			default: 'testing',
        },
		panelOpen: {
            type:'boolean',
            default: true,
		},
		panelHeading: {
			type: 'string',
		},
		headerId: {
			type: 'string',
			default: 'heading_'
		},
		collapseId:{
			type: 'string',
			default: 'collapse_'
		},
		targetCollapseId:{
			type: 'string',
			default: '#collapse_'
		},
		targetAccordionId:{
			type: 'string',
			default: '#accordion_'
		},
		buttonClass:{
			type: 'string',
			default: 'btn btn-link collapsed'
		},
		divClass:{
			type: 'string',
			default: 'collapse'
		},
		togglePadding: {
			type: 'boolean',
			default: true,
		},
		cardBodyClass:{
			type: 'string',
			default: 'card-body card-body-padding'
		},
		iconPrefix:{
			type: 'string',
		},
		toggleTextTransform:{
			type: 'string',
			default: true,
		}

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
				panelOpen,
				panelHeading,
				headerId,
				collapseId,
				targetCollapseId,
				parentClientId,
				targetAccordionId,
				togglePadding,
				cardBodyClass,
				iconPrefix,
				toggleTextTransform
			},
			className,
			setAttributes,
			clientId,
		} = props;

		setAttributes( {
			childClientId: clientId,
			headerId: 'heading_' + clientId,
			collapseId: 'collapse_' + clientId,
			targetCollapseId: '#collapse_' + clientId,
			containerClassName: 'card ' + className,
			/*
			depricated, setting parent block clientId below, dj.
			parentClientId: wp.data.select( 'core/editor' ).getBlockHierarchyRootClientId( clientId ),
			targetAccordionId: '#accordion_' + parentClientId,
			*/
		} );

		// set the toggle value.
		const onToggleSelectPadding = checked => {
			setAttributes( {
				togglePadding: checked,
			} );
			if ( checked === true ) {
				setAttributes( {
					cardBodyClass: 'card-body card-body-padding',
				} );
			} else {
				setAttributes( {
					cardBodyClass: 'card-body',
				} );
			}
		};

		const MyToggleControlTextTransform = withState( {
			toggleOption: toggleTextTransform,
		} )( ( { toggleOption, setState } ) => {

			setAttributes( {
				toggleTextTransform: toggleOption,
			} );

			if (toggleTextTransform == true){
				setAttributes( {
					buttonClass: 'btn btn-link collapsed text-uppercase',
				} );
			} else{
				setAttributes( {
					buttonClass: 'btn btn-link collapsed',
				} );
			}

			return(
				<ToggleControl
					label="Heading Text Transform"
					help={ toggleOption ? 'Uppercase.' : 'Default.' }
					checked={ toggleOption }
					onChange={ () => setState( ( state ) => ( { toggleOption: ! state.toggleOption } ) ) }
				/>
			)
		} );

		/**
		 * new!  get the accordion parent id
		 **/
		const parentBlocks = wp.data.select( 'core/block-editor' ).getBlockParents(props.clientId);
		const parentAttributes = wp.data.select('core/block-editor').getBlocksByClientId(parentBlocks);
		/* loop through all parents, the last will always be the accordion parent block */
		var test_clientId = '';
		for (var i = 0; i < parentAttributes.length; i++) {
			test_clientId = parentAttributes[i].clientId;
		}
		/* set the parent clientId */
		setAttributes( {
			parentClientId: test_clientId,
			targetAccordionId: '#accordion_' + parentClientId,
		} );

		
		//const panelTitle = '<i class="fa">{decodeEntities(`&#x${iconPrefix};`)}</i>';
		// { <i class="fa"> { decodeEntities(`&#x${iconPrefix};`)} </i> };
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Collapsible Options', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
								{ /* eslint-disable-next-line jsx-a11y/label-has-for */ }
								<label className="components-base-control__label">
									{ __( 'Heading', 'blockkit' ) }
								</label>
								<TextControl
									label="Icon Prefix Unicode"
									value={ iconPrefix }
									onChange={ ( iconPrefix ) => setAttributes( { iconPrefix } ) }
								/>
								<TextControl
									label="Edit Heading"
									value={ panelHeading }
									onChange={ ( panelHeading ) => setAttributes( { panelHeading } ) }
								/>
								{ /* eslint-disable-next-line jsx-a11y/label-has-for */ }
								<label className="components-base-control__label">
									{ __( 'Heading Text Transform', 'blockkit' ) }
								</label>
								<MyToggleControlTextTransform/>
								{ /* eslint-disable-next-line jsx-a11y/label-has-for */ }
								<label className="components-base-control__label">
									{ __( 'Padding', 'blockkit' ) }
								</label>
								<ToggleControl
									label={ __( 'Padding Collapsible Body' ) }
									help={ togglePadding ? __( 'Default padding.', 'blockkit' ) : __( 'No padding.', 'blockkit' ) }
									checked={ togglePadding }
									onChange={ onToggleSelectPadding }
								/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ props.className }>
					
					<PanelBody
						title={ panelHeading }
						initialOpen={ panelOpen }
						onToggle={ ( val ) => setAttributes( { panelOpen: false } ) }
					>
						<TextControl
							label="Icon Prefix"
							value={ iconPrefix }
							onChange={ ( iconPrefix ) => setAttributes( { iconPrefix } ) }
						/>
						<TextControl
							label="Edit Heading"
							value={ panelHeading }
							onChange={ ( panelHeading ) => setAttributes( { panelHeading } ) }
						/>
						<InnerBlocks />
					</PanelBody>

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
				containerClassName,
				headerId,
				targetCollapseId,
				collapseId,
				panelHeading,
				targetAccordionId,
				buttonClass,
				divClass,
				cardBodyClass,
				iconPrefix,
			},
			className,
			setAttributes,
			clientId,
		} = props;
		if (iconPrefix) {
			return (
				<div className={ containerClassName }>
					<header class="card-header" id={ headerId }>
						<h3 class="mb-0">
							<button class={ buttonClass } type="button" data-toggle="collapse" data-target={ targetCollapseId } aria-expanded="true" aria-controls={ collapseId }>
								<i class="fa">{`&#x${iconPrefix};`}</i> { panelHeading }
							</button>
						</h3>
					</header>
					<div id={ collapseId } class={ divClass } aria-labelledby={ headerId } data-parent={ targetAccordionId }>
						<div class={ cardBodyClass }>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className={ containerClassName }>
					<header class="card-header" id={ headerId }>
						<h3 class="mb-0">
							<button class={ buttonClass } type="button" data-toggle="collapse" data-target={ targetCollapseId } aria-expanded="true" aria-controls={ collapseId }>
								{ panelHeading }
							</button>
						</h3>
					</header>
					<div id={ collapseId } class={ divClass } aria-labelledby={ headerId } data-parent={ targetAccordionId }>
						<div class={ cardBodyClass }>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);

		}
	},
} );
