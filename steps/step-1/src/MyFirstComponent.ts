import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import MyFirstComponentTemplate from "./MyFirstComponentTemplate.js";

// Styles
import MyFirstComponentCss from "./generated/themes/MyFirstComponent.css.js";

import { COUNT } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>my-first-component</code> component is a demo component that displays some text.
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "my-first-component",
	renderer: jsxRenderer,
	styles: MyFirstComponentCss,
	template: MyFirstComponentTemplate,
})
class MyFirstComponent extends UI5Element {
	@i18n("ui5con")
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
		return MyFirstComponent.i18nBundle.getText(COUNT);
	}
}

MyFirstComponent.define();

export default MyFirstComponent;
