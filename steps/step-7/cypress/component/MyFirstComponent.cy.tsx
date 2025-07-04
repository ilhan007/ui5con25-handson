import MyFirstComponent from "../../src/MyFirstComponent.js";

describe("MyFirstComponent.cy.tsx", () => {
	it("playground", () => {
		cy.mount(<MyFirstComponent />);

		cy.get("[my-first-component]").click();

		cy.get("[my-first-component]").should("have.prop", "count", 1);
	});
});
