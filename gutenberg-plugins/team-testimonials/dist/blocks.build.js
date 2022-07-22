!function(e){function t(l){if(n[l])return n[l].exports;var o=n[l]={i:l,l:!1,exports:{}};return e[l].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1),n(4)},function(e,t,n){"use strict";var l=n(2),o=(n.n(l),n(3)),__=(n.n(o),wp.i18n.__),r=wp.blocks.registerBlockType,a=wp.blockEditor,s=(a.InnerBlocks,a.InspectorControls),i=a.BlockIcon,c=(a.ColorPalette,a.getColorClassName,a.getColorObjectByColorValue,wp.components),m=c.SelectControl,u=c.Placeholder,p=c.PanelBody,g=c.TextControl,h=(c.ToggleControl,wp.element.Fragment),d=(wp.compose.withState,wp.data),w=d.withSelect;d.select;r("cgb/testimonial-carousel",{title:__("Testimonial Carousel"),icon:"screenoptions",category:"widgets",keywords:[__("carousel"),__("slide"),__("testimonial")],attributes:{term:{type:"string"},className:{type:"string",default:"wp-block-cgb-carousel"},align:{type:"string"},interval:{type:"string",default:"5000"},height:{type:"string",default:"500px"},heightxl:{type:"string"},heightlg:{type:"string"},heightmd:{type:"string"},heightsm:{type:"string"}},supports:{align:!0},edit:w(function(e){var t={per_page:-1,hide_empty:!0};return{posts:e("core").getEntityRecords("taxonomy","testimonial-category",t)}})(function(e){if(!e.posts)return"Loading...";if(0===e.posts.length)return"No carousels found. Please ensure slides are applied to the carousel.";var t=e.attributes,n=t.term,l=(t.align,t.interval),o=t.height,r=t.heightxl,a=t.heightlg,c=t.heightmd,d=t.heightsm,w=e.setAttributes,b=e.className,f=[{label:"Select a carousel",value:"0"}],C="Loading carousels...";return e.posts.length>0?(e.posts.map(function(e,t){return f.push({label:e.name,value:e.slug})}),C=__("")):C=__("No carousels found. Please ensure slides are applied to the carousel."),wp.element.createElement(h,null,wp.element.createElement(s,null,wp.element.createElement(p,{title:"Carousel Settings"},wp.element.createElement(m,{label:"Select Carousel",value:n,options:f,onChange:function(e){w({term:e})}}),wp.element.createElement("p",null,C),wp.element.createElement(g,{label:"Interval in milliseconds (ms: 5000 = 5seconds, false = no auto cycle)",value:l,onChange:function(e){return w({interval:e})}}),wp.element.createElement(g,{label:"Height (ex: 500px)",value:o,onChange:function(e){return w({height:e})},help:__("Desktop/General Height")}),wp.element.createElement("p",null,wp.element.createElement("strong",null,__("Responsive height at breakpoints:"))),wp.element.createElement(g,{label:"Height XLarge",value:r,onChange:function(e){return w({heightxl:e})},help:__("@media > 1500px")}),wp.element.createElement(g,{label:"Height Large",value:a,onChange:function(e){return w({heightlg:e})},help:__("@media < 1199px")}),wp.element.createElement(g,{label:"Height Medium",value:c,onChange:function(e){return w({heightmd:e})},help:__("@media < 991px")}),wp.element.createElement(g,{label:"Height Small",value:d,onChange:function(e){return w({heightsm:e})},help:__("@media < 767px")}))),wp.element.createElement(u,{icon:wp.element.createElement(i,{icon:"screenoptions",showColors:!0}),label:"Testimonial Carousel",className:b},wp.element.createElement(p,null,wp.element.createElement(m,{label:"Select Carousel",value:n,options:f,onChange:function(e){w({term:e})}}),C,wp.element.createElement(g,{label:"Interval in milliseconds (ms: 5000 = 5seconds, false = no auto cycle)",value:l,onChange:function(e){return w({interval:e})}}),wp.element.createElement(g,{label:"Height (ex: 500px).  Responsive height variations can be set in block details.",value:o,onChange:function(e){return w({height:e})}}))))}),save:function(){return null}})},function(e,t){},function(e,t){},function(e,t,n){"use strict";var l=n(5),o=(n.n(l),n(6)),__=(n.n(o),wp.i18n.__),r=wp.blocks.registerBlockType,a=wp.blockEditor,s=(a.InnerBlocks,a.InspectorControls),i=a.BlockIcon,c=(a.ColorPalette,a.getColorClassName,a.getColorObjectByColorValue,wp.components),m=c.SelectControl,u=c.Placeholder,p=c.PanelBody,g=(c.TextControl,c.ToggleControl),h=c.RangeControl,d=wp.element.Fragment,w=(wp.compose.withState,wp.data),b=w.withSelect;w.select;r("cgb/team-members",{title:__("Team Members"),icon:"screenoptions",category:"widgets",keywords:[__("team"),__("members"),__("grid")],attributes:{className:{type:"string",default:"wp-block-cgb-team-members"},align:{type:"string"},term:{type:"string"},columns:{type:"integer",default:"5"},show_designation:{type:"boolean",default:!0}},supports:{align:!0},edit:b(function(e){var t={per_page:-1,hide_empty:!0};return{posts:e("core").getEntityRecords("taxonomy","team-category",t)}})(function(e){if(!e.posts)return"Loading...";if(0===e.posts.length)return"No team members found. Please ensure members are attached to proper category.";var t=e.attributes,n=t.term,l=(t.align,t.columns),o=t.show_designation,r=e.setAttributes,a=e.className,c=[{label:"Select a category",value:"0"}],w="Loading members...";return e.posts.length>0?(e.posts.map(function(e,t){return c.push({label:e.name,value:e.slug})}),w=__("")):w=__("No team members found. Please ensure members are attached to proper category."),wp.element.createElement(d,null,wp.element.createElement(s,null,wp.element.createElement(p,{title:"Team Members Settings"},wp.element.createElement(m,{label:"Select Category",value:n,options:c,onChange:function(e){r({term:e})}}),wp.element.createElement("p",null,w),wp.element.createElement(h,{label:"Number of members to show in single row",value:l,onChange:function(e){return r({columns:e})},min:2,max:8}),wp.element.createElement(g,{label:"Show member designation",help:o?"Designations are visible.":"Designations are hidden.",checked:o,onChange:function(e){return r({show_designation:e})}}))),wp.element.createElement(u,{icon:wp.element.createElement(i,{icon:"screenoptions",showColors:!0}),label:"Team Members Settings",className:a},wp.element.createElement(p,null,wp.element.createElement(m,{label:"Select Category",value:n,options:c,onChange:function(e){r({term:e})}}),w,wp.element.createElement(h,{label:"Number of members to show in single row",value:l,onChange:function(e){return r({columns:e})},min:2,max:8}),wp.element.createElement(g,{label:"Show member designation",help:o?"Designations are visible.":"Designations are hidden.",checked:o,onChange:function(e){return r({show_designation:e})}}))))}),save:function(){return null}})},function(e,t){},function(e,t){}]);