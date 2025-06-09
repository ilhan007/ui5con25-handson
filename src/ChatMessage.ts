import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatMessageTemplate from "./ChatMessageTemplate.js";

// Styles
import ChatMessageCss from "./generated/themes/ChatMessage.css.js";

enum ChatMessageType {
	User = "User",
	Assistant = "Assistant",
}

@customElement({
	tag: "my-chat-bubble",
	renderer: jsxRenderer,
	styles: ChatMessageCss,
	template: ChatMessageTemplate,
})
class ChatMessage extends UI5Element {
	/**
	 * Defines the bubble placement inside the chat.
	 */
	@property()
	type?: `${ChatMessageType}`;
}

ChatMessage.define();

export default ChatMessage;
export { ChatMessageType };
