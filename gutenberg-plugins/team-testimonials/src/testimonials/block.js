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
const { InnerBlocks, InspectorControls, BlockIcon, ColorPalette, getColorClassName, getColorObjectByColorValue } = wp.blockEditor;
const { SelectControl, Placeholder, PanelBody, TextControl, ToggleControl } = wp.components;

const { Fragment } = wp.element;
const { withState } = wp.compose;
const { withSelect, select } = wp.data;

/* ---------------------------------------------------------------
 * TESTIMONIAL CAROUSEL 
 * Note/TODO: this would be better if using the same bootstrap carousel block,
 * but cannot seem to pull multiple taxonomies with: 
 * posts: select( 'core' ).getEntityRecords( 'taxonomy', 'testimonial-category', query  )
 *---------------------------------------------------------------*/
registerBlockType( 'cgb/testimonial-carousel', {
	title: __( 'Testimonial Carousel' ),
	icon: 'screenoptions',
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'carousel' ),
		__( 'slide' ),
		__( 'testimonial' ),
	],
	attributes: {
	    term: {
	        type: 'string',
	    },
	    className: {
	        type: 'string',
            default: 'wp-block-cgb-carousel'
	    },
	    align: {
			type: 'string',
		},
		interval: {
			type: 'string',
			default: '5000',
		},
		height: {
			type: 'string',
			default: '500px'
		},
		heightxl: {
			type: 'string',
		},
		heightlg: {
			type: 'string',
		},
		heightmd: {
			type: 'string',
		},
		heightsm: {
			type: 'string',
		},
	},
	supports: {
		align:true
	},
	edit: withSelect( function( select ) {
		const query = { per_page: -1, hide_empty: true };
        return {
            posts: select( 'core' ).getEntityRecords( 'taxonomy', 'testimonial-category', query  )
        };
    } )( function( props ) {

        if ( ! props.posts ) {
            return "Loading...";
        }
        if ( props.posts.length === 0 ) {
            return "No carousels found. Please ensure slides are applied to the carousel.";
        }

        const { attributes: { term, align, interval, height, heightxl, heightlg, heightmd, heightsm }, setAttributes, className } = props;

		var options = [{ label: 'Select a carousel', value: '0' }];
		var output = 'Loading carousels...';

        if( props.posts.length > 0 ) {
	        props.posts.map ((post, i) =>
	        	options.push({ label: post.name, value: post.slug })
	        )
	        output = __( '' );
	    } else {
	    	output = __( 'No carousels found. Please ensure slides are applied to the carousel.' );
	    }

        return (
        	<Fragment>
        		<InspectorControls>
					<PanelBody title="Carousel Settings">
						<SelectControl
							label="Select Carousel"
							value={ term }
							options={ options }
							onChange={ ( term ) => { setAttributes( { term } ) } }
						/>
						<p>{ output }</p>

						<TextControl
							label="Interval in milliseconds (ms: 5000 = 5seconds, false = no auto cycle)"
							value={ interval }
							onChange={ ( interval ) => setAttributes( { interval } ) }
						/>

						<TextControl
							label="Height (ex: 500px)"
							value={ height }
							onChange={ ( height ) => setAttributes( { height } ) }
							help = {__( 'Desktop/General Height' )}
						/>
						<p><strong>{__( 'Responsive height at breakpoints:' )}</strong></p>
						<TextControl
							label="Height XLarge"
							value={ heightxl }
							onChange={ ( heightxl ) => setAttributes( { heightxl } ) }
							help = {__( '@media > 1500px' )}
						/>
						<TextControl
							label="Height Large"
							value={ heightlg }
							onChange={ ( heightlg ) => setAttributes( { heightlg } ) }
							help = {__( '@media < 1199px' )}
						/>
						<TextControl
							label="Height Medium"
							value={ heightmd }
							onChange={ ( heightmd ) => setAttributes( { heightmd } ) }
							help = {__( '@media < 991px' )}
						/>
						<TextControl
							label="Height Small"
							value={ heightsm }
							onChange={ ( heightsm ) => setAttributes( { heightsm } ) }
							help = {__( '@media < 767px' )}
						/>		
					</PanelBody>
        		</InspectorControls>
        		<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="Testimonial Carousel" className={className}>
					<PanelBody>
						<SelectControl
							label="Select Carousel"
							value={ term }
							options={ options }
							onChange={ ( term ) => { setAttributes( { term } ) } }
						/>
						{ output }

						<TextControl
							label="Interval in milliseconds (ms: 5000 = 5seconds, false = no auto cycle)"
							value={ interval }
							onChange={ ( interval ) => setAttributes( { interval } ) }
						/>
						<TextControl
								label="Height (ex: 500px).  Responsive height variations can be set in block details."
								value={ height }
								onChange={ ( height ) => setAttributes( { height } ) }
							/>
					</PanelBody>
				</Placeholder>
        	</Fragment>
        );
    } ),

    save: function() {
        return null;
    },
} );

