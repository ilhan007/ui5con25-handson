# Develop `ChatMessage` Web Component

The `ChatMessage` web component represents the message that is sent by the user and received by the assistant.
To differentiate between the request and the response the `ChatMessage` will support two design flavors.

<br>

## 1. Generate `ChatMessage` Web Component

We’ll use the create-ui5-element command to scaffold the component, which generates the following files:

- src/ChatMessage.ts
- src/ChatMessageTemplate.tsx
- src/themes/ChatMessage.css

```sh
npm run create-ui5-element ChatMessage
```

**Note:** By default the tag is set to `my-chat-message` in the `src/ChatMessage.ts`.

<br>

## 2. Clean Up the `ChatMessage.ts` Class

The scaffolded code includes a demo setup that we’ll now clean up.

Replace the contents of `src/ChatMessage.ts` with the following:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatMessageTemplate from "./ChatMessageTemplate.js";

// Styles
import ChatMessageCss from "./generated/themes/ChatMessage.css.js";


@customElement({
	tag: "my-chat-message",
	renderer: jsxRenderer,
	styles: ChatMessageCss,
	template: ChatMessageTemplate,
})
class ChatMessage extends UI5Element {
}

ChatMessage.define();

export default ChatMessage;

```

<br>

## 3. Update The `ChatMessageTemplate` Template

Currently, the `ChatMessage` shows plain text.
Let's use of the `slot` element to render the text content, passed to the `ChatMessage`.

Update `src/ChatMessageTemplate.tsx` with the following:

```tsx
import type ChatMessage from "./ChatMessage.js";

export default function ChatMessageTemplate(this: ChatMessage) {
	return (
		<div>
			<slot></slot>
		</div>
	);
}
```

<br>

## 4. Add Styling

Now add some basic styling to make the component visually resemble a chat message.
Replace the contents of `src/themes/ChatMessage.css` with:

```css
:host {
	background-color: var(--sapBackgroundColor);
	padding: 0.5rem 1rem;
	display: inline-block;
	border-radius: 0.5rem;
	font-family: var(--sapFontFamily);
	font-size: var(--sapFontSize);
}
```

<br>

## 5. Test `ChatMessage` in `index.html`

Open the `test/index.html` and include the `<my-chat-message>` tag at a random place:

```html
<my-chat-message>My message</my-chat-message>`
```

<br>

## 6. Add Second `ChatMessage` Type

To differentiate between user messages and assistant responses,
we’ll extend the component to support multiple styles using a `type` property.


### 6.1 Add `type` Property

We use the `@property` decorator - don't forget to import it.
Additionally, we create an enum `ChatMessageType` that defines two types - `User` and `Assistant`.

Update `src/ChatMessage.ts` to include the `type` property and an `enum` definition:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

enum ChatMessageType {
	User = "User",
	Assistant = "Assistant",
}

class ChatMessage extends UI5Element {
	@property()
	type: ChatMessageType = ChatMessageType.User;
}

ChatMessage.define();

export default ChatMessage;

```

<br>

### 6.3 Add Conditional Styling

Enhance the CSS file to apply different styles based on the `type` attribute:

```css
:host([type="Assistant"]) {
	background-color: var(--sapInformationBackground);
}
```

<br>

With this, `my-chat-message` with type "Assistant" will use a different background color.

```html
<my-chat-message type="Assistant">Hello! How can I help?</my-chat-message>
```

<br>

# Next

The `ChatMessage` web component is now complete. You can start using it in the `Chat` to represent user and assistant messages.

➡️ [Continue to integrate ChatMessage in the Chat](./4_Use_ChatMessage.md)