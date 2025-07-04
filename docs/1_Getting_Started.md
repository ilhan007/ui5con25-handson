# Getting Started

`UI5 Web Components` provides tools for quickly bootstrapping a new project using the `@ui5/webcomponents-package`. It sets up a project skeleton that includes a demo web component, TypeScript and JSX (TSX) support, and a development server.

<br>

## 1. Create New Project

Open your terminal in any folder and initialize a new project using the `@ui5/webcomponents-package`:


```sh
npm init @ui5/webcomponents-package@latest
```

<br>

## 2. Follow the Prompts

The CLI will guide you through a series of prompts:

- Install @ui5/webcomponents-package - **`Press [ENTER] to continue`**
- Package name: Type **`ui5con`**
- How would you like to set up testing?: Choose **`Cypress`**
- - Cypress (recommended)
- - I'll set it up manually

<br>

## 3. Run the Project

After the project is initialized, navigate into the newly created folder, install dependencies, and start the development server:

```sh
cd ui5con
npm i
npm start
```

<br>

## 4. Open the index.html Page

Once the dev server starts, a browser window will open automatically.
Click the link to `index.html` to open the test page.

<br>

<img width="1032" alt="Screenshot 2025-06-11 at 17 55 44" src="https://github.com/user-attachments/assets/2113c572-9de6-42dd-9d2b-99315b0436fc" />

<br>
<br>

- ✅ **Try the demo component**

Your project includes a `MyFirstComponent (my-first-component)` web component that's already rendered in the `test/index.html` to demonstrate some key points of web components development.

It's interactive — clicking on it increments a counter.

<br>

- 🎨 **Switch themes**
  
Theming is preconfigured. You can explore SAP’s latest design themes (Morning Horizon, Evening Horizon, Horizon HCB, and Horizon HCW) using the links below the component.

<br>


## 5. Open the Project in Your IDE

The folder structure may seem overwhelming at first, but you'll get comfortable with it quickly. Let’s walk through the most important files, starting with the  `MyComponent` demo component.

<br>

### **`src/MyFirstComponent.ts`**

This file defines the custom web component using `TypeScript` and `decorators`. It sets up the component's tag, properties, styles, and template:

```js
@customElement({
	tag: "my-first-componen",
	renderer: jsxRenderer,
	styles: MyComponentCss,
	template: MyComponentTemplate,
})
class MyFirstComponent extends UI5Element {
```

The component includes a single property, `count`, defined with the `@property` decorator.
Clicking the component triggers the `onClick` handler that increments the `count`.

```js
  @property({ validator: Integer, defaultValue: 0 })
  count!: number;

  onClick() {
    this.count++;
  }
```

**Note:** You’ll be using the `@property` decorator often. Properties defined with this decorator become part of the component's metadata. When these metadata properties change, the component automatically re-renders, ensuring the UI stays in sync with the state.


<br>

### **`src/MyFirstComponentTemplate.tsx`**

This file defines the component's template using JSX (in this case, TSX). It determines what gets rendered when the component is used.

The TSX format combines HTML-like syntax with TypeScript benefits like type checking and editor support:

```tsx

export default function MyFirstComponentTemplate(this: MyFirstComponent) {
	return (
		<div onClick={this.onClick}>{this.counterText} :: {this.count}</div>
  );
}
```

<br>

### **`src/themes/MyFirstComponent.css`**

This file contains styles scoped to your component and applied to the elements defined in your template.

<br>

### **`test/index.html`**

This file is used to test your web components.

Currently, it includes the demo component:

```html
<my-component></my-component>
```

To try out different states, you can add another instance with an initial `count` value:

```html
<my-first-component count="5"></my-first-component>
```
<img width="188" alt="Screenshot 2025-06-11 at 17 59 53" src="https://github.com/user-attachments/assets/127034cd-c118-423a-baf4-2dee01fdf862" />

<br>

The `@property` decorator bridges `attributes` and `properties`. Whether you use declarative HTML or set the property programmatically, the value remains consistent:

```html
<!-- Declarative via attribute -->
<my-first-component count="10"></my-first-componen>
```

```js
// In DevTools Console
// Select the component in the Elements tab
$0.count = 10;
```


# Next

➡️ [Develop `Chat` web component](./2_Develop_Chat.md)
