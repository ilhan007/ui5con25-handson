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

- Position the Opener Button


- Open the Chat's Popover


```ts
class Chat extends UI5Element {
	@property({ type: Boolean })
	open = false;

	onOpenerBtnClick() {
		this.open = !this.open;
	}
}
```

### 5. The Chat Header

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


### 6. The Chat Content

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

### 7. The Chat's Prompt Area

The input area consists of text area that we type in and a button to submit the message. For the purpose we we will make use of the available `TextArea` and `Button` UI5 Web Components.


- add `message` event
- add `onMessageBtnClick` event handler

[Next: Develop ChatBubble](./3_Develop_ChatBubble.md)