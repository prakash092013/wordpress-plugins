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
const { Placeholder, PanelBody, TextControl, Button, Modal, Panel, Toolbar, ToolbarButton,  SelectControl } = wp.components;
const { InnerBlocks, BlockIcon, BlockControls, RichText, InspectorControls } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { select, dispatch, withSelect } = wp.data; // Import registerBlockType() from wp.blocks
const { withState } = wp.compose;

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
		
    },

	edit: function( props ) {
		const { attributes: { }, setAttributes, focus, className, clientId } = props;

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
    	/*var parentBlock = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ];
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
                tabLinksDisplay = tabLinksDisplay + '<a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>';
            }
        }

        setAttributes({
		    tabContentId: 'nav-tabContent-' + clientId,
		    tabLinks: '<a href"#"> HTML </a>', // note: this outputs as text, not html
		})*/

		/*return (
			<div>
                <InnerBlocks allowedBlocks={ [ 'cgb/tab' ]} />
            </div>
		);*/
		// set the text value.
		const onTextControl = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel: value,
				uniqueId: temp_id,
			} );
		};
		const MyTextControl = withState( {
			value: '',
		} )( ( { value, setState } ) => {
			/*return(
				<TextControl
					label={`Edit Unique Label: ${uniqueLabel}`}
					value={ value }
					onChange={ ( value ) => setState( { value } ) }
				/>
			)*/
			setAttributes( {
				uniqueLabel: value,
			} );
			const onTextControlLabel = value => {
				var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
				setState( {  value } );
				setAttributes( {
					uniqueLabel: value,
					uniqueId: temp_id,
				} );
			};
			return(
				<TextControl
					label={`Edit Unique Label: ${uniqueLabel}`}
					value={ value }
					onChange={ onTextControlLabel }
				/>
			)
		} );

		const TabLabelTextControl = withState( {
			tabLabel: '',
		} )( ( { tabLabel, setState } ) => ( 
			<TextControl
				label="Tab Label"
				value={ tabLabel }
				onChange={ ( tabLabel ) => setAttributes( { tabLabel } ) }
			/>
		) );
		const MyTextControl2 = withState( {
			className: '',
		} )( ( { className, setState } ) => ( 
			<TextControl
				label="Additional CSS Class"
				value={ className }
				onChange={ ( className ) => setState( { className } ) }
			/>
		) );


		const TabModal = () => {
			const [ isOpen, setOpen ] = useState( false );
			const openModal = () => setOpen( true );
			const closeModal = () => setOpen( false );
		 
			return (
				<div>
					<Button isSecondary onClick={ openModal }>Open Modal</Button>
					{ isOpen && (
						<Modal
							title="Tab Content"
							isDismissible='false'
							onRequestClose={ closeModal }>

							<TabLabelTextControl/>


							<Button isSecondary onClick={ closeModal }>
								Close Modal
							</Button>
						</Modal>
					) }
				</div>
			)
		}
		const onButtonClickNav = value => {
			console.log('Button Clicked!');
		};
		const NavButton = () => <Button onClick={onButtonClickNav} isDefault>{uniqueLabel}</Button>;
		/*return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Tab Options', 'themekit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
								{tabLabel}
								{ className }
								<TabLabelTextControl/>	
								<MyTextControl2/>							
								
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div class="wp-block-cgb-tabs">
					<nav class="nav nav-tabs flex-column flex-sm-row" role="tablist">
						<div class="flex-sm-fill text-sm-center nav-item nav-link" data-toggle="tab" role="tab" aria-selected="false" id="nav-3f0d4013-07fb-4ce6-920e-0076a42b369f-tab" href="#nav-3f0d4013-07fb-4ce6-920e-0076a42b369f" aria-controls="nav-3f0d4013-07fb-4ce6-920e-0076a42b369f">
						<NavButton/>
						<TabModal/>
						</div>
						<a class="flex-sm-fill text-sm-center nav-item nav-link active" data-toggle="tab" role="tab" aria-selected="true" id="nav-87d328bb-bbbc-45c6-ac6c-fc98133da873-tab" href="#nav-87d328bb-bbbc-45c6-ac6c-fc98133da873" aria-controls="nav-87d328bb-bbbc-45c6-ac6c-fc98133da873">
							<span>two</span>
						</a>
					</nav>
					<div class="tab-content" id="nav-tabContent-44f8845e-0820-457c-a35e-7fca1fb51f29">
						<div class="wp-block-cgb-tab tab-pane fade" id="nav-3f0d4013-07fb-4ce6-920e-0076a42b369f" role="tabpanel" aria-labelledby="nav-3f0d4013-07fb-4ce6-920e-0076a42b369f-tab">
							<p class="is-style-mb-0">one</p>
						</div>
						<div class="wp-block-cgb-tab tab-pane fade active show" id="nav-87d328bb-bbbc-45c6-ac6c-fc98133da873" role="tabpanel" aria-labelledby="nav-87d328bb-bbbc-45c6-ac6c-fc98133da873-tab">
							<p class="is-style-mb-0">two</p>
						</div>
					</div>
				</div>
			</Fragment>
		);*/
		return(
			<Fragment>
				<div>
				<div class="nav nav-tabs tab-content" id="myTab" role="tablist">
						<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
						<div class="tab-pane fade active" id="home" role="tabpanel" aria-labelledby="home-tab">home</div>
						
						<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
						<div class="tab-pane fade  " id="profile" role="tabpanel" aria-labelledby="profile-tab">profile</div>
						
						<a class="nav-link" id="messages-tab" data-toggle="tab" href="#messages" role="tab" aria-controls="messages" aria-selected="false">Messages</a>
						<div class="tab-pane fade " id="messages" role="tabpanel" aria-labelledby="messages-tab">messages</div>
					
						<a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">Settings</a>
						<div class="tab-pane fade " id="settings" role="tabpanel" aria-labelledby="settings-tab">settings</div>
					</div>
			</div>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes: { tabContentId, tabContentClass, tabLinks }, className } = props;
		
		/*return (
			<div>
				<nav className="nav nav-tabs flex-column flex-sm-row" role="tablist"></nav>
				<div className={ tabContentClass } id={tabContentId}><InnerBlocks.Content/></div>
			</div>
		);*/

		return (
			<div>
				<div class="nav nav-tabs tab-content" id="myTab" role="tablist">
						<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
						<div class="tab-pane fade active" id="home" role="tabpanel" aria-labelledby="home-tab">home</div>
						
						<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
						<div class="tab-pane fade  " id="profile" role="tabpanel" aria-labelledby="profile-tab">profile</div>
						
						<a class="nav-link" id="messages-tab" data-toggle="tab" href="#messages" role="tab" aria-controls="messages" aria-selected="false">Messages</a>
						<div class="tab-pane fade " id="messages" role="tabpanel" aria-labelledby="messages-tab">messages</div>
					
						<a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">Settings</a>
						<div class="tab-pane fade " id="settings" role="tabpanel" aria-labelledby="settings-tab">settings</div>
					</div>
			</div>
		);
	},

} );
registerBlockType( 'cgb/tab', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: 'cgb/tabs',
	keywords: [
		__( 'tab' ),
	],
	attributes: { 
		tabLabel:{
			type: 'string',
			default: 'Tab Example One',
        },
        tabId:{
			type: 'string',
			default: 'tab-example-one',
		},
		navWrapper: {
			type: 'array',
		},
		contentWrapper: {
			type: 'array',
		}
	},
	

	edit: function( props ) {
		const { attributes: { tabLabel, tabId, navWrapper, contentWrapper }, setAttributes, focus, className, clientId } = props;

		const onAddRow = () => {
			const blockNav = createBlock('cgb/tab-nav');
			const blockContent = createBlock('cgb/tab-content');
			dispatch('core/editor').insertBlock(blockNav, undefined, clientId);
			dispatch('core/editor').insertBlock(blockContent, undefined, clientId)
			
		}
		  
		// Add block if no blocks already exist.
		if (! select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.length) {
			onAddRow();
		}

		const onTextControlTabLabel = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				tabLabel: value,
				tabId: temp_id,
			} );
		};

		const TEMPLATE = [
			['cgb/tab-nav', {}],
			['cgb/tab-content', {}],
		];
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Tab Options', 'themekit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
							
							<TextControl
								label="Tab Label"
								value={ tabLabel }
								onChange={ onTextControlTabLabel }
								help="Required.  This is used for AODA/SEO, ensure it is short and contextual."
							/>	
								
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div class={className}>
					<PanelBody
						title={ tabLabel }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
							
								<TextControl
									label="Tab Label"
									value={ tabLabel }
									onChange={ onTextControlTabLabel }
									help="Required.  This is used for AODA/SEO, ensure it is short and contextual."
								/>	
								<InnerBlocks/>
							</div>
						</div>
					</PanelBody>
				</div>
				{navWrapper}
				{contentWrapper}
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes: { tabLabel }, className } = props;

		return (
			<div class={className}>
				<InnerBlocks.Content />
			</div>
		);
	},

} );
registerBlockType( 'cgb/tab-nav', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab Navigation' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: 'cgb/tab',
	keywords: [
		__( 'tab' ),
	],
	attributes: { 
		
	},
	

	edit: function( props ) {
		const { attributes: {  }, setAttributes, focus, className, clientId } = props;
		
		return (
			<Fragment>
				<InspectorControls>
					
				</InspectorControls>
				<div class={className}>
					<PanelBody
						title='Tab Navigation'
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
							
								<InnerBlocks/>
							</div>
						</div>
					</PanelBody>
				</div>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes: { tabLabel }, className } = props;

		return (
			<div class={`${className} parent-id`}>
				<InnerBlocks.Content />
			</div>
		);
	},

} );
registerBlockType( 'cgb/tab-content', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab Content' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: 'cgb/tab',
	keywords: [
		__( 'tab' ),
	],
	attributes: { 
		
	},
	

	edit: function( props ) {
		const { attributes: {  }, setAttributes, focus, className, clientId } = props;
		
		return (
			<Fragment>
				<InspectorControls>
					
				</InspectorControls>
				<div class={className}>
					<PanelBody
						title='Tab Content'
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
							
								<InnerBlocks/>
							</div>
						</div>
					</PanelBody>
				</div>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes: { tabLabel }, className } = props;

		return (
			<div class={`${className} parent-id`}>
				<InnerBlocks.Content />
			</div>
		);
	},

} );
