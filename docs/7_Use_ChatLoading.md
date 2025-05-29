#  Use the `ChatLoading`

The `ChatLoading` is the last missing piece to have a complete chat experience.
It will be shown in the content of the `Chat` while waiting for the response.
We need to do some little touches to make it part of the `Chat`.

<br>

## 1. Update `messages` Slot in `src/Chat.ts`

The `ChatLoading` web component will be just another type of child within the `Chat`.
We will reuse the `message` slot and only exxtend the slot's type to accept components of type `ChatLoading`.


```ts
+import type ChatLoading from "./ChatLoading.js";

class Chat extends UI5Element {

	@slot({ type: HTMLElement, "default": true })
	messages!: Array<ChatMessage | ChatLoading>;
```

<br>

## 2. Use `ChatLoading`

Within our dummy application code, we can now use the `ChatLoading` component
to fill the time between questions and answers:


```html
	<my-chat id="myChat"></my-chat>

	<script>

		const myChat = document.getElementById("myChat");

		myChat.addEventListener("submit", (e) => {
			const newMessage = document.createElement("my-chat-bubble")
			newMessage.textContent = e.detail.value;
			myChat.appendChild(newMessage)

			const loading = document.createElement("my-chat-loading");
   			myChat.appendChild(loading);

			setTimeout(() => {
				loading.remove();

				const newAssistantMessage = document.createElement("my-chat-bubble")
				newAssistantMessage.type ="Assistant";
				newAssistantMessage.textContent = "This is my response";
				myChat.appendChild(newAssistantMessage)
			}, 1500);
		})
	</script>

<br>

## Hoooray! Congratulation! Hands-on completed!

<br>

<img src="./images/chatLoading2.png" />