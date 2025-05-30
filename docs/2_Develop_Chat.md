# Develop `Chat` web component


<br>

## Prerequisite

We will make use of two additional ready-to-use web components and icons, provided by UI5 Web Components
and focus on the Chat's specifics, instead of rebuilding every single piece - like buttons, inputs, etc.

- Stop the current server (`CTR + C`)

- Install dependencies

```sh
npm i @ui5/webcomponents @ui5/webcomponents-fiori @ui5/webcomponents-icons
```

- Start the dev server again
```sh
npm start
```

As you code, the development server will automatically refresh the `index.html` page so you can instantly see your changes.

<br>

## 1. Create `Chat` web component

The `Ui5 Web Components` tools provide the `create-ui5-element` command to generate the boilerplate files for a new component. Let's use it.

```sh
npm run create-ui5-element Chat
```

This command will generate the following files:

- `src/Chat.ts` – The TypeScript class that defines the component logic
- `src/ChatTemplate.tsx` – The JSX-based template for the component
- `src/Chat.css` – The CSS file for styling the component

<br>

## 2. Add `Chat` to the index.html

The `src/bundle.esm.ts` is the main entry point where all components and additional logic used in the `index.html` are imported and assembled, so let's:

- Import the Chat in `src/bundle.esm.ts`: `import "./Chat.js"`;
- Add the Chat to the `test/index.html`: `<my-chat></my-chat>`.

<br>

The test page should reload and render the `Chat` web component.
It's almost blank, just a simple text `<div>Hello World!</div>`.

<br>

## 3. Create the `Chat` Opener Button

The `opener` button is the element that opens and closes the `Chat`.

We will make use of the standard UI5 Web Components `Button`,
and will place it in the bottom-right corner of the screen.

<br>

#### 3.1 Clean up the `Chat` class to start fresh

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

#### 3.2 Render `Button` inside the template `src/ChatTemplate.tsx`

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

**Note:** If your IDE complains about the imports, restart it (the IDE did not reflect the newly installed dependencies.

<br>

### 3.3 Position the Opener 

-  Add these styles to `src/themes/Chat.css` 

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

The Opener Button should be visible in the bottom-right corner of the test page.

<br>

## 4. Create Chat's Popover

The popover is the most important part of the `Chat` where the chat exchange will happen.
And it should open upon pressing the Opener Button.

<br>

### 4.1 Render the Chat's `Popover`

As for the popover itself, we are going to use the standard `Popover` from UI5 Web Components

It has a pretty simple API:

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

### 4.2 Open Chat's Popover


In the previous step we bound Popover's `open` property to the Chat's `open`, 
so that the Popover opens/closes according to the Chat's `open` value.

Adding an `open` property on Chat's level will allow consumers to open and close the `Chat`
declaratively via HTML attribute.


- Add `open` property

```ts
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;
}
```

**Note:** In the previous step we bound Пopover's `open` property to the Chat's `open`, so that the Popover opens/closes according to the Chat's `open` value.

<br>

- Set `open` as attribute `<my-chat open></my-chat>` in the `test/index.html` 

You should see a blank popover, shown over the Opener Button.

<br>

============= TODO: Show image =============

<br>

### 4.3 Open Chat's Popover on Opener Button press

To toggle the Chat's popover on the Opener Button press,
we need to add a `click` listener that updates the `open` property - `true|false`.

- Add the `onOpenerBtnClick` listener to `src/Chat.ts`:

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

- Attach `onOpenerBtnClick` listener to the Opener Button in `src/ChatTemplate.tsx`:

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
					onClick={this.onOpenerBtnClick} // the handler
				/>

				{/* The Popover */}
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

Now, pressing the Opener Button should open/close the Chat's popover.

To break it down, whenever someone clicks the "opener" button:
- => The `onOpenerBtnClick` handler gets called
- => The Chat's `open` property is updated 
- => This re-renders the `Chat` and its template gets executed
- => In the template, we update the Popover's `open` property and as a result, the Popover opens or closes.

<br>

## 5. The Chat Header

The `Chat` header includes a Title Text and a Minimize Button.
For that purpose, we will use the available `Bar`, `Title` and `Button` UI5 Web Components.

<br>

### 5.1 Display Title Text

We will add a new property to allow our consumers to define the Chat's title.

-  Add `headerTitle` property

```ts
class Chat extends UI5Element {
	@property()
	headerTitle: string = "My custom UI forchatbot";
}
```

<br>

-  Render Chat's title into `src/ChatTemplate.tsx`

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


- Define your title

```html
<my-chat header-title="UI5con"></my-chat>
```

<br>

**Note:** This example reveals another feature that comes out of the box. When a `property` name is written in `camelCase`,
its corresponding HTML `attribute` is automatically converted to `kebab-case`.
For example, `headerTitle` becomes `header-title`. This conversion follows standard HTML conventions, where kebab-case is preferred for attribute names.

<br>

### 5.2 Display Minimize Button

In this step, we render add one more button to the Chat's header.
Clicking on the button should close the Chat's Popover.
To do so, we need to add a `click` handler and update Chat's `open` state.

<br>

- Add `onMinimizeBtnClick` handler

```ts
class Chat extends UI5Element {
	onMinimizeBtnClick() {
		this.open = false;
	}
}
```

<br>

- Render `Minimize Button`

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

For a welcome message, we will use the available `IllustratedMessage` UI5 web component.
It is a really nice web component that comes with a default illustration and offers API to add description (`titleText` and `subtitleText`).

<br>

- Import the IllustratedMessage: `import IllustratedMessage from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";`

- Render `IllustratedMessage` inside the `Popover`

```tsx
// ...
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

### 6.2 Style the Content

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

## Next

The next step is to show messages - it is chat at the end.
For the messages, we will develop a tiny web component!

[Develop ChatBubble](./3_Develop_ChatBubble.md)
