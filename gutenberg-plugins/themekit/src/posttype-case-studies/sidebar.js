//import includes from "lodash/includes";

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel, MediaUpload } = wp.editPost;
const { PanelBody, TextControl, Button, TextareaControl } = wp.components;
const { withSelect, withDispatch, select, withState } = wp.data;
const { compose } = wp.compose;
const {__experimentalGetSettings } = wp.date

/**
 * Custom Post Meta Information, accessible via gutenberg sidebar plugin
 * TODO: need to get this working with media uploader
 *
 * @link https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 * @link https://css-tricks.com/managing-wordpress-metadata-in-gutenberg-using-a-sidebar-plugin/
 * @link https://wordpress.stackexchange.com/questions/326335/gutenberg-sidebar-for-specific-post-type
 *
 *
 */

/**
 * Text control
 * @reference https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 */
var PluginMetaFieldsText = compose(
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
				help={__(props.fieldHelp, "textdomain")}
				label={__(props.fieldLabel, "textdomain")}
				onChange={(value) => props.setMetaFieldValue(value)}
			/>
	)
} );

/**
 * Textarea control
 * @reference https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 */
var PluginMetaFieldsTextArea = compose(
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
		<TextareaControl
				value={props.metaFieldValue}
				help={__(props.fieldHelp, "textdomain")}
				label={__(props.fieldLabel, "textdomain")}
				onChange={(value) => props.setMetaFieldValue(value)}
			/>
	)
} );


registerPlugin( 'page-sidebar-case-studies', {
  icon: 'admin-links',
  render: () => {

    /* only viewable on post type
    -------------------------------------------------------------*/
    const postType = select("core/editor").getCurrentPostType();
    if (( postType !== "cms-case-studies" )) {
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
          name="page-sidebar-case-studies"
          title={__('Read More Link', 'textdomain')}
					className="page-sidebar-case-studies"
        >
          <PluginMetaFieldsText
            fieldLabel="Read More Text"
			fieldName="case_study_readmore"
			fieldHelp="default fallback: Continue Reading"
			
          />
		
        </PluginDocumentSettingPanel>
      </div>
    )
  }
})
