/**
 * BLOCK: themekit
 *
 * Registering a basic block styles with Gutenberg.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: gutenberg Block style.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 */

wp.blocks.registerBlockStyle( 'core/columns', {
    name: 'mb-0',
    label: 'margin bottom: 0'
} );
wp.blocks.registerBlockStyle( 'core/columns', {
    name: 'align-stretch',
    label: 'Align Stretch'
} );
wp.blocks.registerBlockStyle( 'core/group', {
    name: 'p-0',
    label: 'No Padding'
} );
wp.blocks.registerBlockStyle( 'core/group', {
    name: 'fade-in',
    label: 'Fade In'
} );
wp.blocks.registerBlockStyle( 'core/group', {
    name: 'w-75',
    label: 'Width: 75%'
} );
wp.blocks.registerBlockStyle( 'core/group', {
    name: 'display-icon-navigation',
    label: 'Display Icon Navigation'
} );
wp.blocks.registerBlockStyle( 'core/heading', {
    name: 'heading-style-1',
    label: 'All Caps, Short Underline, Med Fontsize'
} );
wp.blocks.registerBlockStyle( 'core/heading', {
    name: 'heading-style-2',
    label: 'Lowercase, Short Underline, Med Fontsize'
} );
wp.blocks.registerBlockStyle( 'core/heading', {
    name: 'heading-style-primary',
    label: 'Short Underline, Extra Pad'
} );
wp.blocks.registerBlockStyle( 'core/image', {
    name: 'mb-0',
    label: 'margin bottom: 0'
} );
wp.blocks.registerBlockStyle( 'core/list', {
    name: 'service-list',
    label: 'Service List: Left Aligned'
} );
wp.blocks.registerBlockStyle( 'core/list', {
    name: 'service-list-centered',
    label: 'Service List: Centered'
} );
wp.blocks.registerBlockStyle( 'core/list', {
    name: 'icon-list-eucalyptus',
    label: 'Icon List: Eucalyptus'
} );
wp.blocks.registerBlockStyle( 'core/list', {
    name: 'icon-list-picton-blue',
    label: 'Icon List: Picton Blue'
} );
wp.blocks.registerBlockStyle( 'core/media-text', {
    name: 'layout-thirds',
    label: 'Layout: Thirds'
} );
wp.blocks.registerBlockStyle( 'core/media-text', {
    name: 'layout-card',
    label: 'Layout: Card'
} );
wp.blocks.registerBlockStyle( 'core/media-text', {
    name: 'layout-timeline',
    label: 'Layout: Timeline'
} );

wp.blocks.registerBlockStyle( 'core/paragraph', {
    name: 'mb-0',
    label: 'margin bottom: 0'
} );
wp.blocks.registerBlockStyle( 'core/paragraph', {
    name: 'subheading',
    label: 'Subheading'
} );
wp.blocks.registerBlockStyle( 'core/separator', {
    name: 'full-line',
    label: 'Full Line'
} );
wp.blocks.registerBlockStyle( 'core/separator', {
    name: 'starter-line',
    label: 'Starter Line'
} );
wp.blocks.registerBlockStyle( 'core/heading', {
    name: 'heading-wide-line',
    label: 'Wide Line'
} );
wp.blocks.registerBlockStyle( 'core/image', {
    name: 'offset-top',
    label: 'Offset Top'
} );
wp.blocks.registerBlockStyle( 'core/gallery', {
    name: 'gallery-carousel',
    label: 'Gallery Carousel'
} );
wp.blocks.registerBlockStyle( 'core/gallery', {
    name: 'gallery-carousel-desktop',
    label: 'Gallery Carousel: Within Desktop Image'
} );

wp.blocks.registerBlockStyle( 'core/columns', {
    name: 'mobile-stack-sm',
    label: 'Mobile Stack: SM'
} );

wp.blocks.registerBlockStyle( 'core/group', {
    name: 'cta-group',
    label: 'Call to Action'
} );

wp.blocks.registerBlockStyle( 'core/image', {
    name: 'mobile-center',
    label: 'Mobile: Center'
} );

// cover - no image
wp.blocks.registerBlockStyle( 'core/cover', {
    name: 'hero-no-image',
    label: 'Hero: No Image'
} );  

