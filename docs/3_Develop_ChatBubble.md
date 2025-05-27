# Develop `ChatBubble` Web Component

The `ChatBubble` web component represents the message that is sent by the user and received by the assistant. To differenciate between the request and the respond the `ChatBubble` comes in two design flavours.

<br>

## 1. Create `ChatBubble` Web Component

Once more we will use the `create-ui5-element` command to generate the boilerplate files for us (`src/ChatBubble.ts`, `src/ChatBubbleTemplate.tsx` and `src/themes/ChatBubble.css`).

```sh
npm run create-ui5-element ChatBubble
```

**Note:** by default the tag is set to `my-chat-bubble` in the `src/ChatBubble.ts`.

<br>

## 2. The `ChatBubble.ts` Class

The `create-ui5-element` command creates some code fro demo purposes, let's clean everything
leaveing the minimum code.

Replace the `src/ChatBubble.ts` with the following code:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatBubbleTemplate from "./ChatBubbleTemplate.js";

// Styles
import ChatBubbleCss from "./generated/themes/ChatBubble.css.js";


@customElement({
	tag: "my-chat-bubble",
	renderer: jsxRenderer,
	styles: ChatBubbleCss,
	template: ChatBubbleTemplate,
})
class ChatBubble extends UI5Element {
}

ChatBubble.define();

export default ChatBubble;

```

<br>

## 3. The `ChatBubbleTemplate` Template

As the `ChatBubble` shows plain text, the template is pretty simple.
We make use of the `slot` element to render the text content, passed to the `ChatBubble`.

Open the `src/ChatBubbleTemplate.tsx` file and apply the following:

```diff
import type ChatBubble from "./ChatBubble.js";

export default function ChatBubbleTemplate(this: ChatBubble) {
+   return (
+		<div>
+			<slot></slot>
+		</div>
+	);
}
```

<br>

## 4. The `ChatBubble` Styles

The component would need some styles to turn into a message bubble.
Open the `src/themes/ChatBubble.css` file and add the following CSS:

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

## 5. Add `ChatBubble` to the `index.html`

Open the `test/index.html` and include the `<my-chat-bubble>` tag at a random place:

```html
<my-chat-bubble>My message</my-chat-bubble>`
```

<br>

## 6. Add Second Type of `ChatBubble`

The default appearance of `ChatBubble` will be used when the user prompts a message.
And for the response we will provide second styling.


- Add `type` property to the `ChatBubble`

For the purpose, we make use of the `@property` decorator. Properties, defined via the `@property` decorator are "invalidating" - the component will re-render automatically if property value changes.

Additionally, we create an enum ChatBubbleType that defines two typess of ChatBubble - "User" and "Assistant"


```diff
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
+import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

+enum ChatBubbleType {
+	User = "User",
+	Assistant = "Assistant",
+}

class ChatBubble extends UI5Element {
+   @property()
+   type?: `${ChatBubbleType}`; // Can we just use ChatBubbleType for simplicity
}

ChatBubble.define();

export default ChatBubble;

```

<br>

- Add the following style to the `src/themes/ChatBubble.css`

The style applies on the `host`, meaning the `my-chat-bubble` tag,
f.e when someone uses the component like: `<my-chat-bubble type="Assistant">My message</my-chat-bubble`>

```css
:host([type="Assistant"]) {
	background-color: var(--sapInformationBackground);
}
```

<br>

## The ChatBubble is Ready To Go!

[Next: Use ChatBubble in the Chat](./4_Use_ChatBubble%20.md)