# Develop `Chat` web component


<br>

## Prerequisite

We'll build on top of existing UI5 Web Components to focus on the Chat-specific logic — no need to reimplement basics like buttons or popovers.
So, let's install several UI5 Web Components packages.

- Stop the development server

```sh
CTR + C
```

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

Use the `create-ui5-element` CLI command to scaffold the new component:

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
import "./Chat.js"
```

- Add the Chat to the `test/index.html`: 

```html
<my-chat></my-chat>
```

<br>

The test page should reload and render the `Chat` web component.
You should see a simple placeholder:  `<div>Hello World!</div>`.

<br>

## 3. Add the `Chat` Opener Button

This button toggles the chat popover open and closed.
We’ll use the `Button` component from UI5 and place it in the bottom-right corner.

<br>

#### 3.1 Clean up the `Chat` class

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

#### 3.2 Render the `Button` in the Template

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

**Tip:** Restart your IDE if imports fail — it might not yet recognize newly installed packages.

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

<br>

## 4. Add the Chat's Popover

The popover is where the chat conversation will happen. It opens when the Opener Button is pressed.

<br>

### 4.1 Render the Popover

We'll use the UI5 Popover web component and bind its `open` state to our component:

The Popover has simple API:
- `opener`- to let the Popover know its opener and show up exactly aligned over it
- `open` - to open or close it

```tsx
import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
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

			{/* The Popover */}
			<Popover
				opener="opener-btn"
				open={this.open}
			>
			</Popover>
		</div>
	);
}
```

The static checks kick in immediately and we get a warning `this.open` does not exist and it's true.
This is one small example shows how powerful JSX templates are.


============= TODO: Show image =============


<br>

### 4.2 Define the `open` Property


In the previous step, we saw that we only need to set Popover's `open` property to open or close the Popover.

We will add an `open` property on Chat's level as well, that will forward to the internally used Popover,
because it's not accessible from outside (it's part of the Chat's Shadow DOM)

- Add `open` property to `src/Chat.ts`

```ts
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;
}
```

<br>

- Set `open` to `my-chat` in `test/index.html`

```html
<my-chat open></my-chat>` 
```

You should see a blank popover, shown over the Opener Button.

<br>

============= TODO: Show image =============

<br>

### 4.3 Toggle Popover with the Opener Button

To toggle the Chat's popover on pressing the Opener Button,
we need to add a `click` handler that updates the `open` property.

- Add `onOpenerBtnClick` handler to `src/Chat.ts`:

```ts
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

	onOpenerBtnClick() {
		this.open = !this.open;
	}
}
```

<br>

- Attach the handler in the `src/ChatTemplate.tsx` template:

We encourage you to manually code it to get an impression of the code completion of the event name and the event handler!

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
					{/* The handler */}
					onClick={this.onOpenerBtnClick}
				/>

				<Popover
						opener="opener-btn"
						open={this.open}
					>
				</Popover>
			</div>
		</div>
	);
}
```

<br>

Clicking the button now toggles the popover open/closed.

<br>

## 5. The Chat Header

Let’s enhance the Chat's Popover with a header containing a title and a minimize button.

<br>

### 5.1 Add Title Text

We will add a new property to allow our consumers to define the Chat's title.

-  Add `headerTitle` property

```ts
class Chat extends UI5Element {
	@property()
	headerTitle: string = "My custom UI forchatbot";
}
```

<br>

-  Render the `headerTitle` into `src/ChatTemplate.tsx`:

```tsx
import type Chat from "./Chat.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Button from "@ui5/webcomponents/dist/Button.js";
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

<br>

**Note:** This example reveals another feature that comes out of the box. When a `property` name is written in `camelCase`,
its corresponding HTML `attribute` is automatically converted to `kebab-case`.
For example, `headerTitle` becomes `header-title`. This conversion follows standard HTML conventions, where kebab-case is preferred for attribute names.

<br>

### 5.2 Add Minimize Button

<br>

- Add `onMinimizeBtnClick` handler:

```ts
class Chat extends UI5Element {
	onMinimizeBtnClick() {
		this.open = false;
	}
}
```

<br>

- Render `Minimize Button` in the header:

```tsx
import type Chat from "./Chat.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
// New icon for Minimize Button
import minimizeIcon from "@ui5/webcomponents-icons/dist/minimize.js";
import Button from "@ui5/webcomponents/dist/Button.js";
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

============= TODO: Show image =============

<br>

## 6. The Chat Content

The content of `Chat` is the area of the messages.
However, before any messages are exchanged, we would like to have a welcoming message.


### 6.1 Display Welcome Message

We will use the available `IllustratedMessage` UI5 web component.
It comes with a default illustration and offers API to add description (`titleText` and `subtitleText`).

<br>

- Import the IllustratedMessage an render it inside the `Popover`:

```tsx
import IllustratedMessage from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";

<IllustratedMessage
	design="Dialog"
	titleText="How can I assist you today?"
	subtitleText="Please enter your query to begin the conversation."
/>
```

```tsx
// ...
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
						{this.headerTitle ?? "My custom UI for chatbot"}
					</Title>
					<Button
						icon={minimizeIcon}
						onClick={this.onMinimizeBtnClick}
						slot="endContent"
					/>
				</Bar>

				{/* The Content with Illustration */}
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

- Add `class="my-chat-popover"` to the `Popover` in `src/ChatTemplate.tsx`

```tsx
// ...
export default function ChatTemplate(this: Chat) {
	return (
			<Popover
				class="my-chat-popover"
			>
			</Popover>
	);
}
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

============= TODO: Show image =============

<br>

# Next

Next, we’ll implement message bubbles — after all, it's a chat!

➡️ [Continue to Develop ChatMessage](./3_Develop_ChatMessage.md)
