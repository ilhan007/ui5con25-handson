import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatBubbleTemplate from "./ChatBubbleTemplate.js";

// Styles
import ChatBubbleCss from "./generated/themes/ChatBubble.css.js";

enum ChatBubbleType {
	User = "User",
	Assistant = "Assistant",
}

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
	type?: `${ChatBubbleType}`;
}

ChatBubble.define();

export default ChatBubble;
export { ChatBubbleType };
