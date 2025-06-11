# The Chat's Prompt Area

What is a chat without typing? This is the final piece of the core chat experience.
We'll now add a prompt area where users can type their messages and submit them to the conversation.

To do this, we'll use the `TextArea` and `Button` UI5 Web Components, positioned side by side. 
The user will enter their message in the TextArea and submit it by clicking the Button.

<br>

<img width="558" alt="Screenshot 2025-06-02 at 11 54 41" src="https://github.com/user-attachments/assets/f4804279-7a0a-4d35-96b4-374d3d61553a" />

<br>


## 1. Render the Prompt Area

We’ll enhance the Chat template to include the input area:

- Import `TextArea` and preset properties like `growing`, `growingMaxRows`, and `rows`
- Import a new icon for the submit Button (`paper-plane`)
- Add a new container inside the Popover to house the prompt elements

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import minimizeIcon from "@ui5/webcomponents-icons/dist/minimize.js";
import IllustratedMessage from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import paperPlaneIcon from "@ui5/webcomponents-icons/dist/paper-plane.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="my-chat-root">
			<div class="my-chat-opener-btn-container" popover="auto">
				<Button
					id="opener-btn"
					icon={headsetIcon}
					onClick={this.onOpenerBtnClick}
				/>
			</div>

			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
				<Bar slot="header" design="Subheader">
					<Title slot="startContent">
						{this.headerTitle}
					</Title>

					<Button
						icon={minimizeIcon}
						onClick={this.onMinimizeBtnClick}
						slot="endContent"
					/>
				</Bar>

				<div class="my-chat-content">
					<div class="my-chat-messages">
						{
							this.messages.length > 0 ? 
							( 
								<slot></slot>
							) 
							: 
							(
								<IllustratedMessage
									design="Dialog"
									titleText="How can I assist you today?"
									subtitleText="Please enter your query to begin the conversation."
								/>
							)
						}
					</div>

					{/* The Prompt Area */}
					<div class="my-chat-input-container">
						<TextArea
							id="input"
							growing={true}
							growingMaxRows={4}
							rows={1}
						/>
						<Button
							id="send"
							icon={paperPlaneIcon}
							design="Emphasized"
						/>
					</div>
				</div>
			</Popover>
		</div>
	);
}

```

<br>

- Add the following styles to `src/themes/Chat.css` to align the TextArea and the Submit Button:

```css
/* Prompt Area */
.my-chat-input-container {
	display: flex;
	align-items: flex-start;
	gap: 0.5rem;
}

.my-chat-input-container > * {
	margin: 0;
}
```

============ TODO Show image ================


## 2. Submitting Messages

Update the Chat class (`src/Chat.ts`) with the logic for submitting a message:

- Import and use the `@event` decorator
- Add `onSubmitBtnClick` click handler that fires a custom `submit` event when the user sends a message
- Import and use of the `@query` decorator that allows you define a reference to a DOM element (like the `TextArea`) from the template

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";

import type ChatMessage from "./ChatMessage.js";
import type TextArea from "@ui5/webcomponents/dist/TextArea.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js"

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
	messages!: Array<ChatMessage>;

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

- Find the Submit button in `src/ChatTemplate.tsx` and attach the handler:

```tsx
	<Button
		id="send"
		icon={paperPlaneIcon}
		design="Emphasized"
		{/* The handler */}
		onClick={this.onSubmitBtnClick}
	/>
}
```

<br>

At this point, users can type into the TextArea and submit their input — but the message won’t be shown in the UI yet...

<br>

## 3. Displaying Messages

From the Web Component's perspective, we’re done:

- We have the `ChatMessage` to represent a message.
- We have the `Chat` to accept messages via the slot.
- We emit a `submit` event with the user’s input.

Now it’s the application’s responsibility to handle the `submit` event and render a new `ChatMessage`.

Here’s a simple example using vanilla HTML and JavaScript. Open the `test/index.html`



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
			})
		</script>
	</body>
```

**How it works:** When the user submits a message, the app listens for the `submit` event,
creates a new ChatMessage `my-chat-message`), and appends it to the Chat (`my-chat`).

<br>

### 3.1 Display Assistant Messages

To simulate an assistant reply, you can add a message of type "Assistant" after a delay:

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

				setTimeout(() => {
					const myAssistantMessage = document.createElement("my-chat-message")
					myAssistantMessage.type ="Assistant";
					myAssistantMessage.textContent = "This is my response";
					myChat.appendChild(myAssistantMessage)
				}, 1000);
			});
		</script>
	</body>
```

🤖 You can easily replace the static assistant response with a call to an AI API or backend service to generate dynamic replies.

<br>

# Next

You're almost there! One final touch is needed — handling the Loading state to show that a response is coming.

➡️ [Develop ChatLoading ](./6_Develop_ChatLoading.md)
