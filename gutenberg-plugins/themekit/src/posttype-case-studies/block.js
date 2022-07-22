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
const { InspectorControls, BlockIcon, } = wp.blockEditor;
const { Placeholder, PanelBody, ToggleControl, RangeControl } = wp.components;

const { Fragment } = wp.element;
const { withState } = wp.compose;
const { withSelect, select } = wp.data;

/* ---------------------------------------------------------------
 * post excerpts
 *---------------------------------------------------------------*/
registerBlockType( 'cgb/excerpt-case-studies', {
	title: __( 'Display Posts: Case Studies' ),
	icon: 'excerpt-view',
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'case' ),
		__( 'study' ),
		__( 'success' ),
		__( 'story' ),
		__( 'excerpt' ),
	],
	styles: [
		{
			name: 'default-width',
			label: __( 'Default Width', "cgb" ),
			isDefault: true
		},
		{
			name: 'w-75',
			label: __( '75% Width', "cgb" )
		},
	],
	attributes: {
	    className: {
	        type: 'string',
	    },
	    align: {
			type: 'string',
		},
		term: {
	        type: 'string',
		},
		toggleContent: {
			type: 'boolean',
			default: false,
		},
		rangeColumns: {
			type: 'number',
			default: 2,
		},
		readmore: {
			type: 'string',
			default: 'Continue Reading',
		},
		
	},
	supports: {
		align:true
	},
	edit: withSelect( function( select ) {
		const query = { per_page: -1, hide_empty: true };
        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'cms-case-studies', query  )
        };
    } )( function( props ) {

		// Declare constants.
		const {
			attributes: {
				term,
				readmore,
				toggleContent,
				rangeColumns,
			},
			className,
			setAttributes,
		} = props;

		// post type validation 
		if ( ! props.posts ) {
            return "Loading...";
        }
        if ( props.posts.length === 0 ) {
            return "No case studies found. Please ensure there is at least one case study published.";
		}

		// post type/taxonomy selector
		var options = [{ label: 'Select a team committee', value: '0' }];
		var output = 'Loading team committees...';

        if( props.posts.length > 0 ) {
	        props.posts.map ((post, i) =>
	        	options.push({ label: post.name, value: post.slug })
	        )
	        output = __( '' );
	    } else {
	    	output = __( 'No case studies found. Please ensure there is at least one case study published.' );
	    }

		const MyToggleControlContent = withState( {
			toggleOption: toggleContent,
		} )( ( { toggleOption, setState } ) => {

			setAttributes( {
				toggleContent: toggleOption,
			} );

			return(
				<ToggleControl
					label="Content Display"
					help={ toggleOption ? 'Displaying Full Content.' : 'Displaying Excerpt' }
					checked={ toggleOption }
					onChange={ () => setState( ( state ) => ( { toggleOption: ! state.toggleOption } ) ) }
				/>
			)
		} );

		const MyRangeControlColumns = withState( {
			columns: rangeColumns,
		} )( ( { columns, setState } ) => {

			setAttributes( {
				rangeColumns: columns,
			} );

			return (
				<RangeControl
					label="Columns"
					value={ columns }
					onChange={ ( columns ) => setState( { columns } ) }
					min={ 2 }
					max={ 3 }
				/>
			)
		} );

        return (
        	<Fragment>
        		<InspectorControls>
					<PanelBody title="Case Studies Settings">
						<MyToggleControlContent/>
						<MyRangeControlColumns/>
						<p>{ output }</p>
					</PanelBody>
        		</InspectorControls>
        		<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="Case Studies Display" className={className}>
					<PanelBody>
						<p>{ output }</p>
					</PanelBody>
				</Placeholder>
        	</Fragment>
        );
    } ),

    save: function() {
        return null;
    },
} );