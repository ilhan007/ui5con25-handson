import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import ChatLoadingTemplate from "./ChatLoadingTemplate.js";

@customElement({
	tag: "my-chat-loading",
	renderer: jsxRenderer,
	template: ChatLoadingTemplate,
})
class ChatLoading extends UI5Element {}

ChatLoading.define();

export default ChatLoading;
