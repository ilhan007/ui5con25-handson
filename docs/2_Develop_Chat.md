# Develop `Chat` web component


<br>

## Prerequisite

We'll build on top of existing UI5 Web Components to focus on the Chat-specific logic — no need to reimplement basics like buttons or popovers.
So, let's install several UI5 Web Components packages.

- Stop the development server

- Install the required UI5 Web Components

```sh
npm i @ui5/webcomponents @ui5/webcomponents-fiori @ui5/webcomponents-icons
```

- Restart the development server

```sh
npm start
```

As you code, the development server will automatically refresh the `index.html` page so you can instantly see your changes.

<br>

## 1. Generate `Chat` web component

Open second terminal window (don't stop the running server) in the project's root.
And, use the `create-ui5-element` CLI command to scaffold the new component:

```sh
npm run create-ui5-element Chat
```

This generates:

- `src/Chat.ts` – Component logic
- `src/ChatTemplate.tsx` – The JSX-based component template
- `src/Chat.css` – Component styling

<br>

## 2. Add `Chat` to the index.html

The `src/bundle.esm.ts` is the main entry point where all components and additional logic used in the `index.html` are imported and assembled, so let's:

- Import the Chat in `src/bundle.esm.ts`:

```ts
import "./Chat.js";
```

- Add the Chat to the `test/index.html`

You can place it anywhere, for example in the main content:

```html
<!-- ... -->
<main class="app-main">

	<div class="app-main-demo">
		<h2>Congrats! It's your First Web Component 🎉</h2>
		<my-first-component id="myFirstComponent" count="5"></my-first-component>

		<my-chat></my-chat>
		<!-- ... -->
```

<br>

The test page should reload and render the `Chat` web component.
You should see a simple placeholder:  `<div>Hello World!</div>`.

<img width="112" alt="Screenshot 2025-06-12 at 11 11 01" src="https://github.com/user-attachments/assets/d10d7457-210a-42d6-a191-62e6113c9bde" />

<br>

## 3. Add the `Chat` Opener Button

This button toggles the chat popover.
We’ll use the `Button` component from UI5 and place it in the bottom-right corner.

<br>

### 3.1 Clean up the `Chat` class

The scaffolded code includes a demo setup that we’ll now clean up.

Replace the default class in `src/Chat.ts` with:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
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

<br>

### 3.2 Render the `Button` in the Template

Update `src/ChatTemplate.tsx` to include the Opener Button:

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
				/>
			</div>
		</div>
	);
}

```

**Tip:** Close and reopen your IDE if the imports fail — the IDE might not yet recognize newly installed packages.

<br>

### 3.3 Style the Opener Button

Add the following styles to `src/themes/Chat.css` 

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

Now the button should appear in the bottom-right corner of the page.

<img width="57" alt="chat_opener_1" src="https://github.com/user-attachments/assets/6bef67dd-9a1e-4033-8455-41aa623531a6" />

<br>

## 4. Add the Chat's Popover

The popover is where the chat conversation will happen. It opens when the Opener Button is pressed 
and includes header, content and user prompt areas.
<br>

<img width="752" alt="Screenshot 2025-06-02 at 12 12 13" src="https://github.com/user-attachments/assets/c97070b5-90b5-44e7-b132-495bee1ce708" />

<br>

### 4.1 Render the Popover

We'll use the UI5 Popover web component and bind its `open` state to our component.

The Popover has simple API:
- `opener`- to let the Popover know its opener and show up exactly aligned over it
- `open` - to open or close it
- `placement` - to show up on top of the opener

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="my-chat-root">
			<div class="my-chat-opener-btn-container" popover="auto">
				<Button
					id="opener-btn"
					icon={headsetIcon}
				/>
			</div>

			{/* The Popover */}
			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
			</Popover>
		</div>
	);
}

```

The static checks kick in immediately and we get a warning `this.open` does not exist and it's true.
This is one small example shows how powerful JSX templates are.

<img width="561" alt="chat_opener_2" src="https://github.com/user-attachments/assets/05742d8b-1b3a-4874-9f55-a63b86c460bf" />



<br>

### 4.2 Define the `open` Property


In the previous step, we saw that we only need to set Popover's `open` property to open or close the Popover.

We will add an `open` property on Chat's level as well using the `@property` decorator, that will forward to the internally used Popover,
because it's not accessible from outside (it's part of the Chat's Shadow DOM).

- Import the `@property` decorator and add `open` property to `src/Chat.ts`:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

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
	@property({ type: Boolean })
	open = false;
}

Chat.define();

export default Chat;

```

<br>

- Set `open` attribute to `my-chat` in the `test/index.html`:

```html
<my-chat open></my-chat>
```

<br>

You should see a blank popover, shown over the Opener Button.

<img width="138" alt="Screenshot 2025-06-12 at 11 18 33" src="https://github.com/user-attachments/assets/42defd99-015d-43dd-983e-e5006399ff5b" />

<br>
<br>

### 4.3 Toggle Popover with the Opener Button

To toggle the Chat's popover on pressing the Opener Button,
we need to add a `click` handler that updates the `open` property.

- Add `onOpenerBtnClick` handler to `src/Chat.ts`:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js"

@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

	onOpenerBtnClick() {
		this.open = !this.open;
	}
}

Chat.define();

export default Chat;

```

<br>

- Attach the handler in the `src/ChatTemplate.tsx` template:

We encourage you to manually code it to get an impression of the code completion of the event name and the event handler!

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="my-chat-root">
			<div class="my-chat-opener-btn-container" popover="auto">
				<Button
					id="opener-btn"
					icon={headsetIcon}
					{/* The handler */}
					onClick={this.onOpenerBtnClick}
				/>
			</div>

			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
			</Popover>
		</div>
	);
}

