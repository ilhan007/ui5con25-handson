# The Chat's Messages

The ChatMessage component (`<my-chat-message>`) will be rendered inside the content area of the Chat's Popover and passed as a child to the `<my-chat>` component.

Passing web components as children to another component is a powerful feature supported by the Web Components standard via the HTML `<slot>` element. It enables composition and customization.

Now, let’s update the `Chat` component to support this pattern by defining a `messages` slot and rendering it in the component’s template.

<br>


## 1. Define the `messages` Slot

Open `src/Chat.ts` and declare a new slot using the `@slot` decorator. 
This `messages` slot will hold the `ChatMessage` components passed as children.


```ts
// ...
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import type ChatMessage from "./ChatMessage.js";

class Chat extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	messages!: Array<ChatMessage>;
}
```

**Note:** When children are defined via the `@slot` decorator, the component will be re-rendered whenever the children are added, removed, or rearranged.

<br>

## 2. Render the `messages` Slot

Update the Chat’s template to render the slotted elements (see the `<slot></slot>` element).
If no messages are present, an `IllustratedMessage` is shown as a fallback.

```tsx
export default function ChatTemplate(this: Chat) {
	return (
			{/* ... */}

			<Popover>
				{/* ... */}

				<div class="my-chat-content">
					<div class="my-chat-messages">
						{this.messages.length > 0 ? (
							<slot></slot>
						) : (
							<IllustratedMessage
								design="Dialog"
								titleText="How can I assist you today?"
								subtitleText="Please enter your query to begin the conversation."
							/>
						)}
					</div>
				</div>
			</Popover>
		{/* ... */}
	);
}

```

**Note:** The code above shows only the modified part of the template.

<br>

## 3. Test the `messages` Slot

Open `test/index.html` and add the following:

```html
<my-chat header-title="UI5con">
	<my-chat-message>Hi, where are you!</my-chat-message>
	<my-chat-message type="Assistant">Hi, I am at UI5con 2025</my-chat-message>
	<my-chat-message>Really, how it's going?</my-chat-message>
	<my-chat-message type="Assistant">Developing web components, and sweating..</my-chat-message>
</my-chat>	
```

This should render your chat bubbles inside the chat popover.

<br>

## 4. Align the Messages

To visually distinguish between user and assistant messages
we can align them differently (right and left) using the `::slotted` pseudo-element selector.

```css
::slotted([my-chat-message]) {
	align-self: flex-start;
}

::slotted([my-chat-message][type="Assistant"]) {
	align-self: flex-end;b
}
```


============= TODO: Show Image ===============

**Note:** The `::slotted` selector is used to apply styles to elements passed into a slot. 
This is a Web Components–specific approach that lets you style projected content based on its tag name or attriutes.

<br>

# Next

With the Chat's Popover set up and messages rendered via the `ChatMessage`, you’re now ready to add user input functionality.

➡️ [Create Chat's Prompt area](./5_Develop_Chat_Prompt.md)