// @import 'editor.scss';
import "./editor.scss";
import { __experimentalGetSettings } from "@wordpress/date";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
} = wp.components;
const { withSelect, withDispatch, select } = wp.data;
const { compose } = wp.compose;


/*
 * MyTextControl Starts
*/
var MyTextControl = compose(
	withDispatch(function (dispatch, props) {
		return {
			setMetaFieldValue: function (value) {
				dispatch("core/editor").editPost({
					meta: { [props.fieldName]: value },
				});
			},
		};
	}),
	withSelect(function (select, props) {
		return {
			metaFieldValue: select("core/editor").getEditedPostAttribute("meta")[
				props.fieldName
			],
		};
	})
)(function (props) {
	return (
		<TextControl
			value={props.metaFieldValue}
			label={props.fieldLabel}
			onChange={(value) => props.setMetaFieldValue(value)}
		/>
	);
});


/*
 * MyTextareaControl Starts
*/
var MyTextareaControl = compose(
	withDispatch(function (dispatch, props) {
		return {
			setMetaFieldValue: function (value) {
				dispatch("core/editor").editPost({
					meta: { [props.fieldName]: value },
				});
			},
		};
	}),
	withSelect(function (select, props) {
		return {
			metaFieldValue: select("core/editor").getEditedPostAttribute("meta")[
				props.fieldName
			],
		};
	})
)(function (props) {
	return (
		<TextareaControl
	        label={props.fieldLabel}
	        help={props.fieldHelp}
	        value={props.metaFieldValue}
	        onChange={(value) => props.setMetaFieldValue(value)}
	    />
	);
});

/*
 * MySelectControl Starts
*/
var MySelectControl = compose(
	withDispatch(function (dispatch, props) {
		return {
			setMetaFieldValue: function (value) {
				dispatch("core/editor").editPost({
					meta: { [props.fieldName]: value },
				});
			},
		};
	}),
	withSelect(function (select, props) {
		return {
			metaFieldValue: select("core/editor").getEditedPostAttribute("meta")[
				props.fieldName
			],
		};
	})
)(function (props) {
	return (
		<SelectControl
	        label={props.fieldLabel}
	        help={props.fieldHelp}
	        value={props.metaFieldValue}
	        options={ [
	            { label: 'Light Gray', value: 'light-gray' },
	            { label: 'Gray', value: 'gray' },
	            { label: 'White', value: 'white' },
	            { label: 'Black', value: 'black' },
	            { label: 'Brand Blue', value: 'brand-blue' },
	            { label: 'Accent Yellow', value: 'accent-yellow' },
	            { label: 'Neutral 1', value: 'neutral-1' },
	            { label: 'Neutral 2', value: 'neutral-2' },
	            { label: 'Neutral 3', value: 'neutral-3' },
	            { label: 'Neutral 4', value: 'neutral-4' },
	        ] }
	        onChange={(value) => props.setMetaFieldValue(value)}
	    />

	);
});


/*
 * MyToggleControl Starts
*/
var MyToggleControl = compose(
	withDispatch(function (dispatch, props) {
		return {
			setMetaFieldValue: function (value) {
				dispatch("core/editor").editPost({
					meta: { [props.fieldName]: value },
				});
			},
		};
	}),
	withSelect(function (select, props) {
		return {
			metaFieldValue: select("core/editor").getEditedPostAttribute("meta")[
				props.fieldName
			],
		};
	})
)(function (props) {
	let myformScript = "";
	if (props.metaFieldValue) {
		myformScript = props.children;
	} else {
		myformScript = null;
	}

	return (
		<div>
			<ToggleControl
				label={props.fieldLabel}
				value={props.metaFieldValue}
				help={props.fieldHelp}
				checked={props.metaFieldValue}
				onChange={(value) => props.setMetaFieldValue(value)}
			/>
			{myformScript}
		</div>
	);
});


registerPlugin("phf-sidebar", {
	icon: "awards",
	render: () => {
		/* only viewable on custom post type
    -------------------------------------------------------------*/
		const postType = select("core/editor").getCurrentPostType();
		if (postType !== "post") {
			return null;
		}

		/* add <PluginMetaFields/> for each custom meta field
     * @params fieldLabel=""
     * @params fieldName="" // same as register_meta
    -------------------------------------------------------------*/
		return (
			<div>
				<PluginSidebarMoreMenuItem target="phf-sidebar">
					{__("Post Header Settings", "textdomain")}
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="phf-sidebar"
					title={__("Post Header Settings", "textdomain")}
				>
					<PanelBody
						title={__("Post Header Settings", "textdomain")}
						icon="admin-generic"
						intialOpen={true}
					>
						<MyToggleControl
							fieldLabel="Show Header Form"
							fieldHelp="Show form adjacent to the post title in header section" 
							fieldName="is_active_campaign"
						>
							<MyTextareaControl 
								fieldLabel="Form Script" 
								fieldName="form_script" 
								fieldHelp="Paste the script for showing the form at post header section"
							/>

							<MyTextControl 
								fieldLabel="Button Title" 
								fieldName="popup_button_title" 
								fieldHelp="Orange header button title"
							/>

						</MyToggleControl>
					</PanelBody>
				</PluginSidebar>
			</div>
		);
	},
});