```

<br>

Clicking the button now toggles the popover.

<br>

## 5. The Chat Header

Let’s enhance the Chat's Popover with a header containing a title and a minimize button.
We are going to use the `Bar` (as container), `Button` and `Title` UI5 Web Components.

<img width="671" alt="Screenshot 2025-06-02 at 11 25 57" src="https://github.com/user-attachments/assets/33eb4cf0-f261-4470-8f4d-768bd13a2229" />

<br>

### 5.1 Add Title Text

We will add a new property to allow our consumers to define the Chat's title.

-  Add `headerTitle` property

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js"

@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

	@property()
	headerTitle: string = "My custom UI for chatbot";

	onOpenerBtnClick() {
		this.open = !this.open;
	}
}

Chat.define();

export default Chat;

```

<br>

- Render the `headerTitle` into `src/ChatTemplate.tsx`:

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Title from "@ui5/webcomponents/dist/Title.js";

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

			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
				{/* The Header Bar */}
				<Bar slot="header" design="Subheader">
					{/* The Title */}
					<Title slot="startContent">
						{this.headerTitle}
					</Title>
				</Bar>
			</Popover>
		</div>
	);
}

```

<br>


- Use it like so:

```html
<my-chat header-title="UI5con"></my-chat>
```

<img width="178" alt="Screenshot 2025-06-12 at 11 33 13" src="https://github.com/user-attachments/assets/78feb6fe-c33d-48c5-bb85-f09cff693d68" />

<br>

**Note:** This example reveals another feature that comes out of the box. When a `property` name is written in `camelCase`,
its corresponding HTML `attribute` is automatically converted to `kebab-case`.
For example, `headerTitle` becomes `header-title`. This conversion follows standard HTML conventions, where kebab-case is preferred for attribute names.

<br>

### 5.2 Add Minimize Button

<br>

- Add `onMinimizeBtnClick` handler:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Template
import ChatTemplate from "./ChatTemplate.js";

// Styles
import ChatCss from "./generated/themes/Chat.css.js"

@customElement({
	tag: "my-chat",
	renderer: jsxRenderer,
	styles: ChatCss,
	template: ChatTemplate,
})
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

	@property()
	headerTitle: string = "My custom UI for chatbot";

	onOpenerBtnClick() {
		this.open = !this.open;
	}

	onMinimizeBtnClick() {
		this.open = false;
	}
}

Chat.define();

export default Chat;

```

<br>

- Render `Minimize Button` in the header:

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import minimizeIcon from "@ui5/webcomponents-icons/dist/minimize.js";

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

			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
				<Bar slot="header" design="Subheader">
					<Title slot="startContent">
						{this.headerTitle}
					</Title>

					{/* The Minimize Button */}
					<Button
						icon={minimizeIcon}
						onClick={this.onMinimizeBtnClick}
						slot="endContent"
					/>
				</Bar>
			</Popover>
		</div>
	);
}

```

<br>

Now, pressing the Minimize Button should close the Chat's Popover.

<br>

<img width="218" alt="Screenshot 2025-06-12 at 11 34 28" src="https://github.com/user-attachments/assets/b7005b74-6f75-4f40-ad09-dfdc84527d3c" />

<br>

## 6. The Chat Content

The content of `Chat` is the area of the messages.
However, before any messages are exchanged, we would like to have a welcoming message.


### 6.1 Display Welcome Message

We will use the available `IllustratedMessage` UI5 web component.
It comes with a default illustration and offers API to add description (`titleText` and `subtitleText`).

<br>

- Import the `IllustratedMessage` and render it inside the `Popover` in `src/ChatTemplate.tsx`:

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import minimizeIcon from "@ui5/webcomponents-icons/dist/minimize.js";
import IllustratedMessage from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";

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

			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
				<Bar slot="header" design="Subheader">
					<Title slot="startContent">
						{this.headerTitle}
					</Title>

					<Button
						icon={minimizeIcon}
						onClick={this.onMinimizeBtnClick}
						slot="endContent"
					/>
				</Bar>

				{/* The Content with Illustration Message */}
				<div class="my-chat-content">
					<div class="my-chat-messages">
						<IllustratedMessage
							design="Dialog"
							titleText="How can I assist you today?"
							subtitleText="Please enter your query to begin the conversation."
						/>
					</div>
				</div>
			</Popover>
		</div>
	);
}

```

<br>

### 6.2 Style the Chat Content

We need some styles to make the Chat's Popover more visually appealing.

- Add the `.my-chat-popover` CSS class to the Popover in `src/ChatTemplate.tsx`:

```diff
<Popover
	opener="opener-btn"
	open={this.open}
	placement="Top"
+	class="my-chat-popover"
>
```

- Add the following CSS to `src/themes/Chat.css`:

```css
.my-chat-popover {
	width: 100%;
	max-width: 25rem;
	height: 35rem;
}

.my-chat-popover::part(header) {
	padding: 0;
}

.my-chat-popover::part(content) {
	padding: 1rem;
}

.my-chat-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	gap: 1rem;
}

.my-chat-messages {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 0.5rem;
	overflow-y: auto;
}
```


<br>

Looking better, right?

<img width="441" alt="Screenshot 2025-06-12 at 11 35 43" src="https://github.com/user-attachments/assets/00dff16c-7c5f-4067-a9c7-fb78767a15bc" />


<br>

# Next

Next, we’ll implement message bubbles — after all, it's a chat!

➡️ [Continue to Develop ChatMessage](./3_Develop_ChatMessage.md)
