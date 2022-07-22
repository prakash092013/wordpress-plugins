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

const { Fragment } = wp.element;
const { InspectorControls,  } = wp.blockEditor;
const { withSelect, select } = wp.data;
const { SelectControl, Placeholder, PanelBody, ToggleControl} = wp.components;
const { withState } = wp.compose;


registerBlockType( 'cgb/event-listing-excerpt', {
	title: __( 'Event Listing Excerpt' ),
	icon: 'excerpt-view',
	category: 'widgets', 
	keywords: [
		__( 'property' ),
        __( 'list' ),
        __( 'excerpt' ),
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
        toggleDisplayUpcoming: {
			type: 'boolean',
			default: true,
		},
		toggleDisplayMonthHeadings: {
			type: 'boolean',
			default: false,
		},
		toggleDisplayYearHeadings: {
			type: 'boolean',
			default: false,
		},
		selectDisplayEvents: {
			type: 'string',
			default: 'all',
		},
	},
	supports: {
		align: true
	},
	edit: withSelect( function( select ) {
		const query = { per_page: -1, hide_empty: true };
        return {
			//posts: select( 'core' ).getEntityRecords( 'postType', 'event', query  ),
			taxonomy: select( 'core' ).getEntityRecords( 'taxonomy', 'event-type', query  )
        };
    } )( function( props ) {

		if ( ! props.taxonomy ) {
            return "Loading...";
        }
        if ( props.taxonomy.length === 0 ) {
            return "No event types found. Please ensure there is at least one event type associated with an event.";
        }

		const { 
			attributes: { 
                toggleDisplayUpcoming, 
				term, 
				toggleDisplayMonthHeadings,
				toggleDisplayYearHeadings,
				selectDisplayEvents,
			}, 
			setAttributes, className 
        } = props;

        const MySelectControlTaxonomyTerm = withState( {
			selectControl: term,
		} )( ( { selectControl, setState } ) => {

			// post options select
			var options = [{ label: 'Show All Events', value: 0 }];
			var output = 'Loading event types...';

			if( props.taxonomy.length > 0 ) {
				props.taxonomy.map ((post, i) =>
					options.push({ label: post.name, value: post.slug })
				)
				output = __( '' );
			} else {
				output = __( 'No event types found. Please ensure there is at least one event type associated with an event.' );
			}

			setAttributes( {
				term: selectControl,
			} );
			
			return (
				<Fragment>
					<SelectControl
						label="Select Event Type"
						value={ selectControl }
						options={ options }
						onChange={ ( selectControl ) => { setState( { selectControl } ) } }
					/>
					{output}
				</Fragment>
			)
		} );

        const MyToggleDisplayUpcoming = withState( {
			toggleControl: toggleDisplayUpcoming,
		} )( ( { toggleControl, setState } ) => {

			setAttributes( {
				toggleDisplayUpcoming: toggleControl,
			} );

			return (
				<Fragment>
					<ToggleControl
						label="Display Events"
						help={ toggleControl ? 'Show Upcoming Events Only.' : 'Show Past Events Only.' }
						checked={ toggleControl }
						onChange={ () => setState( ( state ) => ( { toggleControl: ! state.toggleControl } ) ) }
					/>
					
				</Fragment>
			)
			
		} );
		const MyToggleDisplayMonthHeadings = withState( {
			toggleControl: toggleDisplayMonthHeadings,
		} )( ( { toggleControl, setState } ) => {

			setAttributes( {
				toggleDisplayMonthHeadings: toggleControl,
			} );

			return (
				<Fragment>
					<ToggleControl
						label="Display Month Headings"
						help={ toggleControl ? 'Show Month Headings.' : 'Hide Month Headings.' }
						checked={ toggleControl }
						onChange={ () => setState( ( state ) => ( { toggleControl: ! state.toggleControl } ) ) }
					/>
					
				</Fragment>
			)
			
		} );
		const MyToggleDisplayYearHeadings = withState( {
			toggleControl: toggleDisplayYearHeadings,
		} )( ( { toggleControl, setState } ) => {

			setAttributes( {
				toggleDisplayYearHeadings: toggleControl,
			} );

			return (
				<Fragment>
					<ToggleControl
						label="Display Year Headings"
						help={ toggleControl ? 'Show Year Headings.' : 'Hide Year Headings.' }
						checked={ toggleControl }
						onChange={ () => setState( ( state ) => ( { toggleControl: ! state.toggleControl } ) ) }
					/>
					
				</Fragment>
			)
			
		} );

		const MySelectControlDisplayEvents = withState( {
			selectControl: selectDisplayEvents,
		} )( ( { selectControl, setState } ) => {

			setAttributes( {
				selectDisplayEvents: selectControl,
			} );

			return (
				<SelectControl
					label="Display Events"
					value={ selectControl }
					options={ [
						{ label: 'All', value: 'all' },
						{ label: 'Upcoming', value: 'upcoming' },
						{ label: 'Past', value: 'past' },
					] }
					onChange={ ( selectControl ) => { setState( { selectControl } ) } }
				/>
			)
		} );
        
        return (
        	<Fragment>
        		<InspectorControls>
					<PanelBody title="Event Listing Settings">
						<MySelectControlDisplayEvents/>
						<MySelectControlTaxonomyTerm/>

						<MyToggleDisplayMonthHeadings/>
						<MyToggleDisplayYearHeadings/>
						
					
					</PanelBody>
        		</InspectorControls>
        		<Placeholder label="Event Listing" className={className}>
					<PanelBody>
						
						<MySelectControlDisplayEvents/>
                        <MySelectControlTaxonomyTerm/>

					</PanelBody>
				</Placeholder>
        	</Fragment>
        );
    } ),

    save: function() {
        return null;
    },
} );