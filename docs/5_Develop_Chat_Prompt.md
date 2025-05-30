# The Chat's Prompt Area

What is a chat without typing? This is the final piece of the core chat experience.
We'll now add a prompt area where users can type their messages and submit them to the conversation.

To do this, we'll use the `TextArea` and `Button` UI5 Web Components, positioned side by side. 
The user will enter their message in the TextArea and submit it by clicking the Button.

<br>


## 1. Render the Prompt Area

We’ll enhance the Chat template to include the input area:

- Import `TextArea` and preset properties like `growing`, `growingMaxRows`, and `rows`
- Import a new icon for the submit Button (paper-plane).
- Add a new container inside the Popover to house the prompt elements.

**Note:** The snippet shows the new code addition.

```tsx
import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import paperPlaneIcon from "@ui5/webcomponents-icons/dist/paper-plane.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="my-chat-root">
			<Popover>
				{/* ... */}

				<div class="my-chat-content">
					{/* ... */}

						{/* The Prompt Area */}
						<div class="my-chat-input-container">
							<TextArea
								id="input"
								growing
								growingMaxRows={4}
								rows={1}
							/>
							<Button
								id="send"
								icon={paperPlaneIcon}
								design="Emphasized"
								onClick={this.onSubmitBtnClick}
							/>
						</div>
				</div>
			</Popover>
		</div>
	);
}

```

<br>

============ TODO Show image ================


## 2. Submitting Messages

Update the Chat component class with the logic for submitting a message:

- Add a click handler `onSubmitBtnClick`

- Fire a custom `submit` when the user sends a message.


```ts
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

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

	@query("#input")
	textArea!: TextArea;

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

🧠 What is `@query`?
The `@query` decorator allows you define a reference an DOM element (like the `TextArea`) from the template.

<br>

At this point, users can type into the TextArea and submit their input — but the message won’t be shown in the UI yet...

<br>

## 3. Displaying Messages

From the Web Component's perspective, we’re done:

- We have the `ChatMessage` to represent a message.
- We have the `Chat` to accept messages via the slot.
- We emit a `submit` event with the user’s input.

Now it’s the application’s responsibility to handle the `submit` event and render a new `ChatMessage`.

Here’s a simple example using vanilla HTML and JavaScript:

```html
	<my-chat id="myChat"></my-chat>

	<script>

		const myChat = document.getElementById("myChat");

		myChat.addEventListener("submit", (e) => {
			const newMessage = document.createElement("my-chat-message")
			newMessage.textContent = e.detail.value;
			myChat.appendChild(newMessage)
		})
	</script>

```

**How it works:** When the user submits a message, the app listens for the `submit` event,
creates a new ChatMessage `my-chat-message`), and appends it to the Chat (`my-chat`).

<br>

### 3.1 Display Assistant Messages

To simulate an assistant reply, you can add a message of type "Assistant" after a delay:

```html
	<my-chat id="myChat"></my-chat>

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
		})
	</script>
```

🤖 You can easily replace the static assistant response with a call to an AI API or backend service to generate dynamic replies.

<br>

# Next

You're almost there! One final touch is needed — handling the Loading state to show that a response is coming.

➡️ [Develop ChatLoading ](./6_Develop_ChatLoading)