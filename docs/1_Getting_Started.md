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

Your project includes a `MyComponent (my-component)` web component that's already rendered in the `test/index.html` to demonstrate some key points of web components development.

It's interactive — clicking on it increments a counter.

<br>

- **Switch themes**
  
Theming is also set up as it's a common requirement for web components to support different themes. You can try out the latest SAP design theme family (Morning Horizon, Evening Horizon, Horizon HCB, and Horizon HCW), via the links below the component.

<br>


## 5. Open the Project in Your IDE

At first, the folder structure might look a bit overwhelming, but don’t worry — you’ll get used to it quickly.
Let's explore the `MyComponent` demo web component and understand the following key files:

<br>

### **`src/MyComponent.ts`**

This file defines the custom web component — its tag, properties, styles, and template—using `TypeScript` and `TypeScript decorators`:

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

**Important** 

We are going to use the `@property` decorators a lot today, so let's explain it.

Properties, defined via the `@property` decorator are invalidating - whenever a property changes, the component automatically re-renders.




<br>

### **`src/MyComponentTemplate.tsx`**

This file defines the component's `template` - the HTML markup that will be rendered whenever someone uses the web component's tag. 

The template is written in `JSX` (TSX) and it allows us to write HTML-like code inside JavaScript. We use its TypeScript flavor, `TSX`, benefiting from static type checking and advanced editor support.


Currently, it’s minimal to give you a clean starting point.
It shows how the event handler is attached and the component's state is rendered.

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

<br>

### **`test/index.html`**

This is where we will test our web components.

 Currently, it includes the demo web component, that you played with:
```html
<my-component></my-component>
```

To get a bit more taste you can add one more instance of it, with initial `count` value:

```html
<my-component count="5"></my-component>
```

Properties defined using the `@property` decorator hide an additional layer of complexity by synchronizing `attributes` and `properties`. This ensures consistent behavior whether you set the `count` declaratively via the attribute or programmatically through the property.

```html
<!-- attribute syntax -->
<my-component count="10"></my-component>
```

```js
// open the DEV tools
// click on the my-component tag in Elements view
// change "count" via the property syntax
$0.count = 10;
```


## Next

[Develop `Chat` web component](./2_Develop_Chat.md)