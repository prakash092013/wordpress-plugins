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
const { SelectControl, Placeholder, PanelBody, TextControl, ToggleControl, RangeControl } = wp.components;

const { Fragment } = wp.element;
const { withState } = wp.compose;
const { withSelect, select } = wp.data;

/* ---------------------------------------------------------------
 * TESTIMONIAL CAROUSEL 
 * Note/TODO: this would be better if using the same bootstrap carousel block,
 * but cannot seem to pull multiple taxonomies with: 
 * posts: select( 'core' ).getEntityRecords( 'taxonomy', 'testimonial-category', query  )
 *---------------------------------------------------------------*/
registerBlockType( 'cgb/team-members', {
	title: __( 'Team Members' ),
	icon: 'screenoptions',
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'team' ),
		__( 'members' ),
		__( 'grid' ),
	],
	attributes: {
		className: {
	        type: 'string',
            default: 'wp-block-cgb-team-members'
	    },
		align: {
			type: 'string',
		},
	    term: {
	        type: 'string',
	    },
	    columns: {
	        type: 'integer',
            default: '5'
	    },
	    show_designation: {
			type: 'boolean',
			default: true,
		},
	},
	supports: {
		align:true
	},
	edit: withSelect( function( select ) {
		const query = { per_page: -1, hide_empty: true };
        return {
            posts: select( 'core' ).getEntityRecords( 'taxonomy', 'team-category', query  )
        };
    } )( function( props ) {

        if ( ! props.posts ) {
            return "Loading...";
        }
        if ( props.posts.length === 0 ) {
            return "No team members found. Please ensure members are attached to proper category.";
        }

        const { attributes: { term, align, columns, show_designation }, setAttributes, className } = props;

		var options = [{ label: 'Select a category', value: '0' }];
		var output = 'Loading members...';

        if( props.posts.length > 0 ) {
	        props.posts.map ((post, i) =>
	        	options.push({ label: post.name, value: post.slug })
	        )
	        output = __( '' );
	    } else {
	    	output = __( 'No team members found. Please ensure members are attached to proper category.' );
	    }

        return (
        	<Fragment>
        		<InspectorControls>
					<PanelBody title="Team Members Settings">
						<SelectControl
							label="Select Category"
							value={ term }
							options={ options }
							onChange={ ( term ) => { setAttributes( { term } ) } }
						/>
						<p>{ output }</p>

						<RangeControl
					        label="Number of members to show in single row"
					        value={ columns }
					        onChange={ ( columns ) => setAttributes( { columns } ) }
					        min={ 2 }
					        max={ 8 }
					    />
					    <ToggleControl
					        label="Show member designation"
					        help={ show_designation ? 'Designations are visible.' : 'Designations are hidden.' }
					        checked={ show_designation }
					        onChange={ ( show_designation ) => setAttributes( { show_designation } ) }
					    />
					</PanelBody>
        		</InspectorControls>
        		<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="Team Members Settings" className={className}>
					<PanelBody>
						<SelectControl
							label="Select Category"
							value={ term }
							options={ options }
							onChange={ ( term ) => { setAttributes( { term } ) } }
						/>
						{ output }

						<RangeControl
					        label="Number of members to show in single row"
					        value={ columns }
					        onChange={ ( columns ) => setAttributes( { columns } ) }
					        min={ 2 }
					        max={ 8 }
					    />
					    <ToggleControl
					        label="Show member designation"
					        help={ show_designation ? 'Designations are visible.' : 'Designations are hidden.' }
					        checked={ show_designation }
					        onChange={ ( show_designation ) => setAttributes( { show_designation } ) }
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

