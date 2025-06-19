# Write Test

In this section, we will write two Cypress component tests for the `my-chat` web component.

Before running any tests, ensure you have your development server running or launch the dev server with `npm start`

Then, in a second terminal, open the Cypress Test Runner:
```
npm run test:open
```

This will open the Cypress GUI, where you can select and run your tests interactively.

## 1. Create the Test File

Open the file:

```
cypress/component/Chat.cy.tsx
```

We start by importing the components used in the test:

```tsx
import Chat from "../../src/Chat.js";
```

We’ll create a simple test suite to:

* Verify the **popover opens and closes** when clicking the opener button.
* Check that the **`headerTitle` property** correctly updates the UI.

## 2. Define the Test Suite

We will group the tests using `describe` and define two individual tests using `it`.

```tsx
import Chat from "../../src/Chat.js";

describe("Chat component", () => {
	it("should toggle popover open and closed via the opener button", () => {
		// Test logic will go here
	});

	it("should reflect dynamic header title changes", () => {
		// Test logic will go here
	});
});
```

## 3. Mount the Component

We mount the component in a `beforeEach` hook to ensure each test starts with a fresh state:

```tsx
import Chat from "../../src/Chat.js";

describe("Chat component", () => {
	beforeEach(() => {
		cy.mount(<Chat />);
	});

	it("should toggle popover open and closed via the opener button", () => {});
	it("should reflect dynamic header title changes", () => {});
});
```

## 4. Add Helper: `checkPopoverState`

Since we are using the `ui5-popover` component, we’ll define a helper function to check whether the popover is open or closed:

```tsx
const checkPopoverState = (state: "open" | "closed") => {
	cy.get("[my-chat]")
		.shadow()
		.find("[ui5-popover]")
		.as("popover");

	cy.get("@popover").should($popover => {
		const isOpen = state === "open";

		expect($popover.is(":popover-open")).to.equal(isOpen);

		if (isOpen) {
			expect($popover.width()).to.be.gt(0);
			expect($popover.height()).to.be.gt(0);
		}
	}).and(state === "open" ? "have.attr" : "not.have.attr", "open");
};
```

This function:

* Selects the `ui5-popover` inside the shadow DOM
* Uses `:popover-open` pseudo-class to check visibility
* Asserts the popover has non-zero dimensions when open
* Checks if the `open` attribute is correctly set or not

## 5. Test: Toggle Popover

We now implement the first test: opening and closing the popover using the opener button.

```tsx
it("should toggle popover open and closed via the opener button", () => {
	cy.get("[my-chat]")
		.shadow()
		.find("#opener-btn")
		.as("openerBtn")
		.click();

	cy.get("[my-chat]").should("have.prop", "open", true);
	checkPopoverState("open");

	cy.get("@openerBtn").click();

	cy.get("[my-chat]").should("have.prop", "open", false);
	checkPopoverState("closed");
});
```

What this does:

* Finds the opener button and clicks it
* Asserts that the `open` property is `true`
* Verifies the popover is visible
* Clicks the button again to close it
* Checks that the popover is hidden

## 6. Test: Dynamic Header Title

In the second test, we check if the `headerTitle` property updates the visible title.

```tsx
it("should reflect dynamic header title changes", () => {
	const newTitle = "Some title for the test";

	cy.get("[my-chat]")
		.shadow()
		.find("[ui5-popover] [ui5-bar][slot='header'] [ui5-title][slot='startContent']")
		.as("title")
		.should("have.text", "My custom UI for chatbot");

	cy.get("[my-chat]").invoke("prop", "headerTitle", newTitle);

	cy.get("@title").should("have.text", newTitle);
});
```

Here’s what’s happening:

* The title element is selected from the shadow DOM
* Its default text is verified
* The `headerTitle` property is updated using `.invoke("prop", ...)`
* The updated title is asserted in the DOM
