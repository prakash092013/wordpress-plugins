/**
 * BLOCK: Pricing Packs
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { TextControl, PanelBody, ColorPalette, } = wp.components;
const { decodeEntities } = wp.htmlEntities;
const { Fragment } = wp.element;
const { InspectorControls, InnerBlocks, getColorClassName, getColorObjectByColorValue } = wp.blockEditor;
const { withState } = wp.compose;
const { select } = wp.data;

/**
 * Register: Pricing Card Pack.
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
registerBlockType( 'cgb/block-pricing-packs', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Pricing Pack' ), // Block title.
	icon: 'money', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: [ 'cgb/pricing-currency-content' ],
	keywords: [
		__( 'price' ),
		__( 'pricing' ),
		__( 'pack' ),
	],
	attributes: {
		cardOneIconUnicode: {
			type: 'string',
			default: 'e04b',
		},
		cardOneHeading:{
			type:'string',
		},
		cardOnePrefixText:{
			type:'string',
			default: 'starts at'
		},
		cardOnePrice:{
			type:'string',
			default: '$'
		},
		cardOneBillingTerm:{
			type:'string',
			default: '/month*',
		},
		cardOneAdditionalInfo:{
			type: 'string',
			default: '10 Advanced Users',
		},
		cardTwoIconUnicode: {
			type: 'string',
			default: 'e04b',
		},
		cardTwoHeading:{
			type:'string',
		},
		cardTwoPrefixText:{
			type:'string',
			default: 'starts at'
		},
		cardTwoPrice:{
			type:'string',
			default: '$'
		},
		cardTwoBillingTerm:{
			type:'string',
			default: '/month*',
		},
		cardTwoAdditionalInfo:{
			type: 'string',
			default: '10 Advanced Users',
		},
		cardThreeIconUnicode: {
			type: 'string',
			default: 'e04b',
		},
		cardThreeHeading:{
			type:'string',
		},
		cardThreePrefixText:{
			type:'string',
			default: 'starts at'
		},
		cardThreePrice:{
			type:'string',
			default: '$'
		},
		cardThreeBillingTerm:{
			type:'string',
			default: '/month*',
		},
		cardThreeAdditionalInfo:{
			type: 'string',
			default: '10 Advanced Users',
		},
		cardFourIconUnicode: {
			type: 'string',
			default: 'e04b',
		},
		cardFourHeading:{
			type:'string',
		},
		cardFourPrefixText:{
			type:'string',
			default: 'starts at'
		},
		cardFourPrice:{
			type:'string',
			default: '$'
		},
		cardFourBillingTerm:{
			type:'string',
			default: '/month*',
		},
		cardFourAdditionalInfo:{
			type: 'string',
			default: '10 Advanced Users',
		},
		iconColor:{
			type: 'string',
			default: '#23B24E',
		},
		iconColorClass:{
			type: 'string',
			default: 'has-eucalyptus-color'
		},
		priceTextClass:{
			type: 'string',
			default: 'has-extra-large-font-size'
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
				cardOneIconUnicode,
				cardOneHeading,
				cardOnePrefixText,
				cardOnePrice,
				cardOneBillingTerm,
				cardOneAdditionalInfo,
				cardTwoIconUnicode,
				cardTwoHeading,
				cardTwoPrefixText,
				cardTwoPrice,
				cardTwoBillingTerm,
				cardTwoAdditionalInfo,
				cardThreeIconUnicode,
				cardThreeHeading,
				cardThreePrefixText,
				cardThreePrice,
				cardThreeBillingTerm,
				cardThreeAdditionalInfo,
				cardFourIconUnicode,
				cardFourHeading,
				cardFourPrefixText,
				cardFourPrice,
				cardFourBillingTerm,
				cardFourAdditionalInfo,
				iconColor,
				iconColorClass,
				priceTextClass
			},
			className,
			setAttributes,
		} = props;

		
		/**
		 * icon color setting for block
		 */
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

		return (
			<Fragment>
				<InspectorControls>
				<PanelBody
						title={ __( 'Pricing Settings: Overall', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">

								<TextControl
									label="Price Size Class"
									value={ priceTextClass }
									help="has-extra-large-font-size | has-larger-font-size | has-lead-font-size | has-medium-font-size | has-intro-font-size | has-body-lead-font-size"
									onChange={ ( priceTextClass ) => setAttributes( { priceTextClass } ) }
								/>

								{ __( 'Icon Colour', 'themekit' ) }
								<MyColorPalette/>

							</div>
						</div>
					</PanelBody>

					<PanelBody
						title={ __( 'Pricing Settings: Card 1', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<TextControl
									label="Icon Unicode"
									value={ cardOneIconUnicode }
									onChange={ ( cardOneIconUnicode ) => setAttributes( { cardOneIconUnicode } ) }
								/>
								<TextControl
									label="Heading"
									value={ cardOneHeading }
									onChange={ ( cardOneHeading ) => setAttributes( { cardOneHeading } ) }
								/>
								<TextControl
									label="Prefix Text"
									value={ cardOnePrefixText }
									onChange={ ( cardOnePrefixText ) => setAttributes( { cardOnePrefixText } ) }
								/>
								<TextControl
									label="Price"
									value={ cardOnePrice }
									onChange={ ( cardOnePrice ) => setAttributes( {cardOnePrice } ) }
								/>
								<TextControl
									label="Billing Term"
									value={ cardOneBillingTerm }
									onChange={ ( cardOneBillingTerm ) => setAttributes( {cardOneBillingTerm } ) }
								/>
								<TextControl
									label="Additional Info"
									value={ cardOneAdditionalInfo }
									onChange={ ( cardOneAdditionalInfo ) => setAttributes( {cardOneAdditionalInfo } ) }
								/>
								
							</div>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Pricing Settings: Card 2', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<TextControl
									label="Icon Unicode"
									value={ cardTwoIconUnicode }
									onChange={ ( cardTwoIconUnicode ) => setAttributes( { cardTwoIconUnicode } ) }
								/>
								<TextControl
									label="Heading"
									value={ cardTwoHeading }
									onChange={ ( cardTwoHeading ) => setAttributes( { cardTwoHeading } ) }
								/>
								<TextControl
									label="Prefix Text"
									value={ cardTwoPrefixText }
									onChange={ ( cardTwoPrefixText ) => setAttributes( { cardTwoPrefixText } ) }
								/>
								<TextControl
									label="Price"
									value={ cardTwoPrice }
									onChange={ ( cardTwoPrice ) => setAttributes( {cardTwoPrice } ) }
								/>
								<TextControl
									label="Billing Term"
									value={ cardTwoBillingTerm }
									onChange={ ( cardTwoBillingTerm ) => setAttributes( {cardTwoBillingTerm } ) }
								/>
								<TextControl
									label="Additional Info"
									value={ cardTwoAdditionalInfo }
									onChange={ ( cardTwoAdditionalInfo ) => setAttributes( {cardTwoAdditionalInfo } ) }
								/>
								
							</div>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Pricing Settings: Card 3', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<TextControl
									label="Icon Unicode"
									value={ cardThreeIconUnicode }
									onChange={ ( cardThreeIconUnicode ) => setAttributes( { cardThreeIconUnicode } ) }
								/>
								<TextControl
									label="Heading"
									value={ cardThreeHeading }
									onChange={ ( cardThreeHeading ) => setAttributes( { cardThreeHeading } ) }
								/>
								<TextControl
									label="Prefix Text"
									value={ cardThreePrefixText }
									onChange={ ( cardThreePrefixText ) => setAttributes( { cardThreePrefixText } ) }
								/>
								<TextControl
									label="Price"
									value={ cardThreePrice }
									onChange={ ( cardThreePrice ) => setAttributes( {cardThreePrice } ) }
								/>
								<TextControl
									label="Billing Term"
									value={ cardThreeBillingTerm }
									onChange={ ( cardThreeBillingTerm ) => setAttributes( {cardThreeBillingTerm } ) }
								/>
								<TextControl
									label="Additional Info"
									value={ cardThreeAdditionalInfo }
									onChange={ ( cardThreeAdditionalInfo ) => setAttributes( {cardThreeAdditionalInfo } ) }
								/>
								
							</div>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Pricing Settings: Card 4', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<TextControl
									label="Icon Unicode"
									value={ cardFourIconUnicode }
									onChange={ ( cardFourIconUnicode ) => setAttributes( { cardFourIconUnicode } ) }
								/>
								<TextControl
									label="Heading"
									value={ cardFourHeading }
									onChange={ ( cardFourHeading ) => setAttributes( { cardFourHeading } ) }
								/>
								<TextControl
									label="Prefix Text"
									value={ cardFourPrefixText }
									onChange={ ( cardFourPrefixText ) => setAttributes( { cardFourPrefixText } ) }
								/>
								<TextControl
									label="Price"
									value={ cardFourPrice }
									onChange={ ( cardFourPrice ) => setAttributes( {cardFourPrice } ) }
								/>
								<TextControl
									label="Billing Term"
									value={ cardFourBillingTerm }
									onChange={ ( cardFourBillingTerm ) => setAttributes( {cardFourBillingTerm } ) }
								/>
								<TextControl
									label="Additional Info"
									value={ cardFourAdditionalInfo }
									onChange={ ( cardFourAdditionalInfo ) => setAttributes( {cardFourAdditionalInfo } ) }
								/>
								
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ `${className}` }>
					<div className="row">
						<div className="col-sm-6 col-lg-3">
							<div className="wp-block-group has-theme-white-background-color has-background">
								<div className="wp-block-group__inner-container">
									
									<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
										<div className="icon-button link-disabled">
											<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardOneIconUnicode};`)}</i>
										</div>
									</div>

									<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardOneHeading}</span></h3>

									<div className="has-theme-light-background-color">
										<p className="has-text-align-center mb-0">{ cardOnePrefixText }</p>
										<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardOnePrice }</span></p>
										<p className="has-text-align-center mb-0">{ cardOneBillingTerm }</p>
									</div>

									<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardOneAdditionalInfo }</p>
								</div>
							</div>
						</div>

						<div className="col-sm-6 col-lg-3">
							<div className="wp-block-group has-theme-white-background-color has-background">
								<div className="wp-block-group__inner-container">
									
									<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
										<div className="icon-button link-disabled">
											<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardTwoIconUnicode};`)}</i>
										</div>
									</div>

									<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardTwoHeading}</span></h3>

									<div className="has-theme-light-background-color">
										<p className="has-text-align-center mb-0">{ cardTwoPrefixText }</p>
										<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardTwoPrice }</span></p>
										<p className="has-text-align-center mb-0">{ cardTwoBillingTerm }</p>
									</div>

									<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardTwoAdditionalInfo }</p>
								</div>
							</div>
						</div>

						<div className="col-sm-6 col-lg-3">
							<div className="wp-block-group has-theme-white-background-color has-background">
								<div className="wp-block-group__inner-container">
									
									<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
										<div className="icon-button link-disabled">
											<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardThreeIconUnicode};`)}</i>
										</div>
									</div>

									<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardThreeHeading}</span></h3>

									<div className="has-theme-light-background-color">
										<p className="has-text-align-center mb-0">{ cardThreePrefixText }</p>
										<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardThreePrice }</span></p>
										<p className="has-text-align-center mb-0">{ cardThreeBillingTerm }</p>
									</div>

									<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardThreeAdditionalInfo }</p>
								</div>
							</div>
						</div>

						<div className="col-sm-6 col-lg-3">
							<div className="wp-block-group has-theme-white-background-color has-background">
								<div className="wp-block-group__inner-container">
									
									<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
										<div className="icon-button link-disabled">
											<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardFourIconUnicode};`)}</i>
										</div>
									</div>

									<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardFourHeading}</span></h3>

									<div className="has-theme-light-background-color">
										<p className="has-text-align-center mb-0">{ cardFourPrefixText }</p>
										<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardFourPrice }</span></p>
										<p className="has-text-align-center mb-0">{ cardFourBillingTerm }</p>
									</div>

									<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardFourAdditionalInfo }</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</Fragment>
		);

		
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
				cardOneIconUnicode,
				cardOneHeading,
				cardOnePrefixText,
				cardOnePrice,
				cardOneBillingTerm,
				cardOneAdditionalInfo,
				cardTwoIconUnicode,
				cardTwoHeading,
				cardTwoPrefixText,
				cardTwoPrice,
				cardTwoBillingTerm,
				cardTwoAdditionalInfo,
				cardThreeIconUnicode,
				cardThreeHeading,
				cardThreePrefixText,
				cardThreePrice,
				cardThreeBillingTerm,
				cardThreeAdditionalInfo,
				cardFourIconUnicode,
				cardFourHeading,
				cardFourPrefixText,
				cardFourPrice,
				cardFourBillingTerm,
				cardFourAdditionalInfo,
				iconColorClass,
				priceTextClass,
			},
			className,
		} = props;
		return (
			<div className={ `${className}` }>
				<div className="row">
					<div className="col-sm-6 col-lg-3">
						<div className="wp-block-group has-theme-white-background-color has-background">
							<div className="wp-block-group__inner-container">
								
								<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
									<div className="icon-button link-disabled">
										<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardOneIconUnicode};`)}</i>
									</div>
								</div>

								<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardOneHeading}</span></h3>

								<div className="has-theme-light-background-color">
									<p className="has-text-align-center mb-0">{ cardOnePrefixText }</p>
									<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardOnePrice }</span></p>
									<p className="has-text-align-center mb-0">{ cardOneBillingTerm }</p>
								</div>

								<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardOneAdditionalInfo }</p>
							</div>
						</div>
					</div>

					<div className="col-sm-6 col-lg-3">
						<div className="wp-block-group has-theme-white-background-color has-background">
							<div className="wp-block-group__inner-container">
								
								<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
									<div className="icon-button link-disabled">
										<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardTwoIconUnicode};`)}</i>
									</div>
								</div>

								<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardTwoHeading}</span></h3>

								<div className="has-theme-light-background-color">
									<p className="has-text-align-center mb-0">{ cardTwoPrefixText }</p>
									<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardTwoPrice }</span></p>
									<p className="has-text-align-center mb-0">{ cardTwoBillingTerm }</p>
								</div>

								<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardTwoAdditionalInfo }</p>
							</div>
						</div>
					</div>

					<div className="col-sm-6 col-lg-3">
						<div className="wp-block-group has-theme-white-background-color has-background">
							<div className="wp-block-group__inner-container">
								
								<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
									<div className="icon-button link-disabled">
										<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardThreeIconUnicode};`)}</i>
									</div>
								</div>

								<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardThreeHeading}</span></h3>

								<div className="has-theme-light-background-color">
									<p className="has-text-align-center mb-0">{ cardThreePrefixText }</p>
									<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardThreePrice }</span></p>
									<p className="has-text-align-center mb-0">{ cardThreeBillingTerm }</p>
								</div>

								<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardThreeAdditionalInfo }</p>
							</div>
						</div>
					</div>

					<div className="col-sm-6 col-lg-3">
						<div className="wp-block-group has-theme-white-background-color has-background">
							<div className="wp-block-group__inner-container">
								
								<div className={`wp-block-cgb-icon-button is-style-icon-md ${iconColorClass} is-style-offset-top is-style-icon-fill`}>
									<div className="icon-button link-disabled">
										<i className="fa fas"><span className="sr-only">Icon Display</span>{ decodeEntities(`&#x${cardFourIconUnicode};`)}</i>
									</div>
								</div>

								<h3 className="has-text-align-center has-body-lead-font-size mb-3 has-theme-dark-color"><span className="is-style-all-caps">{cardFourHeading}</span></h3>

								<div className="has-theme-light-background-color">
									<p className="has-text-align-center mb-0">{ cardFourPrefixText }</p>
									<p className={`has-text-align-center ${priceTextClass} mb-0`}><span className={`has-inline-color ${iconColorClass} price`}>{ cardFourPrice }</span></p>
									<p className="has-text-align-center mb-0">{ cardFourBillingTerm }</p>
								</div>

								<p className="has-text-align-center mb-0 mt-3 has-theme-dark-color">{ cardFourAdditionalInfo }</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	},
} );


