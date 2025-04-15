# Develop `Chat` web component

Time for the fun part! As you code, the development server will automatically refresh the index.html page so you can instantly see your changes.

<br>

## 1. Create `Chat` we component

Use the `create-ui5-element` command to generate the boilerplate files for our Chat.

```sh
npm run create-ui5-element Chat
```

This command will generate the following files:

- src/Chat.ts – The TypeScript class that defines the component logic
- src/ChatTemplate.tsx – The JSX-based template for the component
- src/Chat.css – The CSS file for styling the component

## 2. Add `Chat` to the index.html

- import the web component in the `bundle.esm.js` via: `import Chat from ./Chat.js`;
- Add it to the `index.html`: `<my-chat></my-chat>`.

The test page will reload and render the  `Chat` web component.
At the moment, it's almost blank, rendering just `<div>Hello World!</div>`,
so let’s get our hands dirty!
