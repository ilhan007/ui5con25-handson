# Develop `ChatLoading` web component

In chat conversations, it's common to have slight delays in responses. 
During delays, it's helpful to display a loading indicator to inform users that a reply is on the way. 

That’s exactly what `ChatLoading` is about.

<br>

## 1. Create `ChatLoading` we component

Use the `create-ui5-element` command to generate the boilerplate files for our ChatLoading.

```sh
npm run create-ui5-element ChatLoading
```

This command will generate the following files:

- `src/ChatLoading.ts` – The TypeScript clss that defines the component logic
- `src/ChatLoadingTemplate.tsx` – The JSX-based template for the component
- `src/ChatLoading.css` – The CSS file for styling the component

<br>

## 2. Clean Up the `ChatLoading` Class

<br>

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import ChatLoadingTemplate from "./ChatLoadingTemplate.js";

// Styles
import ChatLoadingCss from "./generated/themes/ChatLoading.css.js";

@customElement({
	tag: "my-chat-loading",
	renderer: jsxRenderer,
	styles: ChatLoadingCss,
	template: ChatLoadingTemplate,
})
class ChatLoading extends UI5Element {}

ChatLoading.define();

export default ChatLoading;
```

<br>

## 3. Update the `ChatLoadingTemplate.tsx`

We will use available `BusyIndicator` web component to indicate the loading state.

Copy the following in `src/ChatLoadingTemplate.tsx`:

```jsx
import type ChatLoading from "./ChatLoadingTemplate.tsx";

// UI5 Web Components
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function ChatLoadingTemplate(this: ChatLoading) {
	return (
		<BusyIndicator active={true} delay={500} />
	);
}
```

<br>

## 4. Add `ChatLoading` to the `test/index.html`

- Import our newly created web component in `src/bundle.esm.ts`:

 ```js
 import "./ChatLoading.js";
 ```

- Add it to the `test/index.html`:

 ```html
 <my-chat-loading></my-chat-loading>
 ```

At this point the `ChatLoading` should appear as three animated circles:

<img src="./images/chatLoading.png" />

<br>

## Next

The ChatLaoding is Ready!

You are at the final step, make use of the `ChatLoading` in the `Chat`!

[Next: Use ChatLaoding in the Chat](./6_Develop_ChatLoading.md)