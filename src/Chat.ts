import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type ChatMessage from "./ChatBubble.js";
import type ChatLoading from "./ChatLoading.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type TextArea from "@ui5/webcomponents/dist/TextArea.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js";

type ChatSubmitEventDetail = {
	value: string;
};

@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
@event("submit")
class Chat extends UI5Element {
	eventDetails!: {
		"submit": ChatSubmitEventDetail;
	};

	@i18n("@ui5con/chatbot")
	static i18nBundle: I18nBundle;

	@property({ type: Boolean })
	open = false;

	@property()
	headerTitle?: string;

	@slot({ type: HTMLElement, "default": true })
	messages!: Array<ChatMessage | ChatLoading>;

	@query("#input")
	textArea!: TextArea;

	private closeViaButton = false;

	onOpenerBtnClick() {
		this.closeViaButton = this.open;
		this.open = !this.open;
	}

	onMinimizeBtnClick() {
		this.open = false;
		this.closeViaButton = true;
	}

	onPopoverBeforeClose(e: UI5CustomEvent<Popover, "before-close">) {
		if (this.closeViaButton || e.detail.escPressed) {
			return;
		}
		e.preventDefault();
		this.closeViaButton = false;
	}

	onSubmitBtnClick() {
		const value = this.textArea.value;

		if (!value) {
			return;
		}

		this.fireDecoratorEvent("submit", { value });
		this.textArea.value = "";
		this.textArea.focus();
	}
}

Chat.define();

export default Chat;
export type {
	ChatSubmitEventDetail,
};
