//import includes from "lodash/includes";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel, MediaUpload } = wp.editPost;
const { PanelBody, TextControl, Button, DateTimePicker, ColorPalette,SelectControl } = wp.components;
const { withSelect, withDispatch, select, withState } = wp.data;
const { compose } = wp.compose;
const {__experimentalGetSettings } = wp.date
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
 * Colour control
 * @reference https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 */
var PluginMetaFieldsColor = compose(
  withDispatch( function( dispatch, props ) {
      const postColorClass = 'post_color_class';
      const postBackgroundColorClass = 'post_background_color_class'

      

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
 * Date control
 * @reference https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/plugin-sidebar-6-finishing-touches/
 -------------------------------------------------------------*/
 var PluginMetaFieldsDate = compose(
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
  const settings = __experimentalGetSettings();

  // To know if the current timezone is a 12 hour time with look for an "a" in the time format.
  // We also make sure this a is not escaped by a "/".
  const is12HourTime = /a(?!\\)/i.test(
      settings.formats.time
          .toLowerCase() // Test only the lower case a
          .replace( /\\\\/g, '' ) // Replace "//" with empty strings
          .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
  );
  return (
      <DateTimePicker
        currentDate={ props.metaFieldValue }
        onChange={ ( value ) => props.setMetaFieldValue(value) }
        is12Hour={ is12HourTime }
      />
  )
} );

/**
 * Select control
 * @reference https://developer.wordpress.org/block-editor/components/toggle-control/
 -------------------------------------------------------------*/

 var PluginMetaFieldsSelect = compose(
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
  
  var options = [
      {value: 'landing', label: 'Landing Page', disabled:false }, 
      {value: 'documentation', label: 'Documentation', disabled:false }, 
      {value: 'release-notes', label: 'Release Notes', disabled:false },
      {value: 'sytem-requirements', label: 'System Requirements', disabled:false },
      {value: 'new-features', label: 'New Features', disabled:false }
  ];

  return (
    <SelectControl
      label={__(props.fieldLabel, "paintedrobot")}
      value={props.metaFieldValue}
      onChange={(value) => props.setMetaFieldValue(value)}
      options={ (options) }
      help={__(props.fieldHelp, "paintedrobot")}
    />
  )
} )

registerPlugin( 'post-sidebar-doc-ccms-versions', {
  icon: 'calendar-alt',
  render: () => {

    /* only viewable on post type
    -------------------------------------------------------------*/
    const postType = select("core/editor").getCurrentPostType();
    if (( postType !== "ccms-version" )) {
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
          name="post-sidebar-doc-ccms-versions"
          title={__('Release Date', 'textdomain')}
					className="post-sidebar-doc-ccms-versions"
        >
					{__('Select the release date:', 'textdomain')}
          <PluginMetaFieldsDate
            fieldLabel="Release Date"
            fieldName="post_release_date"
          />
        </PluginDocumentSettingPanel>
       
        <PluginDocumentSettingPanel
          name="post-sidebar-doc-style"
          title={__('Style', 'textdomain')}
					className="post-sidebar-doc-style"
        >
          <PluginMetaFieldsSelect
            fieldLabel="Navigation Style"
            fieldName="post_nav_style"
          />
          {__('Select the excerpt color', 'textdomain')}<br/>
          <em>{__('(Applies to landing page only):', 'textdomain')}</em>
          <PluginMetaFieldsColor
            fieldLabel="Excerpts: Color Hex Code"
            fieldName="post_color"
          />

        </PluginDocumentSettingPanel>

      </div>
    )
  }
})
