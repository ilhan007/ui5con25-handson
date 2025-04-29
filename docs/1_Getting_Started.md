# Getting Started

UI5 Web Components provides tools for bootstrapping a project using the `@ui5/webcomponents-package`. It sets up a project skeleton with a demo web component, TypeScript and JSX support, and a development server.

<br>

## 1. Create New Project

Open your terminal in any folder on your file system
and use the @ui5/webcomponents-package to initialize the project:


```sh
npm init @ui5/webcomponents-package@2.9.0
```

<br>

## 2. Follow the Prompts

You’ll be guided through a series of prompts:

- install @ui5/webcomponents-package - **`Press [ENTER] to continue`**
- Package name: Type **`ui5con`**
- How would you like to set up testing?: Choose **`Cypress`**
- - Cypress (recommended)
- - I'll set it up manually

<br>

## 3. Run the Project

After initialization, navigate to your new project folder, install dependencies,
and start the dev server:

```sh
cd <packageName>
npm i
npm start
```

<br>

## 4. Open the index.html Page

Once the dev server starts, a browser window will open automatically.
Click the link to `index.html` to open the test page.

<br>

- **Try the demo component**

Your project includes a `MyComponent (demo-counter)` web component that's already rendered in the index.html.
It's interactive — clicking on it increments a counter.

<br>

- **Switch themes**
  
Theming is enable. You can try out the latest Horizon theme family (Morning Horizon, Evening Horizon, Horizon HCB and Horizon HCW), via the links below the component.

<br>


## 5. Open the Project in Your IDE

At first, the folder structure might look a bit overwhelming, but don’t worry — you’ll get used to it quickly.
Let's explore the `MyComponent` demo web component and understand the following key files:

<br>

### **`src/MyComponent.ts`**

This file defines the custom component — its tag, properties, styles, and template—using `TypeScript` and `TypeScript decorators`:

```js
@customElement({
	tag: "my-component",
	renderer: jsxRenderer,
	styles: MyComponentCss,
	template: MyComponentTemplate,
})
class MyComponent extends UI5Element {
```

The demo component includes a single property, count, defined with the `@property` decorator.
Clicking the component triggers an the `onClick` handler that increments count.

```js
  @property({ validator: Integer, defaultValue: 0 })
  count!: number;

  onClick() {
    this.count++;
  }
```

**Note:** Whenever a component property (i.e., state) changes, the component automatically re-renders.wdio

<br>

### **`src/MyComponentTemplate.tsx`**

This file defines the component's template using JSX.
Currently, it’s minimal to give you a clean starting point.

```tsx

export default function MyComponentTemplate(this: MyComponent) {
	return (
		<div onClick={this.onClick}>{this.counterText} :: {this.count}</div>
  );
}
```

<br>

### **`src/themes/MyComponent.css`**

This is where you define the styles for your component.
These styles are applied to the elements in the JSX template above.

Next [Develop `Chat` web component](./2_Develop_Chat.md)
