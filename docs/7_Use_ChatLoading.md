#  Use the `ChatLoading`

The `ChatLoading` is the final piece needed to complete the chat experience.
It provides a visual indicator while waiting for a response.

Let’s integrate it into the `Chat` web component with just a few small adjustments.

<img width="429" alt="Screenshot 2025-06-09 at 18 02 38" src="https://github.com/user-attachments/assets/ca6ab339-5be7-4c6f-a015-d2fc7094ff0f" />

<br>
<br>

## 1. Extend the `messages` Slot in `src/Chat.ts`

The `ChatLoading` will be treated like any other child message inside the Chat.
To support this, update the messages slot to accept both `ChatMessage` and `ChatLoading`.


```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";

import type ChatMessage from "./ChatMessage.js";
import type ChatLoading from "./ChatLoading.js";
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

	@property({ type: Boolean })
	open = false;

	@property()
	headerTitle: string = "My custom UI for chatbot";

	@slot({ type: HTMLElement, "default": true })
	messages!: Array<ChatMessage | ChatLoading>;

	@query("#input")
	textArea!: TextArea;

	onOpenerBtnClick() {
		this.open = !this.open;
	}

	onMinimizeBtnClick() {
		this.open = false;
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

```

<br>

## 2. Show `ChatLoading` Between Messages

In your app code, you can now insert a `<my-chat-loading>` element to simulate the delay before the assistant responds.


```html
	<body>
		<!-- .... -->
			<my-chat id="myChat" header-title="UI5con"></my-chat>
		<!-- .... -->

		<script>
			const myChat = document.getElementById("myChat");

			myChat.addEventListener("submit", (e) => {
				const newMessage = document.createElement("my-chat-message")
				newMessage.textContent = e.detail.value;
				myChat.appendChild(newMessage)

				const loading = document.createElement("my-chat-loading");
				myChat.appendChild(loading);

				setTimeout(() => {
					loading.remove();

					const newAssistantMessage = document.createElement("my-chat-message")
					newAssistantMessage.type ="Assistant";
					newAssistantMessage.textContent = "This is my response";
					myChat.appendChild(newAssistantMessage)
				}, 1500);
			});
		</script>
	</body>
```

Now, type a new message, you should see the loading first and then the response.
This creates a natural pause before the assistant replies, enhancing the realism of the chat.

<br>

## 🎉 Congratulations — You Did It!

You’ve now completed the hands-on and built a fully functional web component-based chat experience, 
complete with messages, styling, interaction, and loading feedback.

<br>

<img width="425" alt="Screenshot 2025-06-12 at 13 56 00" src="https://github.com/user-attachments/assets/2094d3de-91bb-4c15-940c-0123b982367d" />

<br>


## (Optional) Write Cypress Test

For the overachievers, we have one more challange - writting a Cypress test!

➡️ [Write Cypress Test](./7_Write_Test.md)