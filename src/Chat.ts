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
import type ChatMessage from "./ChatMessage.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type TextArea from "@ui5/webcomponents/dist/TextArea.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js";

enum ChatPlacement {
	Start = "Start",
	End = "End",
}

type ChatSearchEventDetail = {
	value: string;
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>my-chat</code> component is a demo component that displays some text.
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
@event("search")
class Chat extends UI5Element {
	eventDetails!: {
		"search": ChatSearchEventDetail
	}

	@i18n("@ui5con/chatbot")
	static i18nBundle: I18nBundle;

	@property({ type: Boolean })
	open = false;

	@property()
	headerTitle?: string;

	@property()
	placement?: `${ChatPlacement}`;

	@slot({ type: HTMLElement, "default": true })
	messages!: Array<ChatMessage>

	@query("#input")
	textArea!: TextArea;

	closeViaButton = false;

	handleFixedBtnClick() {
		this.closeViaButton = this.open;
		this.open = !this.open;
	}

	handleMinimizeBtnClick() {
		this.open = false;
		this.closeViaButton = true;
	}

	handlePopoverBeforeClose(e: UI5CustomEvent<Popover, "before-close">) {
		if (this.closeViaButton) {
			return;
		}

		if (e.detail.escPressed) {
			return;
		}

		e.preventDefault();
		this.closeViaButton = false;
	}

	handleSubmitBtnClick() {
		const value = this.textArea.value;

		if (!value) {
			return;
		}

		this.fireDecoratorEvent("search", { value });

		this.textArea.value = "";
	}
}

Chat.define();

export default Chat;
export type {
	ChatPlacement,
};
