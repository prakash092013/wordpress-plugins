/**
 * BLOCK: dj-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const { SelectControl, Toolbar, ToolbarButton, PanelBody, TextControl, ToggleControl, Placeholder, ColorPalette, Flex, FlexItem, FlexBlock } = wp.components;
const { InnerBlocks, BlockControls, InspectorControls, BlockIcon,getColorClassName, getColorObjectByColorValue, } = wp.blockEditor;
const { Fragment } = wp.element;
const { select, dispatch, withSelect } = wp.data; // Import registerBlockType() from wp.blocks
const { withState } = wp.compose; 
const { decodeEntities } = wp.htmlEntities;

const ALLOWED_BLOCKS = [ 'cgb/tab' ];
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
registerBlockType( 'cgb/tabs', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tabs' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'tab' ),
	],
	supports: {
		align:true,
	},
	attributes: { 
		tabContentId:{
        	type: 'string',
        },
        tabContentClass:{
        	type: 'string',
        	default: 'tab-content',
        },
        tabLinks:{
        	type: 'string',
		},
		toggleNavAlign:{
			type: 'boolean',
			default: false,
		},
		navAlign: {
			type: 'string',
			default: 'justify-content-center',
		},
		
	},
	styles: [
		{
			name: 'default-navigation',
			label: __( 'Default', "cgb" ),
			isDefault: true
		},
		{
			name: 'icon-navigation',
			label: __( 'Icon Style', "cgb" )
		},
	],

	edit: function( props ) {
		const { attributes: { tabContentId, tabLinks, toggleNavAlign, navAlign, iconContentClass }, setAttributes, focus, className, clientId } = props;

		const onAddRow = () => {
          const block = createBlock('cgb/tab');
          dispatch('core/editor').insertBlock(block, undefined, clientId)

           

        }
        // Add block if no blocks already exist.
	    if (! select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.length) {
	      onAddRow();
	    }

	   	/* the parent block client id
         * https://wordpress.org/gutenberg/handbook/designers-developers/developers/data/data-core-editor/#selectors
         * https://wordpress.org/gutenberg/handbook/designers-developers/developers/data/data-core-block-editor/
         * https://github.com/WordPress/gutenberg/issues/9032
         *   var rootClientId = dispatch('core/editor').getBlockRootClientId(clientId); // DID NOT WORK WITH DISPATCH
		-------------------------------------------------------------*/
    	var parentBlock = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ];
        var childBlocks = parentBlock.innerBlocks;
        var getChildClientID = childBlocks[0].attributes.childClientId;

        // change classes of only the first innerblock
        dispatch('core/editor').updateBlockAttributes(getChildClientID, { tabPaneClass: 'tab-pane fade show active' } );

        // for each innerblock create the tabLink
        var tabLinksDisplay = '';
        if (childBlocks.length > 0) {
            for (let i = 0; i < childBlocks.length; i++) {     
                //getChildClientID = childBlocks[i].attributes.childClientId;
                //dispatch('core/editor').updateBlockAttributes(getChildClientID, { tabLink: value } );
                tabLinksDisplay = tabLinksDisplay + '<a class="nav-item tab-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>';
            }
        }

        setAttributes({
		    tabContentId: 'nav-tabContent-' + clientId,
		    tabLinks: '<a href"#"> HTML </a>', // note: this outputs as text, not html
		})


		const MyToggleControlNavAlignment = withState( {
			toggleOption: toggleNavAlign,
		} )( ( { toggleOption, setState } ) => {

			setAttributes( {
				toggleNavAlign: toggleOption,
			} );

			// this if statement, needs to be here otherwise setAttributes will time out (ex: opening in backend modal), double check, dj.
			if (toggleNavAlign == true){
				setAttributes( {
					navAlign: 'nav-justified',
				} );
			} else{
				setAttributes( {
					navAlign: 'justify-content-center',
				} );
			}
			return(
				<ToggleControl
					label="Align Navigation Controls"
					help={ toggleOption ? 'Justify Fill.' : 'Justify Center.' }
					checked={ toggleOption }
					onChange={ () => setState( ( state ) => ( { toggleOption: ! state.toggleOption } ) ) }
				/>
			)
		} );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Tabs Settings', 'blockkit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
								<MyToggleControlNavAlignment/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="Tabs" className={className} isColumnLayout="true">
					
					<InnerBlocks allowedBlocks={ [ 'cgb/tab' ]} />
					
				</Placeholder>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes: { tabContentId, tabContentClass, tabLinks, navAlign }, className } = props;
		
		return (
			<div>
				<nav className={`nav nav-tabs flex-column flex-sm-row ${ navAlign }`} role="tablist"></nav>
				<div className={ tabContentClass } id={tabContentId}><InnerBlocks.Content/></div>
			</div>
		);
	},

} );

