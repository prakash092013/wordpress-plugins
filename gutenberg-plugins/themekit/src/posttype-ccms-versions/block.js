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
const { Placeholder, PanelBody, ToggleControl, RangeControl, TextControl, SelectControl} = wp.components;

const { Fragment } = wp.element;
const { withState } = wp.compose;
const { withSelect, select } = wp.data;

/* ---------------------------------------------------------------
 * post excerpts
 *---------------------------------------------------------------*/
registerBlockType( 'cgb/posts-ccms-versions', {
	title: __( 'Display Posts: CCMS Versions' ),
	icon: 'excerpt-view',
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'ccms' ),
		__( 'version' ),
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
			default: 'Learn More',
		},
		archiveHeading: {
			type: 'string',
			default: 'Archives',
		},
		archiveSelect: {
			type: 'string',
			default: 'show-recent-documentation',
		},
		
	},
	supports: {
		align:true
	},
	edit: withSelect( function( select ) {
		const query = { per_page: -1, hide_empty: true };
        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'ccms-version', query  )
        };
    } )( function( props ) {

		// Declare constants.
		const {
			attributes: {
				readmore,
				toggleContent,
				rangeColumns,
				archiveHeading,
				archiveSelect
			},
			className,
			setAttributes,
		} = props;

		// post type validation 
		if ( ! props.posts ) {
            return "Loading...";
        }
        if ( props.posts.length === 0 ) {
            return "No documentation found. Please ensure there is at least one post published.";
		}

		var output = 'Loading documentation...';
		if( props.posts.length > 0 ) {
	        output = __( '' );
	    } else {
	    	output = __( 'No documentation found. Please ensure there is at least one post published.' );
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

		const MySelectControlArchives = withState( {
			selectControl: archiveSelect,
		} )( ( { selectControl, setState } ) => {
			setAttributes( {
				archiveSelect: selectControl,
			} );
			return(
				<SelectControl
					label="Display Content"
					value={ selectControl }
					options={ [
						{ label: 'Show Most Recent', value: 'show-recent-documentation' },
						{ label: 'Show Archives', value: 'show-archive-documentation' },
					] }
					onChange={ ( selectControl ) => { setState( { selectControl } ) } }
				/>
			)
		} );
		

        return (
        	<Fragment>
        		<InspectorControls>
					<PanelBody title="CCMS Versions Settings">
						<MyToggleControlContent/>
						<TextControl
							label="Archives Heading"
							value={ archiveHeading }
							onChange={ ( archiveHeading ) => setAttributes( { archiveHeading } ) }
						/>
						<MyRangeControlColumns/>
						<MySelectControlArchives/>
						<p>{ output }</p>
					</PanelBody>
        		</InspectorControls>
        		<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="CCMS Versions Display" className={className}>
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