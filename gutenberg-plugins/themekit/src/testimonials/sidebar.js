//import includes from "lodash/includes";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel, MediaUpload } = wp.editPost;
const { PanelBody, TextControl, Button, DateTimePicker, ToggleControl, ColorPalette } = wp.components;
const { withSelect, withDispatch, select, withState } = wp.data;
const { compose } = wp.compose;
const {__experimentalGetSettings } = wp.date;
const {  getColorClassName, getColorObjectByColorValue, } = wp.blockEditor;

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

 /**
 * Colour control
 * @reference https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 */
var PluginMetaFieldsColor = compose(
  withDispatch( function( dispatch, props ) {
      const postColorClass = 'testimonial_color_class';
      const postBackgroundColorClass = 'testimonial_background_color_class'

      

      return {
        setMetaFieldValue: function( value ) {
            dispatch( 'core/editor' ).editPost(
                { meta: { [ props.fieldName ]: value } }
            );

          const settings = select( 'core/editor' ).getEditorSettings().colors;
          const colorObject = getColorObjectByColorValue( settings, value );

          if ( colorObject !== undefined ) {
            dispatch( 'core/editor' ).editPost(
              { meta: { [  postColorClass ]: getColorClassName( 'color', colorObject.slug ) } }
            );
          }

          if ( colorObject !== undefined ) {
            dispatch( 'core/editor' ).editPost(
              { meta: { [  postBackgroundColorClass ]: getColorClassName( 'background-color', colorObject.slug ) } }
            );
          }
        },
      
      }
  } ),
  withSelect( function( select, props ) {
      return {
          metaFieldValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.fieldName ],
      }
  } )
)( function( props ) {
  const settings = __experimentalGetSettings();
  const colors = select( 'core/editor' ).getEditorSettings().colors;
  return (
    <ColorPalette
      label={__(props.fieldLabel, "textdomain")}
      colors={ colors }
      value={props.metaFieldValue}
      onChange={(value) => props.setMetaFieldValue(value)}
    />
  )
} );

/**
 * Toggle control - approved credits
 * @reference https://developer.wordpress.org/block-editor/components/toggle-control/
 -------------------------------------------------------------*/

 var PluginMetaFieldsToggle = compose(
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
    <ToggleControl
      label={__(props.fieldLabel, "themekit")}
      help={ props.metaFieldValue ? props.trueLabel : props.falseLabel }
      checked={ props.metaFieldValue }
      onChange={(value) => props.setMetaFieldValue(value)}
    />
  )
} )

registerPlugin( 'post-sidebar-doc-testimonial', {
  icon: 'testimonial',
  render: () => {

    /* only viewable on post type
    -------------------------------------------------------------*/
    const postType = select("core/editor").getCurrentPostType();
    if (( postType !== "testimonial" )) {
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
          name="post-sidebar-doc-testimonial"
          title={__('Testimonial Excerpt', 'textdomain')}
					className="post-sidebar-doc-testimonial"
        >
					<p>{__('This information will be pulled into the testimonials landing page.', 'textdomain')}</p>
          <PluginMetaFieldsToggle
            fieldLabel="Hide testimonial from listing"
            fieldName="testimonial_hide"
            trueLabel="Hide."
            falseLabel="Show."
          />
          <PluginMetaFields
            fieldLabel="Testimonial Author Name"
            fieldName="testimonial-author-name"
          />
          <PluginMetaFields
            fieldLabel="Testimonial Author Title"
            fieldName="testimonial-author-title"
          />
          <p>{__('Image:', 'textdomain')}<em>{__('Upload Testimonial Landing image to Featured Image', 'textdomain')}</em></p>
          <p>{__('Quote:', 'textdomain')}<em>{__('Upload Testimonial Landing quote to Excerpt', 'textdomain')}</em></p>
          <h3>{__('Testimonial Color: ', 'textdomain')}</h3>
          <PluginMetaFieldsColor
            fieldLabel="Excerpts: Color Hex Code"
            fieldName="testimonial-color"
          />

        </PluginDocumentSettingPanel>

      </div>
    )
  }
})
