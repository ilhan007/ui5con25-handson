import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js";

@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

	@property()
	headerTitle: string = "My custom UI for chatbot";

	onOpenerBtnClick() {
		this.open = !this.open;
	}

	onMinimizeBtnClick() {
		this.open = false;
	}
}

Chat.define();

export default Chat;
