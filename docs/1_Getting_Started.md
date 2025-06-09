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

- ✅ **Try the demo component**

Your project includes a `MyComponent (my-component)` web component that's already rendered in the `test/index.html` to demonstrate some key points of web components development.

It's interactive — clicking on it increments a counter.

<br>

- 🎨 **Switch themes**
  
Theming is preconfigured. You can explore SAP’s latest design themes (Morning Horizon, Evening Horizon, Horizon HCB, and Horizon HCW) using the links below the component.

<br>


## 5. Open the Project in Your IDE

The folder structure may seem overwhelming at first, but you'll get comfortable with it quickly. Let’s walk through the most important files, starting with the  `MyComponent` demo component.

<br>

### **`src/MyComponent.ts`**

This file defines the custom web component using `TypeScript` and `decorators`. It sets up the component's tag, properties, styles, and template:

```js
@customElement({
	tag: "my-component",
	renderer: jsxRenderer,
	styles: MyComponentCss,
	template: MyComponentTemplate,
})
class MyComponent extends UI5Element {
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

### **`src/MyComponentTemplate.tsx`**

This file defines the component's template using JSX (in this case, TSX). It determines what gets rendered when the component is used.

The TSX format combines HTML-like syntax with TypeScript benefits like type checking and editor support:

```tsx

export default function MyComponentTemplate(this: MyComponent) {
	return (
		<div onClick={this.onClick}>{this.counterText} :: {this.count}</div>
  );
}
```

<br>

### **`src/themes/MyComponent.css`**

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
<my-component count="5"></my-component>
```

The `@property` decorator bridges `attributes` and `properties`. Whether you use declarative HTML or set the property programmatically, the value remains consistent:

```html
<!-- Declarative via attribute -->
<my-component count="10"></my-component>
```

```js
// In DevTools Console
// Select the component in the Elements tab
$0.count = 10;
```


# Next

➡️ [Develop `Chat` web component](./2_Develop_Chat.md)