// group - Icon Banner Background (Addons)
wp.blocks.registerBlockStyle( 'core/group', {
    name: 'icon-banner-background',
    label: 'Icon Banner Background (Addons)'
} );
// group - Documentation Card
wp.blocks.registerBlockStyle( 'core/group', {
    name: 'documentation-card',
    label: 'Documentation Card'
} );
// column - Documentation Card
wp.blocks.registerBlockStyle( 'core/columns', {
    name: 'documentation-card-columns',
    label: 'Documentation Card Columns'
} );
// image - caption/linkable
wp.blocks.registerBlockStyle( 'core/image', {
    name: 'image-linkable',
    label: 'Image Linkable w/Caption'
} );
wp.blocks.registerBlockStyle( 'core/columns', {
    name: 'image-columns-menu',
    label: 'Image Columns Menu'
} );
wp.blocks.registerBlockStyle( 'core/heading', {
    name: 'icon-heading',
    label: 'Icon Heading'
} );
/**
 * Text editor toolbar options
 * see: https://webomnizz.com/gutenberg-editor-add-button-to-the-toolbar/
*/

( function( wp ) {
    /**
     * All Caps 
     */
    var TextAllCapsButton = function( props ) {
        return wp.element.createElement(
            wp.editor.RichTextToolbarButton, 
            {
                icon: 'admin-customizer', 
                title: 'All Caps', 
                onClick: function() {
                    props.onChange( 
                        wp.richText.toggleFormat(props.value, {
                            type: 'webomnizz/text-allcaps'
                        }) 
                    );
                }
            }
        );
    }
    wp.richText.registerFormatType(
        'webomnizz/text-allcaps', {
            title: 'All Caps',
            tagName: 'span',
            className: 'is-style-all-caps',
            edit: TextAllCapsButton,
        }
    );
    
    /**
     * Font weight: Light
     */
    var TextLightWeightButton = function( props ) {
        return wp.element.createElement(
            wp.editor.RichTextToolbarButton, 
            {
                icon: 'admin-customizer', 
                title: 'Font Weight: Light', 
                onClick: function() {
                    props.onChange( 
                        wp.richText.toggleFormat(props.value, {
                            type: 'webomnizz/text-lightweight'
                        }) 
                    );
                }
            }
        );
    }
    wp.richText.registerFormatType(
        'webomnizz/text-lightweight', {
            title: 'Font Weight: Light',
            tagName: 'span',
            className: 'is-style-font-weight-light',
            edit: TextLightWeightButton,
        }
    );

    /**
     * Underline: NOTE: this causes issues with (WPML, inline links), dj
     */
    /*var TextUnderlineButton = function( props ) {
        return wp.element.createElement(
            wp.editor.RichTextToolbarButton, 
            {
                icon: 'admin-customizer', 
                title: 'Underline', 
                onClick: function() {
                    props.onChange( 
                        wp.richText.toggleFormat(props.value, {
                            type: 'webomnizz/text-underline'
                        }) 
                    );
                }
            }
        );
    }
    wp.richText.registerFormatType(
        'webomnizz/text-underline', {
            title: 'Underline',
            tagName: 'u',
            className: 'is-style-underline',
            edit: TextUnderlineButton,
        }
    );*/

    /**
     * Font icon: Font Awesome - inline icons
     * see: https://github.com/bueltge/AddQuicktag/blob/gutenberg/js/add-quicktag-gutenberg.dev.js#L70
     * TODO: having trouble editing innerHTML output... dj  
     * final result s/b <i class="fa fas"><span class="sr-only">icon</span>[iconunicode parsed for output]</i>
     */
    /*var TextFontIconButton = function( props ) {
        

        return wp.element.createElement(
            wp.editor.RichTextToolbarButton, 
            {
                icon: 'admin-customizer', 
                title: 'Font Awesome Icon', 
                onClick: function() {
                    /*const element = wp.richText.create({
                        'html' : toInsert
                    });
                    if( element.formats.length === 0 ) {
                        return;
                    }
                    for ( let i = element.formats[0].length - 1; i >= 0; i-- ) {
                        value = toggleFormat(value, element.formats[0][i]);
                    }*/
                    // Get the selected string.
                   /* const text = wp.richText.getTextContent(wp.richText.slice(props.value));
                    const toInsert = '<i class="testing">' + text + '</i>';
                    //wp.richText.applyFormat();

                    //console.log(toInsert);
                    //console.log(text);
                    //props.value = toInsert;

                    props.onChange( 
                        wp.richText.toggleFormat(props.value, {
                            type: 'webomnizz/text-icon',
                        }) 
                    );
                }
            }
        );
    }
    wp.richText.registerFormatType(
        'webomnizz/text-icon', {
            title: 'Font Awesome Icon',
            tagName: 'i',
            className: 'fa',
            content: '<span> testing content</span>',
            edit: TextFontIconButton,
        }
    );*/

} )( window.wp );


