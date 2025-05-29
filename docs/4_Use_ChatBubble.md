# The Chat's Messages

The `ChatBubble`, `<my-chat-bubble>` will be displayed in the content of the Chat's Popover and passed as a child of the Chat, `<my-chat>`.

Passing web components as children to another web component is a powerfull concept that is often used in web components development. It's part of the web standards via the HTML `<slot>` element.

Now, let's define a new `slot` in the Chat's class and update the Chat's template to render slotted elements.

<br>


## 1. Define New Slot

Let's create a new slot `messages` in the `src/Chat.ts`, using the `@slot` decorator.


```ts
// ...
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import type ChatBubble from "./ChatBubble.js";

class Chat extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	messages!: Array<ChatBubble>;
}
```

======== TODO: explain slot a little bit ==========

<br>

## 2. Render the ChatBubble in Chat's Slot

The template is changed to render slotted elements (see the `<slot></slot>` element),
when the `messages` count is bigger that 0.  Otherwise, the component fallbacks to show the `IllustratedMessage`.

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

**Note:** the code snippet is showing the new addition only.

<br>

## 3. Test the `messages` Slot

Write the following into the `test/index.html` and open the `Chat`.

```html
<my-chat header-title="UI5con">
	<my-chat-bubble>Hi, where are you!</my-chat-bubble>
	<my-chat-bubble type="Assistant">Hi, I am at UI5con 2025</my-chat-bubble>
	<my-chat-bubble>Really, how it's going?</my-chat-bubble>
	<my-chat-bubble type="Assistant">Developing web components, and sweating..</my-chat-bubble>
</my-chat>	
```

<br>

## 4. Align the Messages

Ideally, we would like to align the `messages` from type `User` to left,
adn those with type `Assistant` - to the right.

```css
::slotted([my-chat-bubble]) {
	align-self: flex-start;
}

::slotted([my-chat-bubble][type="Assistant"]) {
	align-self: flex-end;
}
```


============= TODO: Show Image ===============

**Note:** The `::slotted` selector is a way to apply styles on slotted elements 
with the given tag - another web components specific concept to get familiar with

<br>

## Next

Now that we have the `Chat`'s Popover and we can display messages via the `ChatBubble`,
we are ready to allow typing in the `Chat`!

[Create Chat's Prompt area](./5_Develop_Chat_Prompt.md)