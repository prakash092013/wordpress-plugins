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
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { registerPlugin } = wp.plugins;
const { BlockIcon, InnerBlocks } = wp.blockEditor;
const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel} = wp.editPost;
const { Placeholder, TextControl } = wp.components;
const { withSelect, withDispatch, select } = wp.data;
const { compose } = wp.compose;

/* ---------------------------------------------------------------
 * post type sidebar 
 *---------------------------------------------------------------*/
/**
 * Text control 
 * @reference https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 */
var PluginMetaFields = compose(
    withDispatch( function( dispatch, props ) {
        return {
            setMetaFieldValue: function( value ) {
                dispatch( 'core/editor' ).editPost(
                    { meta: { [ props.fieldName ]: value } }
                );
            }
        }
    } ),
    withSelect( function( select, props ) {
        return {
            metaFieldValue: select( 'core/editor' )
                .getEditedPostAttribute( 'meta' )
                [ props.fieldName ],
        }
    } )
)( function( props ) {
    return (
      <TextControl 
          value={props.metaFieldValue}
          label={__(props.fieldLabel, "textdomain")}
          onChange={(value) => props.setMetaFieldValue(value)}
        />
    )
} );

registerPlugin( 'addon-sidebar-doc', {
	icon: 'id',
	render: () => {
	  
	  /* only viewable on custom post type
	  -------------------------------------------------------------*/
	  const postType = select("core/editor").getCurrentPostType();
	  if (( postType !== "addon" ) ) {
		return null;
	  }
  
	  
	  /* add <PluginMetaFields/> for each custom meta field
	   * @params fieldLabel=""
	   * @params fieldName="" // same as register_meta
	   *
	  -------------------------------------------------------------*/
	  return (
		<div>
		  <PluginDocumentSettingPanel
			name="addon-sidebar-doc"
			title={__('Addon Settings', 'textdomain')}
			className="addon-sidebar-doc"
		  >
			
			<PluginMetaFields 
			  fieldLabel="Featured Color Name"
			  fieldName="addon_feature_color"
			/>
			<PluginMetaFields 
			  fieldLabel="Icon Unicode"
			  fieldName="addon_feature_icon_unicode"
			/>
			<PluginMetaFields 
			  fieldLabel="Icon Unicode Class"
			  fieldName="addon_feature_icon_unicode_class"
			/>
		  </PluginDocumentSettingPanel>
		  
		</div>
	  )
	}
  })

/* ---------------------------------------------------------------
 * post type block/template
 *---------------------------------------------------------------*/
registerBlockType( 'cgb/addon-menu', {
	title: __( 'Addon Navigation' ),
	icon: 'screenoptions',
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'addon' ),
		__( 'menu' ),
		__( 'nav' ),
	],
	attributes: {
	    postTitle: {
	        type: 'string',
		},
	},
	supports: {
		align:true
	},
	edit: withSelect( function( select ) {
		const query = { per_page: -1, hide_empty: true };
        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'addon', query  )
        };
    } )( function( props ) {

        if ( ! props.posts ) {
            return "Loading...";
        }
        if ( props.posts.length === 0 ) {
            return "No addons found. Please ensure at least one addon post type is published.";
        }

        const { attributes: { postTitle }, setAttributes, className } = props;

		var postParams = [{ postName: 'Select a carousel', postSlug: '0' }];
		var postParams2 = [[ 'cgb/icon-button', { linkText: 'Testing Template' } ]];
		const BLOCKS_TEMPLATE = [];

		var iconMenu = [];
		/*
		<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass: post.meta.addon_feature_color}` }"><a className="icon-button" href={linkHref: post.slug} target="_self" rel="noopener noreferrer"><i className="fa fas"><span className="sr-only">Icon Display</span>e04b</i>{linkText: post.title.rendered}</a></div>
		*/
		
		var output = 'Loading...';

		console.log(props.posts);

        if( props.posts.length > 0 ) {
	        /*props.posts.map ((post, i) =>
				BLOCKS_TEMPLATE.push([ 'cgb/icon-button', { linkText: post.title.rendered, iconColorClass: post.meta.addon_feature_color, linkHref: post.slug }])
			)*/
			props.posts.map ((post, i) =>
			iconMenu.push('<!-- wp:paragraph {\"align\":\"center\",\"fontSize\":\"lead\"} -->\n<p class=\"has-text-align-center has-lead-font-size\"><span class=\"is-style-font-weight-light\">Streamline the technical communication process with our enterprise-class DITA CCMS. It’s a scalable, adaptable, and collaborative component content management system. The results will speak for themselves</span></p>\n<!-- /wp:paragraph -->')
	        )
	        output = __( '' );
	    } else {
	    	output = __( 'No addons found. Please ensure at least one addon post type is published.' );
	    }
		
        return (
			<Placeholder icon={ <BlockIcon icon="screenoptions" /> } label="Addon Navigation" className={className}>
				{iconMenu}
			</Placeholder>
        );
	}),

	save: function( props ) {
		const { attributes: {  }, className } = props;
		
		return (
			<div>
				<InnerBlocks.Content/>
			</div>
		);
	},
} );

