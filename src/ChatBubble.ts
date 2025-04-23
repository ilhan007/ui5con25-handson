import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatBubbleTemplate from "./ChatBubbleTemplate.js";

// Styles
import ChatBubbleCss from "./generated/themes/ChatBubble.css.js";

enum ChatBubblePlacement {
	Start = "Start",
	End = "End",
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>my-chat-bubble</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5con/chatbot/dist/ChatBubble.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "my-chat-bubble",
	renderer: jsxRenderer,
	styles: ChatBubbleCss,
	template: ChatBubbleTemplate,
})
class ChatBubble extends UI5Element {
	/**
	 * Defines the bubble placement inside the chat.
	 */
	@property()
	placement?: `${ChatBubblePlacement}`;
}

ChatBubble.define();

export default ChatBubble;
export type { ChatBubblePlacement };
