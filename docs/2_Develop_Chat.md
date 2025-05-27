# Develop `Chat` web component

Time for the fun part! As you code, the development server will automatically refresh the `index.html` page so you can instantly see your changes.

<br>

## Prerequisite

The `Chat` web component will make use of two additional packages and we need to install them.

- Install dependencies

```sh
npm i @ui5/webcomponents-fiori @ui5/webcomponents-icons
```

- Stop the current server (`CTR + C`) and restart the server

```sh
npm start
```

## 1. Create `Chat` web component

Use the `create-ui5-element` command to generate the boilerplate files for our Chat.

```sh
npm run create-ui5-element Chat
```

This command will generate the following files:

- src/Chat.ts – The TypeScript class that defines the component logic
- src/ChatTemplate.tsx – The JSX-based template for the component
- src/Chat.css – The CSS file for styling the component


## 2. Add `Chat` to the index.html

The `src/bundle.esm.ts` is the main entry point where all components and additional logic used in the `index.html` are imported and assembled, so let's:

- Import our new web component there: `import Chat from ./Chat.js`;
- Add it to the `index.html`: `<my-chat></my-chat>`.

The test page will reload and render the `Chat` web component.
At the moment, it's almost blank, rendering just `<div>Hello World!</div>`,
so let’s get our hands dirty!


## 3. Create the `Chat` Opener Button

The `opener` button is the element that toggles the `Chat` web component.

We will make use of the standard UI5 Web Components `Button`,
and will place it in the bottom-roght corner of the screen.

- First, clean up the `Chat` class to start fresh

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js";

@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
class Chat extends UI5Element {
}

Chat.define();

export default Chat;

```

- Render the `Button` inside the template `src/ChatTemplate.tsx`

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";

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
		</div>
	);
}

```

- Position the opener by adding these styles to `src/themes/Chat.css`

```css
.my-chat-root {
	font-family: var(--sapFontFamily);
	font-size: var(--sapFontSize);
}

.my-chat-opener-btn-container {
	display: block;
	min-width: 1px;
	overflow: visible;
	background: transparent;
	border: none;
	inset: unset;
	margin: 0;
	padding: 0;
	right: 1rem;
	bottom: 1rem;
}

```


## 4. Open the Chat's Popover

The popover, the chat itself, should open upon pressing the "opener" button.
As for the popover part, we are going to use the `Popover` UI5 Web Component.


- Add `open` property

The Chat's `open` property allows the consumers to declaratively open the Chat via `<my-chat open></my-chat>`.

```diff
class Chat extends UI5Element {
+	@property({ type: Boolean })
+	open = false;
}
```

- Add `onOpenerBtnClick` event listener that only updates the `open` property - `true|false`.

```diff
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

+	onOpenerBtnClick() {
+		this.open = !this.open;
+	}
}
```

- Attach the `onOpenerBtnClick` event listener for the Button's `click`

```diff
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="my-chat-root">
			<div class="my-chat-opener-btn-container" popover="auto">
				<Button
					id="opener-btn"
					icon={headsetIcon}
+					onClick={this.onOpenerBtnClick}
				/>
			</div>
		</div>
	);
}
```

- Render the `Popover` UI5 Web Component

Set Popover's `opener` to the button ID - `opener="opener-btn"` to let the Popvoer open exactly placed above the button. And bind its Popover's `open` property for the Chat's `open` property,
so that the Popover opens/closes according to the Chat's `open` value.

```diff
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";

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

+			<Popover
+				opener="opener-btn"
+				open={this.open}
+			>
+			</Popover>
		</div>
	);
}
```

**How it works:** whenever someone clicks the "opener" button, the `onOpenerBtnClick` handler gets called => the Chat's `open` property is updated => this re-renders the `Chat` and its template gets executed => in the template, we update the Popover's `open` property, which controls the Popover's open/closed state.



## 5. The Chat Header

The `Chat` header includes a title text and minimize button.
For that purpose we will use `Bar`, `Title` and `Button` web components.

- Add `headerTitle` property
- Add `onMinimizeBtnClick` handler

```ts
class Chat extends UI5Element {
	@property()
	headerTitle?: string;

	onMinimizeBtnClick() {
		this.open = false;
	}
}
```

```tsx
    <Bar slot="header" design="Subheader">
        <Title slot="startContent">
            {this.headerTitle ?? "My custom UI for chatbot"}
        </Title>
        <Button
            onClick={this.onMinimizeBtnClick}
        />
    </Bar>
```


## 6. The Chat Content

The content of `Chat` is the area of the messages.
However, before any messages are being exchanged, we would like to have welcoming message.
For the puropse, we will make use of the available `IllustratedMessage` web component.

- Make Use of `IllustratedMessage`


```tsx
    <div class="my-chat-content">
		<div class="my-chat-messages">
				<IllustratedMessage
					design={IllustrationMessageDesign.Dialog}
					titleText="How can I assist you today?"
					subtitleText="Please enter your query to begin the conversation."
				/>
			)}
		</div>
	</div>
```

## 7. The Chat's Prompt Area

The input area consists of text area that we type in and a button to submit the message. For the purpose we we will make use of the available `TextArea` and `Button` UI5 Web Components.


- add `message` event
- add `onMessageBtnClick` event handler

[Next: Develop ChatBubble](./3_Develop_ChatBubble.md)