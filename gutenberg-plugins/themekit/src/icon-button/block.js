/**
 * BLOCK: icon link/button - uses FONT AWESOME
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { TextControl, PanelBody, ColorPalette,  ToggleControl, SelectControl} = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, getColorClassName, getColorObjectByColorValue, } = wp.blockEditor;
const { decodeEntities } = wp.htmlEntities;
const { withState } = wp.compose;
const { withSelect, select } = wp.data;

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
registerBlockType( 'cgb/icon-button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon: Button' ), // Block title.
	icon: 'button', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon' ),
		__( 'link' ),
		__( 'button' ),
	],
	supports: {
		align:true
	},
	styles: [
		{
			name: 'default',
			label: __( 'Default', "cgb" ),
			isDefault: true
		},
		{
			name: 'icon-fill',
			label: __( 'Fill', "cgb" )
		},
		{
			name: 'icon-no-fill',
			label: __( 'No Fill', "cgb" )
		},
	],
	attributes: {
		iconLabel: {
			type: 'string',
			default: 'Icon Display',
		},
		iconUnicode: {
			type: 'string',
			default: 'e04b',
		},
		iconColor: {
			type: 'string',
			default: '#818181',
		},
		iconColorClass: {
			type: 'string',
			default: 'has-theme-primary-color',
		},
		iconSize: {
			type: 'string',
			default: 'is-style-icon-md',
		},
		iconContentClass: {
			type: 'string',
			default: 'fas',
		},
		linkHref: {
			type: 'string',
			default: '#',
		},
		linkTarget: {
			type: 'string',
			default: '_self',
		},
		linkText: {
			type: 'string',
			default: 'Link Text'
		},
		displayText: {
			type: 'string',
			default: 'Link Text'
		},
		toggleLink: {
			type: 'boolean',
			default: false,
		},
		toggleTarget: {
			type: 'boolean',
			default: false,
		},
		toggleOffsetTop: {
			type: 'boolean',
			default: false,
		},
		classOffsetTop: {
			type: 'string',
			default: ''
		},

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
				iconLabel,
				iconUnicode,
				iconColor,
				iconColorClass,
				iconSize,
				iconContentClass,
				linkHref,
				linkTarget,
				linkText,
				displayText,
				toggleLink,
				toggleTarget,
				toggleOffsetTop,
				classOffsetTop

			},
			className,
			setAttributes,
		} = props;

		const MyColorPalette = withState( {
			color: iconColor,
		} )( ( { color, setState } ) => {
			
			// use theme color palette
			const colors = select( 'core/editor' ).getEditorSettings().colors;
			const settings = select( 'core/editor' ).getEditorSettings().colors;
			const colorObject = getColorObjectByColorValue( settings, color );

			if ( colorObject !== undefined ) {
				setAttributes( {
					iconColorClass: getColorClassName( 'color', colorObject.slug ),
				} );
			}

			setAttributes( {
				iconColor: color,
			} );
		 
			return (
				<ColorPalette
					colors={ colors }
					value={ color }
					onChange={ ( color ) => setState( { color } ) }
				/>
			)
		} );

		const MySelectControlIconFAClass = withState( {
			contentClass: iconContentClass,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconContentClass: contentClass,
			} );
			return(
				<SelectControl
					label="Icon Unicode Style Class"
					value={ contentClass }
					options={ [
						{ label: 'Solid', value: 'fas' },
						{ label: 'Regular', value: 'far' },
						{ label: 'Light', value: 'fal' },
						{ label: 'Duotone', value: 'fad' },
						{ label: 'Brands', value: 'fab' },
					] }
					onChange={ ( contentClass ) => { setState( { contentClass } ) } }
				/>
			)
		} );

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

		const MyToggleControlOffsetTop = withState( {
			toggleOption: toggleOffsetTop,
		} )( ( { toggleOption, setState } ) => {

			setAttributes( {
				toggleOffsetTop: toggleOption,
			} );

			if (toggleOffsetTop == true){
				setAttributes( {
					classOffsetTop: 'is-style-offset-top',
				} );
			} else{
				setAttributes( {
					classOffsetTop: '',
				} );
			}
			return(
				<ToggleControl
					label="Offset Top"
					help={ toggleOption ? 'Offset Top.' : 'No Offset.' }
					checked={ toggleOption }
					onChange={ () => setState( ( state ) => ( { toggleOption: ! state.toggleOption } ) ) }
				/>
			)
		} );

		const MyToggleControlLink = withState( {
			toggleOption: toggleLink,
		} )( ( { toggleOption, setState } ) => {

			setAttributes( {
				toggleLink: toggleOption,
			} );

			if (toggleLink == false){
				setAttributes( {
					displayText: '',
				} );
			} else{
				setAttributes( {
					displayText: linkText,
				} );
			}
			return(
				<ToggleControl
					label="Link"
					help={ toggleOption ? 'Link is currently active.' : 'Link disabled.' }
					checked={ toggleOption }
					onChange={ () => setState( ( state ) => ( { toggleOption: ! state.toggleOption } ) ) }
				/>
			)
		} );

		const MyToggleControlTarget = withState( {
			toggleOption: toggleTarget,
		} )( ( { toggleOption, setState } ) => {

			setAttributes( {
				toggleTarget: toggleOption,
			} );

			if (toggleTarget == true){
				setAttributes( {
					linkTarget: '_blank',
				} );
			} else {
				setAttributes( {
					linkTarget: '_self',
				} );
			}

			return(
				<ToggleControl
					label="Link Target"
					help={ toggleOption ? 'Open a new window.' : 'Open in same window.' }
					checked={ toggleOption }
					onChange={ () => setState( ( state ) => ( { toggleOption: ! state.toggleOption } ) ) }
				/>
			)
		} );


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon Options', 'themekit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">								
								<TextControl
									label="Icon Label"
									value={ iconLabel }
									onChange={ ( iconLabel ) => setAttributes( { iconLabel } ) }
									help="Required.  This is used for AODA/SEO, ensure it is short and contextual."
								/>
								<TextControl
									label="Icon Unicode"
									value={ iconUnicode }
									onChange={ ( iconUnicode ) => setAttributes( { iconUnicode } ) }
									help="example: f1ab"
								/>
								<MySelectControlIconFAClass/>
								
							</div>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Icon Styles', 'themekit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">

								<MyToggleControlOffsetTop/>		
								{classOffsetTop}						
								
								{ __( 'Icon Colour', 'themekit' ) }
								<MyColorPalette/>
								<TextControl
									label="Icon Colour Value"
									value={ iconColor }
									onChange={ ( iconColor ) => setAttributes( { iconColor } ) }
									help="Use color palette, or enter manually."
								/>
								<MySelectControl/>
							</div>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Icon Link Options', 'themekit' ) }
						initialOpen={ true }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
								
								<MyToggleControlLink/>

								<TextControl
									label="Link href"
									value={ linkHref }
									onChange={ ( linkHref ) => setAttributes( { linkHref } ) }
								/>

								<MyToggleControlTarget/>
								
								<TextControl
									label="Link text"
									value={ linkText }
									onChange={ ( linkText ) => setAttributes( { linkText } ) }
								/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				
				
				<div className={ `${ className } ${ iconSize } ${ iconColorClass } ${ classOffsetTop }` }>
					<div className={"icon-button"}>
						<i className={ `fa ${iconContentClass}` }>
							<span className="sr-only">{ iconLabel }</span>{ decodeEntities(`&#x${iconUnicode};`)}
						</i>
						{ displayText }
					</div>
				</div>
			</Fragment>
		);

		/* depricated -
		<div className={ `${ className } ${ iconSize } ${ iconColorClass }` }>
					<div className={"icon-button"} style={ {color: `${ iconColor }`} }>
						<i className="fa fas" style={ {color: `${ iconColor }`,backgroundColor: `${ iconColor }`,borderColor: `${ iconColor }`,} }>
							<span className="sr-only">{ iconLabel }</span>{ decodeEntities(`&#x${iconUnicode};`)}
						</i>
						{ displayText }
					</div>
				</div>*/
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
				iconLabel,
				iconUnicode,
				iconColor,
				iconColorClass,
				iconSize,
				iconContentClass,
				linkHref,
				linkTarget,
				linkText,
				toggleLink,
				classOffsetTop
			},
			className,
		} = props;
		if (toggleLink == true){
			return (
				<div className={ `${ className } ${ iconSize } ${ iconColorClass } ${ classOffsetTop }` }>
					<a className="icon-button" href={ linkHref } target={ linkTarget } rel="noopener noreferrer">
						<i className={ `fa ${iconContentClass}` } ><span className="sr-only">{ iconLabel }</span>{ decodeEntities(`&#x${iconUnicode};`)}</i>
						{ linkText }
					</a>
				</div>
			);
		} else {
			return (
				<div className={ `${ className } ${ iconSize } ${ iconColorClass } ${ classOffsetTop }` }>
					<div className="icon-button link-disabled">
						<i className={ `fa ${iconContentClass}` } ><span className="sr-only">{ iconLabel }</span>{ decodeEntities(`&#x${iconUnicode};`)}</i>
					</div>
				</div>
			);
		}
		
	},
} );
