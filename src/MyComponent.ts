import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import MyComponentTemplate from "./MyComponentTemplate.js";

// Styles
import MyComponentCss from "./generated/themes/MyComponent.css.js";

import { COUNT } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>demo-counter</code> component is a demo component that displays some text.
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "demo-counter",
	renderer: jsxRenderer,
	styles: MyComponentCss,
	template: MyComponentTemplate,
})
class MyComponent extends UI5Element {
	@i18n("lib")
	static i18nBundle: I18nBundle;

	/**
	 * Defines the component count.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	count = 0;

	onClick() {
		this.count++;
	}

	get counterText() {
		return MyComponent.i18nBundle.getText(COUNT);
	}
}

MyComponent.define();

export default MyComponent;
