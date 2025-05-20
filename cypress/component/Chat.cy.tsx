import Chat from "../../src/Chat.js";

describe("Chat.cy.tsx", () => {
	it("playground", () => {
		cy.mount(<Chat />);

		cy.get("[my-chat]")
			.shadow()
			.find("#fixed-btn")
			.click();

		cy.get("[my-chat]")
			.shadow()
			.find("#input")
			.type("hi!");

		cy.get("[my-chat]")
			.shadow()
			.find("#send")
			.click();
	});
});
