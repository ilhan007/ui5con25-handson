# The Chat's Prompt Area

What is Chat without typing? This is the missing piece of the puzzle.
In this case, we will use the `TextArea` and `Button` web components, placed side by side to form the prompt area.

The user will type in the `TextArea` and then press the `Button` to submit the message.

<br>


## 1. Render the Prompt Area

- Import `TextArea` and preset some of its properties (`growing`, `growingMaxRows`,`rows`)
- Import a new icon for the Submit Button

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


## 2. Submit Messages

- Attach `onSubmitBtnClick`

- Fire `submit` event


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

============ TODO explain query ================

At this point, we can type in the `TextArea` and press the `Submit Button`, but there is no messages displayed...

<br>

## 3. Display Messages

From web components dev perspective we are pretty much done.
We provide the `ChatBubble` that represents a single message.
We have the `Chat` that can slot `ChatBubble` and allows typing.
Finally, when a message is submitted, we fire a `submit` event.
The rest belongs to the application code.

The following would look better in frameworks like React or Angular,
but for simplicity, we show it with pure HTML and JS:


```html
	<my-chat id="myChat"></my-chat>

	<script>

		const myChat = document.getElementById("myChat");

		myChat.addEventListener("submit", (e) => {
			const newMessage = document.createElement("my-chat-bubble")
			newMessage.textContent = e.detail.value;
			myChat.appendChild(newMessage)
		})
	</script>

```

**How it works:** When the user submits a message, the "application" gets notified via the `submit` event
and creates a new message (`my-chat-bubble`) that is passed to the `my-chat`.

<br>

### 3.1 Display Assistant Messages

In the previous chapter, we implemented the `ChatBubble` to support two types of design ("User" and "Assistant").
Now, we can make use of it to simulate real Chat Assistant behavior.

For example, on each user-typed message, we can show our own after 1 sec.

```html
	<my-chat id="myChat"></my-chat>

	<script>

		const myChat = document.getElementById("myChat");

		myChat.addEventListener("submit", (e) => {
			const newMessage = document.createElement("my-chat-bubble")
			newMessage.textContent = e.detail.value;
			myChat.appendChild(newMessage)

			setTimeout(() => {
				const myAssistantMessage = document.createElement("my-chat-bubble")
				myAssistantMessage.type ="Assistant";
				myAssistantMessage.textContent = "This is my response";
				myChat.appendChild(myAssistantMessage)
			}, 1000);
		})
	</script>
```

<br>

## Next

You are almost done. There is one little detail left - adding a `Loading` state.

[Develop ChatLoading ](./6_Develop_ChatLoading)