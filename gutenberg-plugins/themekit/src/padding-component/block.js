/**
 * BLOCK: themekit
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { TextareaControl} = wp.components;
const { decodeEntities } = wp.htmlEntities;

import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

const { assign } = lodash;


export function addAttribute( settings ) {
    // If this is a valid block
    //if ( isValidBlockType( settings.name ) ) {
        // Use Lodash's assign to gracefully handle if attributes are undefined
        settings.attributes = assign( settings.attributes, {
			paddingTop:{
				type: 'string',
				default: '1rem'
			},
			paddingLeft:{
				type: 'string',
				default: '1rem'
			},
			paddingRight:{
				type: 'string',
				default: '1rem'
			},
			paddingBottom:{
				type: 'string',
				default: '1rem'
            },
        } );
    //}
    return settings;
}// end addAttribute()
wp.hooks.addFilter( 'blocks.registerBlockType', 'core/latest-posts', addAttribute );

const withInspectorControls =  createHigherOrderComponent( ( BlockEdit ) => {
	

    return ( props ) => {
		const { attributes: {  paddingTop }, setAttributes, className } = props;

		const MySelectControl = withState( {
			size: iconSize,
		} )( ( { size, setState } ) => {
			setAttributes( {
				iconSize: size,
			} );
			return(
				<SelectControl
					label="Size"
					value={ size }
					options={ [
						{ label: 'Default', value: 'is-style-icon-md' },
						{ label: 'Large', value: 'is-style-icon-lg' },
					] }
					onChange={ ( size ) => { setState( { size } ) } }
				/>
			)
		} );

		const Example = () => {
			const [ values, setValues ] = useState( {
				top: paddingTop,
				left: '1px',
				right: '1px',
				bottom: '1px',
			} );

			setAttributes({
				paddingTop: top,
			})
		
				return (
						<BoxControl
							values={ values }
							onChange={ ( nextValues ) => setValues( nextValues ) }
						/>
				);
			
		};

		

		console.log(paddingTop);

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <PanelBody>
                        <Example/>
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, "withInspectorControl" );
 
wp.hooks.addFilter( 'editor.BlockEdit', 'core/heading', withInspectorControls );





/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/test-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Test' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'place' ),
		__( 'holder' ),
		__( 'default' ),
	],
	attributes: {
		align: {
			type: 'string',
			default: ''
		},
		style: {
			type: 'object',
			default: {
				color: {
					background: 'value',
					gradient: 'value',
					text: 'value'
				}
			}
		},
		backgroundColor: {
			type: 'string',
			default: 'some-value',
		},
		gradient: {
			type: 'string',
			default: 'some-value',
		},
		textColor: {
			type: 'string',
			default: 'some-value',
		}
	},
	supports: {
		anchor: true,
		align: true,
		color: { // Text UI control is enabled.
			background: false, // Disable background UI control.
			gradient: true // Enable gradients UI control.
		}
	},
	

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const {
			attributes: {
				textArea,
				style,
				backgroundColor,
				textColor
			},
			className,
			setAttributes,
		} = props;
 
		const Example = () => {
			const [ values, setValues ] = useState( {
				top: '50px',
				left: '10%',
				right: '10%',
				bottom: '50px',
			} );
		
			return (
					<BoxControl
						values={ values }
						onChange={ ( nextValues ) => setValues( nextValues ) }
					/>
			);
		};

		console.log( 'My message' )
		return (
			
					
			<div className={ `${className} alert alert-success` }>
				<InspectorControls>
					<Example/>
				</InspectorControls>
				<h4 class="alert-heading"><i className="fa fas"><span className="sr-only">Under construction</span>{ decodeEntities(`&#xf85d;`)}</i>Constructing </h4>
				<p>
					<TextareaControl
						label="Notes"
						value={ textArea}
						onChange={ ( textArea ) => setAttributes( { textArea } ) }
					/>
					
				</p>
				<hr/>
				<p class="mb-0">Note: development in progress.</p>
			</div>
		);

		/**
		 * 
		 */
		/*
		<div class="alert alert-success" role="alert">
			<h4 class="alert-heading">Well done!</h4>
			<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
			<hr>
			<p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
			</div>
			*/
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const {
			attributes: {
				textArea,
			},
			className,
		} = props;
		return (
			<div className={ `${className} alert alert-success` }>
				<h4 class="alert-heading"><i className="fa fas"><span className="sr-only">Under construction</span>{ decodeEntities(`&#xf85d;`)}</i>Constructing </h4>
				<p>
					{textArea}
				</p>
				<hr/>
				<p class="mb-0">Note: development in progress.</p>
			</div>
		);
	},
} );
