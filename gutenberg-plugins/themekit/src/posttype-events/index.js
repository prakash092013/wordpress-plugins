//import includes from "lodash/includes";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel, MediaUpload } = wp.editPost;
const { PanelBody, TextControl, Button, DateTimePicker, ToggleControl } = wp.components;
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
 * Toggle control
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
      label={__(props.fieldLabel, "paintedrobot")}
      help={ props.metaFieldValue ? props.trueLabel : props.falseLabel }
      checked={ props.metaFieldValue }
      onChange={(value) => props.setMetaFieldValue(value)}
    />
  )
} )

registerPlugin( 'post-sidebar-doc', {
  icon: 'calendar-alt',
  render: () => {

    /* only viewable on post type
    -------------------------------------------------------------*/
    const postType = select("core/editor").getCurrentPostType();
    if (( postType !== "event" )) {
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
          name="post-sidebar-doc"
          title={__('Event Date', 'textdomain')}
					className="post-sidebar-doc"
        >
					<h3>{__('Select the event date:', 'textdomain')}</h3>
          <PluginMetaFieldsDate
            fieldLabel="Event Date"
            fieldName="post_event_date"
          />

          <h3>{__('Is this an all day event?:', 'textdomain')}</h3>
          <PluginMetaFieldsToggle
            fieldLabel="All Day Event"
            fieldName="post_event_all_day"
            trueLabel="Yes."
            falseLabel="No."
          />
           <PluginMetaFields
            fieldLabel="Time Zone"
            fieldName="post_event_time_zone"
          />

        </PluginDocumentSettingPanel>
        <PluginDocumentSettingPanel
          name="post-sidebar-doc-end"
          title={__('Event End Date', 'textdomain')}
					className="post-sidebar-doc-end"
        >
          <h3>{__('Select the event end date:', 'textdomain')}</h3>
          <PluginMetaFieldsDate
            fieldLabel="Event End date"
            fieldName="post_event_end_date"
          />

        </PluginDocumentSettingPanel>

      </div>
    )
  }
})
