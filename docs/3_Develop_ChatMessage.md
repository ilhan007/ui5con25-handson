# Develop `ChatMessage` Web Component

The `ChatMessage` web component represents the message that is sent by the user and received by the assistant.
To differentiate between the request and the response the `ChatMessage` will support two design flavors.

<img width="110" alt="Screenshot 2025-06-02 at 12 00 30" src="https://github.com/user-attachments/assets/9d481929-5d45-45d5-b035-f7880d62e054" />

<br>

<img width="400" alt="Screenshot 2025-06-02 at 11 59 42" src="https://github.com/user-attachments/assets/a49d6dde-2d73-46e6-aa17-34b98832f7e9" />

<br>

## 1. Generate `ChatMessage` Web Component

Open second terminal window (don't stop the running server) in the project's root.
And, use the `create-ui5-element` CLI command to scaffold the new component:

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
Let's use of the `slot` element to render any text content, passed to the `ChatMessage`.

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

You can place it anywhere in the `test/index.html`, for example in the main content:

```html
<!-- ... -->
<main class="app-main">

	<div class="app-main-demo">
		<h2>Congrats! It's your First Web Component 🎉</h2>
				
		<my-chat></my-chat>
		<my-chat-message>What's the weather like?</my-chat-message>
		<!-- ... -->
```

<br>

## 6. Add Second `ChatMessage` Type

To differentiate between user messages and assistant responses,
we’ll extend the component to support multiple styles using a `type` property.

<br>

<img width="182" alt="Screenshot 2025-06-02 at 12 00 39" src="https://github.com/user-attachments/assets/874f3b16-365e-437b-9bc5-0e2230057ced" />

<img width="848" alt="Screenshot 2025-06-02 at 12 06 57" src="https://github.com/user-attachments/assets/bd166b3a-043a-45c0-ae74-fbdb3bfad4ce" />

<br>
<br>

### 6.1 Add `type` Property

We use the `@property` decorator - don't forget to import it.
Additionally, we create an enum `ChatMessageType` that defines two types - `User` and `Assistant`.

Update `src/ChatMessage.ts` to include the `type` property and an `enum` definition:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Template
import ChatMessageTemplate from "./ChatMessageTemplate.js";

// Styles
import ChatMessageCss from "./generated/themes/ChatMessage.css.j

enum ChatMessageType {
	User = "User",
	Assistant = "Assistant",
}

@customElement({
	tag: "my-chat-message",
	renderer: jsxRenderer,
	styles: ChatMessageCss,
	template: ChatMessageTemplate,
})
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

Add one more instance of `my-chat-message` in the `test/index.html` to see the difference:

```html
<my-chat-message>What's the weather like?</my-chat-message>
<my-chat-message type="Assistant">Partly cloudy and warm</my-chat-message>
```

<br>

============ Show Image ============

# Next

The `ChatMessage` web component is now complete. You can start using it in the `Chat` to represent user and assistant messages.

➡️ [Continue to integrate ChatMessage in the Chat](./4_Use_ChatMessage.md)
