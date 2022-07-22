/**
 * BLOCK: accordion
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls, BlockIcon } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl, Placeholder, SelectControl } = wp.components;
const { withState } = wp.compose;
const { Fragment } = wp.element;
const { withSelect, select, dispatch } = wp.data;
const { decodeEntities } = wp.htmlEntities;



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
registerBlockType( 'cgb/icon-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon: Tabs Circle' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon' ),
		__( 'carousel' ),
		__( 'toggle' ),
	],
	attributes: {
		uniqueId_1:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_1:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_1:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_1:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_1: {
            type:'boolean',
            default: true,
		},
		uniqueId_2:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_2:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_2:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_2:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_2: {
            type:'boolean',
            default: true,
		},
		uniqueId_3:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_3:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_3:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_3:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_3: {
            type:'boolean',
            default: true,
		},
		uniqueId_4:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_4:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_4:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_4:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_4: {
            type:'boolean',
            default: true,
		},
		uniqueId_5:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_5:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_5:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_5:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_5: {
            type:'boolean',
            default: true,
		},
		uniqueId_6:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_6:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_6:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_6:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_6: {
            type:'boolean',
            default: true,
		},
		uniqueId_7:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_7:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_7:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_7:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_7: {
            type:'boolean',
            default: true,
		},
		uniqueId_8:{
			type: 'string',
			default: 'unique-label'
		},
		textArea_8:{
			type: 'string',
			default: 'Enter active text here',
		},
		iconUnicode_8:{
			type: 'string',
			default: 'f1ab',
		},
	    uniqueLabel_8:{
			type: 'string',
			default: 'Unique Label'
		},
		panelOpen_8: {
            type:'boolean',
            default: true,
		},
		iconClass_1: {
            type:'string',
            default: 'fas',
		},
		iconClass_2: {
            type:'string',
            default: 'fas',
		},
		iconClass_3: {
            type:'string',
            default: 'fas',
		},
		iconClass_4: {
            type:'string',
            default: 'fas',
		},
		iconClass_5: {
            type:'string',
            default: 'fas',
		},
		iconClass_6: {
            type:'string',
            default: 'fas',
		},
		iconClass_7: {
            type:'string',
            default: 'fas',
		},
		iconClass_8: {
            type:'string',
            default: 'fas',
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
				uniqueId_1,
				textArea_1,
				iconUnicode_1, 
				uniqueLabel_1,
				panelOpen_1,
				uniqueId_2,
				textArea_2,
				iconUnicode_2, 
				uniqueLabel_2,
				panelOpen_2,
				uniqueId_3,
				textArea_3,
				iconUnicode_3, 
				uniqueLabel_3,
				panelOpen_3,
				uniqueId_4,
				textArea_4,
				iconUnicode_4, 
				uniqueLabel_4,
				panelOpen_4,
				uniqueId_5,
				textArea_5,
				iconUnicode_5, 
				uniqueLabel_5,
				panelOpen_5,
				uniqueId_6,
				textArea_6,
				iconUnicode_6, 
				uniqueLabel_6,
				panelOpen_6,
				uniqueId_7,
				textArea_7,
				iconUnicode_7, 
				uniqueLabel_7,
				panelOpen_7,
				uniqueId_8,
				textArea_8,
				iconUnicode_8, 
				uniqueLabel_8,
				panelOpen_8,
				iconClass_1,
				iconClass_2,
				iconClass_3,
				iconClass_4,
				iconClass_5,
				iconClass_6,
				iconClass_7,
				iconClass_8,

			},
			className,
			setAttributes,
			clientId,
		} = props;

		/*const TEMPLATE = [
			['cgb/icon-circle-container', {}],
			['cgb/icon-circle-tab-content-container', {}],
			
		];*/

		// set the text value.
		const onTextControl_1 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_1: value,
				uniqueId_1: temp_id,
			} );
		};
		const onTextControl_2 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_2: value,
				uniqueId_2: temp_id,
			} );
		};
		const onTextControl_3 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_3: value,
				uniqueId_3: temp_id,
			} );
		};
		const onTextControl_4 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_4: value,
				uniqueId_4: temp_id,
			} );
		};
		const onTextControl_5 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_5: value,
				uniqueId_5: temp_id,
			} );
		};
		const onTextControl_6 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_6: value,
				uniqueId_6: temp_id,
			} );
		};
		const onTextControl_7 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_7: value,
				uniqueId_7: temp_id,
			} );
		};
		const onTextControl_8 = value => {
			var temp_id = value.replace(/\s/g, '-').replace(/[^a-zA-Z ]/g, '').toLowerCase();
			setAttributes( {
				uniqueLabel_8: value,
				uniqueId_8: temp_id,
			} );
		};
		const MySelectControlIconFAClass_1 = withState( {
			contentClass: iconClass_1,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_1: contentClass,
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
		const MySelectControlIconFAClass_2 = withState( {
			contentClass: iconClass_2,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_2: contentClass,
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
		const MySelectControlIconFAClass_3 = withState( {
			contentClass: iconClass_3,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_3: contentClass,
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
		const MySelectControlIconFAClass_4 = withState( {
			contentClass: iconClass_4,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_4: contentClass,
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
		const MySelectControlIconFAClass_5 = withState( {
			contentClass: iconClass_5,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_5: contentClass,
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
		const MySelectControlIconFAClass_6 = withState( {
			contentClass: iconClass_6,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_6: contentClass,
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
		const MySelectControlIconFAClass_7 = withState( {
			contentClass: iconClass_7,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_7: contentClass,
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
		const MySelectControlIconFAClass_8 = withState( {
			contentClass: iconClass_8,
		} )( ( { contentClass, setState } ) => {
			setAttributes( {
				iconClass_8: contentClass,
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
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ `Icon Tab 1: ${uniqueLabel_1}`}
						initialOpen={ panelOpen_1 }
						onToggle={ ( val ) => setAttributes( { panelOpen_1: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_1 }
							onChange={ onTextControl_1 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_1 }
							onChange={ ( iconUnicode_1 ) => setAttributes( { iconUnicode_1 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_1/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_1}
							onChange={ ( textArea_1 ) => setAttributes( { textArea_1 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 2: ${uniqueLabel_2}` }
						initialOpen={ panelOpen_2 }
						onToggle={ ( val ) => setAttributes( { panelOpen_2: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_2 }
							onChange={ onTextControl_2 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_2 }
							onChange={ ( iconUnicode_2 ) => setAttributes( { iconUnicode_2 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_2/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_2}
							onChange={ ( textArea_2 ) => setAttributes( { textArea_2 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 3: ${uniqueLabel_3}` }
						initialOpen={ panelOpen_3 }
						onToggle={ ( val ) => setAttributes( { panelOpen_3: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_3 }
							onChange={ onTextControl_3 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_3 }
							onChange={ ( iconUnicode_3 ) => setAttributes( { iconUnicode_3 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_3/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_3}
							onChange={ ( textArea_3 ) => setAttributes( { textArea_3 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 4: ${uniqueLabel_4}` }
						initialOpen={ panelOpen_4 }
						onToggle={ ( val ) => setAttributes( { panelOpen_4: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_4 }
							onChange={ onTextControl_4 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_4 }
							onChange={ ( iconUnicode_4 ) => setAttributes( { iconUnicode_4 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_4/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_4}
							onChange={ ( textArea_4 ) => setAttributes( { textArea_4 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 5: ${uniqueLabel_5}` }
						initialOpen={ panelOpen_5 }
						onToggle={ ( val ) => setAttributes( { panelOpen_5: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_5 }
							onChange={ onTextControl_5 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_5 }
							onChange={ ( iconUnicode_5 ) => setAttributes( { iconUnicode_5 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_5/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_5}
							onChange={ ( textArea_5 ) => setAttributes( { textArea_5 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 6: ${uniqueLabel_6}` }
						initialOpen={ panelOpen_6 }
						onToggle={ ( val ) => setAttributes( { panelOpen_6: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_6 }
							onChange={ onTextControl_6 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_6 }
							onChange={ ( iconUnicode_6 ) => setAttributes( { iconUnicode_6 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_6/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_6}
							onChange={ ( textArea_6 ) => setAttributes( { textArea_6 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 7: ${uniqueLabel_7}` }
						initialOpen={ panelOpen_7 }
						onToggle={ ( val ) => setAttributes( { panelOpen_7: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_7 }
							onChange={ onTextControl_7 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_7 }
							onChange={ ( iconUnicode_7 ) => setAttributes( { iconUnicode_7 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_7/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_7}
							onChange={ ( textArea_7 ) => setAttributes( { textArea_7 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
					<PanelBody
						title={ `Icon Tab 8: ${uniqueLabel_8}` }
						initialOpen={ panelOpen_8 }
						onToggle={ ( val ) => setAttributes( { panelOpen_8: false } ) }
					>
						<TextControl
							label="Icon Label"
							value={ uniqueLabel_8 }
							onChange={ onTextControl_8 }
							help="Required.  This is used for AODA, ensure it is unique and contextual (icon description). Do not use special characters."
						/>
						<TextControl
							label="FontAwesome Icon Unicode"
							value={ iconUnicode_8 }
							onChange={ ( iconUnicode_8 ) => setAttributes( { iconUnicode_8 } ) }
							help="example: f1ab"
						/>
						<MySelectControlIconFAClass_8/>
						<TextareaControl
							label="Tab Pane Content"
							value={ textArea_8}
							onChange={ ( textArea_8 ) => setAttributes( { textArea_8 } ) }
							help="This is the text which appears in the center upon trigger."
						/>
					</PanelBody>
				</InspectorControls>

				<div className={`${props.className} wrapper`}>
					<ul className="circle-container nav-tabs" role="tablist">
						<li className="nav-item">
							<a className="nav-link active" id={`${uniqueId_1}-tab`} data-toggle="tab" href={`#${uniqueId_1}`} role="tab" aria-controls={uniqueId_1} aria-selected="true">
								<i className={`fa ${iconClass_1}`}><span className="sr-only">{ uniqueLabel_1 }</span>{ decodeEntities(`&#x${iconUnicode_1};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_2}-tab`} data-toggle="tab" href={`#${uniqueId_2}`} role="tab" aria-controls={uniqueId_2} aria-selected="false">
								<i className={`fa ${iconClass_2}`}><span className="sr-only">{ uniqueLabel_2 }</span>{ decodeEntities(`&#x${iconUnicode_2};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_3}-tab`} data-toggle="tab" href={`#${uniqueId_3}`} role="tab" aria-controls={uniqueId_3} aria-selected="false">
								<i className={`fa ${iconClass_3}`}><span className="sr-only">{ uniqueLabel_3 }</span>{ decodeEntities(`&#x${iconUnicode_3};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_4}-tab`} data-toggle="tab" href={`#${uniqueId_4}`} role="tab" aria-controls={uniqueId_4} aria-selected="false">
								<i className={`fa ${iconClass_4}`}><span className="sr-only">{ uniqueLabel_4 }</span>{ decodeEntities(`&#x${iconUnicode_4};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_5}-tab`} data-toggle="tab" href={`#${uniqueId_5}`} role="tab" aria-controls={uniqueId_5} aria-selected="false">
								<i className={`fa ${iconClass_5}`}><span className="sr-only">{ uniqueLabel_5 }</span>{ decodeEntities(`&#x${iconUnicode_5};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_6}-tab`} data-toggle="tab" href={`#${uniqueId_6}`} role="tab" aria-controls={uniqueId_6} aria-selected="false">
								<i className={`fa ${iconClass_6}`}><span className="sr-only">{ uniqueLabel_6 }</span>{ decodeEntities(`&#x${iconUnicode_6};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_7}-tab`} data-toggle="tab" href={`#${uniqueId_7}`} role="tab" aria-controls={uniqueId_7} aria-selected="false">
								<i className={`fa ${iconClass_7}`}><span className="sr-only">{ uniqueLabel_7 }</span>{ decodeEntities(`&#x${iconUnicode_7};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_8}-tab`} data-toggle="tab" href={`#${uniqueId_8}`} role="tab" aria-controls={uniqueId_8} aria-selected="false">
								<i className={`fa ${iconClass_8}`}><span className="sr-only">{ uniqueLabel_8 }</span>{ decodeEntities(`&#x${iconUnicode_8};`)}</i>
							</a>
						</li>
					</ul>
					
					<p className="tab-pane fade active show has-lead-font-size has-text-align-center" id={uniqueId_1} role="tabpanel" aria-labelledby={`${uniqueId_1}-tab`}>{textArea_1}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_2} role="tabpanel" aria-labelledby={`${uniqueId_2}-tab`}>{textArea_2}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_3} role="tabpanel" aria-labelledby={`${uniqueId_3}-tab`}>{textArea_3}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_4} role="tabpanel" aria-labelledby={`${uniqueId_4}-tab`}>{textArea_4}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_5} role="tabpanel" aria-labelledby={`${uniqueId_5}-tab`}>{textArea_5}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_6} role="tabpanel" aria-labelledby={`${uniqueId_6}-tab`}>{textArea_6}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_7} role="tabpanel" aria-labelledby={`${uniqueId_7}-tab`}>{textArea_7}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_8} role="tabpanel" aria-labelledby={`${uniqueId_8}-tab`}>{textArea_8}</p>
				</div>
			</Fragment>
		);
		/*return (
			<div className="wrapper">
				<ul className="circle-container">
					<li><a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><i className="fa fas fa-language"><span className="sr-only"></span></i></li>
				</ul>
				<p class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">testing paragraph content 1</p>
				<p class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">testing paragraph content 2</p>
			</div>
		);*/
		/*return (
			<Placeholder icon={ <BlockIcon icon="screenoptions" showColors /> } label="Icon Circle Tabs" className={`${className} wrapper`} isColumnLayout="true">
				<InnerBlocks template={ TEMPLATE } allowedBlocks="cgb/icon-carousel-template"/>
			</Placeholder>
		);*/
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
				uniqueId_1,
				textArea_1,
				iconUnicode_1, 
				uniqueLabel_1,
				uniqueId_2,
				textArea_2,
				iconUnicode_2, 
				uniqueLabel_2,
				uniqueId_3,
				textArea_3,
				iconUnicode_3, 
				uniqueLabel_3,
				uniqueId_4,
				textArea_4,
				iconUnicode_4, 
				uniqueLabel_4,
				uniqueId_5,
				textArea_5,
				iconUnicode_5, 
				uniqueLabel_5,
				uniqueId_6,
				textArea_6,
				iconUnicode_6, 
				uniqueLabel_6,
				uniqueId_7,
				textArea_7,
				iconUnicode_7, 
				uniqueLabel_7,
				uniqueId_8,
				textArea_8,
				iconUnicode_8, 
				uniqueLabel_8,
				iconClass_1,
				iconClass_2,
				iconClass_3,
				iconClass_4,
				iconClass_5,
				iconClass_6,
				iconClass_7,
				iconClass_8,
				

			},
			className,
		} = props;



		return (
			<div className={`${props.className} wrapper`}>
					<ul className="circle-container nav-tabs" role="tablist">
						<li className="nav-item">
							<a className="nav-link active" id={`${uniqueId_1}-tab`} data-toggle="tab" href={`#${uniqueId_1}`} role="tab" aria-controls={uniqueId_1} aria-selected="true">
								<i className={`fa ${iconClass_1}`}><span className="sr-only">{ uniqueLabel_1 }</span>{ decodeEntities(`&#x${iconUnicode_1};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_2}-tab`} data-toggle="tab" href={`#${uniqueId_2}`} role="tab" aria-controls={uniqueId_2} aria-selected="false">
								<i className={`fa ${iconClass_2}`}><span className="sr-only">{ uniqueLabel_2 }</span>{ decodeEntities(`&#x${iconUnicode_2};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_3}-tab`} data-toggle="tab" href={`#${uniqueId_3}`} role="tab" aria-controls={uniqueId_3} aria-selected="false">
								<i className={`fa ${iconClass_3}`}><span className="sr-only">{ uniqueLabel_3 }</span>{ decodeEntities(`&#x${iconUnicode_3};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_4}-tab`} data-toggle="tab" href={`#${uniqueId_4}`} role="tab" aria-controls={uniqueId_4} aria-selected="false">
								<i className={`fa ${iconClass_4}`}><span className="sr-only">{ uniqueLabel_4 }</span>{ decodeEntities(`&#x${iconUnicode_4};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_5}-tab`} data-toggle="tab" href={`#${uniqueId_5}`} role="tab" aria-controls={uniqueId_5} aria-selected="false">
								<i className={`fa ${iconClass_5}`}><span className="sr-only">{ uniqueLabel_5 }</span>{ decodeEntities(`&#x${iconUnicode_5};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_6}-tab`} data-toggle="tab" href={`#${uniqueId_6}`} role="tab" aria-controls={uniqueId_6} aria-selected="false">
								<i className={`fa ${iconClass_6}`}><span className="sr-only">{ uniqueLabel_6 }</span>{ decodeEntities(`&#x${iconUnicode_6};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_7}-tab`} data-toggle="tab" href={`#${uniqueId_7}`} role="tab" aria-controls={uniqueId_7} aria-selected="false">
								<i className={`fa ${iconClass_7}`}><span className="sr-only">{ uniqueLabel_7 }</span>{ decodeEntities(`&#x${iconUnicode_7};`)}</i>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id={`${uniqueId_8}-tab`} data-toggle="tab" href={`#${uniqueId_8}`} role="tab" aria-controls={uniqueId_8} aria-selected="false">
								<i className={`fa ${iconClass_8}`}><span className="sr-only">{ uniqueLabel_8 }</span>{ decodeEntities(`&#x${iconUnicode_8};`)}</i>
							</a>
						</li>
					</ul>
					
					<p className="tab-pane fade active show has-lead-font-size has-text-align-center" id={uniqueId_1} role="tabpanel" aria-labelledby={`${uniqueId_1}-tab`}>{textArea_1}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_2} role="tabpanel" aria-labelledby={`${uniqueId_2}-tab`}>{textArea_2}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_3} role="tabpanel" aria-labelledby={`${uniqueId_3}-tab`}>{textArea_3}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_4} role="tabpanel" aria-labelledby={`${uniqueId_4}-tab`}>{textArea_4}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_5} role="tabpanel" aria-labelledby={`${uniqueId_5}-tab`}>{textArea_5}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_6} role="tabpanel" aria-labelledby={`${uniqueId_6}-tab`}>{textArea_6}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_7} role="tabpanel" aria-labelledby={`${uniqueId_7}-tab`}>{textArea_7}</p>
					<p className="tab-pane fade has-lead-font-size has-text-align-center" id={uniqueId_8} role="tabpanel" aria-labelledby={`${uniqueId_8}-tab`}>{textArea_8}</p>
					
				</div>
		);

		/*return (
			<div className="wrapper">
				<ul className="circle-container">
					<li><a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></a></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><img src='http://ixiasoft2.local/wp-content/uploads/2020/10/Semiconductors-150x150.jpg'/></li>
					<li><i className="fa fas fa-language"><span className="sr-only"></span></i></li>
				</ul>
				<p class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">testing paragraph content 1</p>
				<p class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">testing paragraph content 2</p>
			</div>
		);*/
		/*return (
			<div className={`${className} wrapper`}>
				<InnerBlocks.Content />
			</div>
		);*/
		
	},
} );