/**
 * Register: Select Currency Option.
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
registerBlockType( 'cgb/pricing-currency-selector', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Pricing Currency Selector' ), // Block title.
	icon: 'list-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'currency' ),
		__( 'selector' ),
		__( 'price' ),
		__( 'pricing' ),
	],
	attributes: {
		selectLabel: {
			type: 'string',
			default:'Currency: ',
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
				selectLabel,
				
			},
			className,
			setAttributes,
		} = props;

		

		return(
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Select Label: ', 'blockkit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<TextControl
									label="Select Label"
									value={ selectLabel }
									onChange={ ( selectLabel ) => setAttributes( { selectLabel } ) }
								/>
								
								
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ `${className}` }>
					<div className={ `input-group mb-3` }>
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon3">{ selectLabel }</span>
						</div>
						<select className="custom-select" id="inputGroupSelect02">
							<option value="usd" selected>USD</option>
							<option value="eur">EUR</option>
							<option value="jpy">JPY</option>
						</select>
					</div>

					<PanelBody
						title={ __( 'Options: ', 'themekit' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<InnerBlocks allowedBlocks={ [ 'cgb/pricing-currency-content' ]} />	
								
								
							</div>
						</div>
					</PanelBody>
				</div>
					
			</Fragment>
		);

		
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
				selectLabel,
			},
			className,
		} = props;
		return (
			<div className={ `${className}` }>
				<div className={ `input-group mb-3` }>
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon3">{ selectLabel }</span>
					</div>
					<select className="custom-select" id="inputGroupSelect02">
						<option value="usd" selected>USD</option>
						<option value="eur">EUR</option>
						<option value="jpy">JPY</option>
					</select>
				</div>
				<div className="select-options"><InnerBlocks.Content /></div>
			</div>
		);
	},
} );

/**
 * Register: Select Currency Option.
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
registerBlockType( 'cgb/pricing-currency-content', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Pricing Currency Content' ), // Block title.
	icon: 'list-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: [ 'cgb/pricing-currency-selector' ],
	keywords: [
		__( 'currency' ),
		__( 'selector' ),
		__( 'price' ),
		__( 'pricing' ),
	],
	attributes: {
		optionLabel: {
			type: 'string',
			default:'USD ',
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
				optionLabel,
			},
			className,
			setAttributes,
		} = props;

		/**
		 * - 
		 * - add three collapsible " options"
		 * - innerContent blocks = cgb/block-pricing-packs
		 * <InnerBlocks template={TEMPLATE} templateLock="all"/>
		 * <InnerBlocks.Content />
		 */
		const TEMPLATE = [
			['cgb/block-pricing-packs', {}],
		];
		return(
			<Fragment>	
				<InspectorControls>
					<PanelBody
						title={ optionLabel }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<TextControl
									label="Option Label"
									value={ optionLabel }
									onChange={ ( optionLabel ) => setAttributes( { optionLabel } ) }
								/>
								
								
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
					<PanelBody
						title={ optionLabel }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<div className="components-base-control__field">
					
								<InnerBlocks template={TEMPLATE} templateLock="all"/>
								
								
							</div>
						</div>
					</PanelBody>
				
			</Fragment>
		);

		
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
				optionLabel,
			},
			className,
		} = props;

		var targetedClass = 'is'+ optionLabel.toLowerCase();
		return (
			<div className={ `${className} ${targetedClass}` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );