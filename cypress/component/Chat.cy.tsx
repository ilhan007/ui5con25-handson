import Chat from "../../src/Chat.js";

describe("Chat.cy.tsx", () => {
	it("playground", () => {
		cy.mount(<Chat />);

		cy.get("[hardcoded-button]").click();

		cy.get("[hardcoded-button]").should("have.prop", "count", 1);
	});
});