registerBlockType( 'cgb/tab', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: [ 'cgb/tabs' ],
	keywords: [	],
	attributes: { 
		panelOpen: {
            type:'boolean',
            default: true,
        },
        tabTitle: {
	        type: 'string',
	        default: 'New Tab Created',
	    },
	    tabSymbol: {
	        type: 'string',
	        default: 'none',
	    },
	    fontAwesomeClass: {
	        type: 'string',
	    },
	    tabPaneClass: {
	        type: 'string',
	        default: 'tab-pane fade',
	    },
	    childClientId:{
        	type: 'string',
        },
        tabPaneId:{
        	type: 'string',
        },
        tabPaneAria:{
        	type: 'string',
        },
        tabLinkId:{
        	type: 'string',
        },
        tabLinkHref:{
        	type: 'string',
        },
        tabLinkAria:{
        	type: 'string',
		},
		iconPrefix:{
			type: 'string',
			default:'e04b'
		},
		iconContentClass: {
			type: 'string',
			default: 'fas',
		},
		tabColor: {
			type: 'string',
			default: ' #717171',
		},
		tabColorClass: {
			type: 'string',
			default: '',
		},
		tabBackgroundColor: {
			type: 'string',
			default: '#ffffff',
		},
		tabBackgroundColorClass: {
			type: 'string',
			default: '',
		},
		
	},
	supports: {
		align:true,
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const { attributes: { panelOpen, tabTitle, tabSymbol, fontAwesomeClass, tabPaneClass, childClientId, tabPaneId, tabPaneAria, tabLinkId, tabLinkHref, tabLinkAria, iconPrefix, iconContentClass, tabColor, tabColorClass, tabBackgroundColor, tabBackgroundColorClass}, setAttributes, focus, className, clientId } = props;
        
        const onDeleteSelf = () => {
          dispatch('core/editor').removeBlock(clientId, false);
        }

        const MySelectControlIconFAClass = withState( {
			contentClass: iconContentClass,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconContentClass: contentClass,
			} );
			return(
				<SelectControl
					label="Icon Unicode Style Class: "
					value={ contentClass }
					options={ [
						{ label: 'fas: Solid', value: 'fas' },
						{ label: 'far: Regular', value: 'far' },
						{ label: 'fal: Light', value: 'fal' },
						{ label: 'fad: Duotone', value: 'fad' },
						{ label: 'fab: Brands', value: 'fab' },
					] }
					onChange={ ( contentClass ) => { setState( { contentClass } ) } }
				/>
			)
		} );

        /*
         * TODO: change to tabpanel
         * https://wordpress.org/gutenberg/handbook/designers-developers/developers/components/tab-panel/
        */

        /* the parent block client id
         * need to set the clientid as a key
		-------------------------------------------------------------*/
		setAttributes({
		    childClientId: clientId,
		    tabPaneId: 'nav-' + clientId,
		    tabPaneAria: 'nav-' + clientId + '-tab',
		    tabLinkId: 'nav-' + clientId + '-tab',
        	tabLinkHref:'#nav-' + clientId,
        	tabLinkAria: 'nav-' + clientId,
		})

		const MyColorPalette = withState( {
			color: tabColor,
		} )( ( { color, setState } ) => {
			
			// use theme color palette
			const colors = select( 'core/editor' ).getEditorSettings().colors;
			const settings = select( 'core/editor' ).getEditorSettings().colors;
			const colorObject = getColorObjectByColorValue( settings, color );

			if ( colorObject !== undefined ) {
				setAttributes( {
					tabColorClass: getColorClassName( 'color', colorObject.slug ),
				} );
			} else {
				// "clear" color option
				setAttributes( {
					tabColorClass: '',
				} );
			}

			setAttributes( {
				tabColor: color,
			} );
		 
			return (
				<Fragment>
					{ __( 'Tab Colour', 'themekit' ) }
					<ColorPalette
						colors={ colors }
						value={ color }
						onChange={ ( color ) => setState( { color } ) }
					/>
				</Fragment>
			)
		} );

		const MyBackgroundColorPalette = withState( {
			color2: tabBackgroundColor,
		} )( ( { color2, setState } ) => {
			
			// use theme color palette
			const colors2 = select( 'core/editor' ).getEditorSettings().colors;
			const settings = select( 'core/editor' ).getEditorSettings().colors;
			const colorObject = getColorObjectByColorValue( settings, color2 );

			if ( colorObject !== undefined ) {
				setAttributes( {
					tabBackgroundColorClass: getColorClassName( 'background-color', colorObject.slug ),
				} );
			} else {
				// "clear" color option
				setAttributes( {
					tabBackgroundColorClass: '',
				} );
			}

			setAttributes( {
				tabBackgroundColor: color2,
			} );
		 
			return (
				<Fragment>
					{ __( 'Tab Background Colour', 'themekit' ) }
					<ColorPalette
						colors={ colors2 }
						value={ color2 }
						onChange={ ( color2 ) => setState( { color2 } ) }
					/>
				</Fragment>
			)
		} );
        
		return (
			<Fragment>
				<BlockControls>
                    <Toolbar>
                        <ToolbarButton
                          className="components-toolbar__control"
                          label={ __( 'Delete row' ) }
                          title={ __( 'Delete row' ) }
                          icon="no"
                          onClick={ onDeleteSelf }
                        />
                    </Toolbar>
                </BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __( 'Tab Options', 'blockkit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
								<TextControl
									label="Icon Prefix Unicode"
									value={ iconPrefix }
									onChange={ ( iconPrefix ) => setAttributes( { iconPrefix } ) }
								/>
								<MySelectControlIconFAClass/>

								<TextControl
									label="Tab Title:"
									value={ tabTitle }
									onChange={ ( tabTitle ) => setAttributes( { tabTitle } ) }
								/>
								
								<MyColorPalette/>
								<MyBackgroundColorPalette/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
                <PanelBody
                    title={ tabTitle } 
                    initialOpen={ panelOpen }
					onToggle={ ( panelOpen ) => setAttributes( { panelOpen:false } ) }
					className={``}
                >
					 	<Flex className={ `${tabColorClass} ${tabBackgroundColorClass} nav-tabs-header` }>
							<FlexItem>
								<TextControl
									label="Icon Prefix Unicode"
									value={ iconPrefix }
									onChange={ ( iconPrefix ) => setAttributes( { iconPrefix } ) }
								/>
							</FlexItem>
							<FlexItem>
								<MySelectControlIconFAClass/>
							</FlexItem>
							<FlexBlock>
								<TextControl
									label="Tab Title:"
									value={ tabTitle }
									onChange={ ( tabTitle ) => setAttributes( { tabTitle } ) }
								/>
							</FlexBlock>
						</Flex>
					
						<InnerBlocks />
					
                </PanelBody>
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
	save: function( props ) {
		const { attributes: { tabTitle, tabSymbol, fontAwesomeClass, tabPaneClass, tabPaneId, tabPaneAria, tabLinkId, tabLinkHref, tabLinkAria, iconPrefix, iconContentClass, navAlign, tabColorClass, tabBackgroundColorClass }, className } = props;
		
		if ( iconPrefix ){
			return (
				<div className={ `${tabPaneClass} ` } id={ tabPaneId } role="tabpanel" aria-labelledby={ tabPaneAria }>
					<a className={`text-sm-center nav-item tab-link ${tabColorClass} ${tabBackgroundColorClass}`} data-toggle="tab" role="tab" aria-selected="false" id={ tabLinkId } href={ tabLinkHref } aria-controls={ tabLinkAria } ><i class={`fa ${iconContentClass}`}>{`&#x${iconPrefix};`}</i> <span>{ tabTitle }</span></a>
			      	<InnerBlocks.Content />
			    </div>
			);
		} else {
			return (
				<div className={ `${tabPaneClass}` } id={ tabPaneId } role="tabpanel" aria-labelledby={ tabPaneAria }>
					<a className={`text-sm-center nav-item tab-link ${tabColorClass} ${tabBackgroundColorClass}`} data-toggle="tab" role="tab" aria-selected="false" id={ tabLinkId } href={ tabLinkHref } aria-controls={ tabLinkAria } ><span>{ tabTitle }</span></a>
			      	<InnerBlocks.Content />
			    </div>
			);
		}
	},
} );
