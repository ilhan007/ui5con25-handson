import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatLoadingTemplate from "./ChatLoadingTemplate.js";

// Styles
import ChatLoadingCss from "./generated/themes/ChatLoading.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>my-chat-loading</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "ui5con/dist/ChatLoading.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "my-chat-loading",
	renderer: jsxRenderer,
	styles: ChatLoadingCss,
	template: ChatLoadingTemplate,
})
class ChatLoading extends UI5Element {}

ChatLoading.define();

export default ChatLoading;
