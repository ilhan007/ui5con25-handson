import Chat from "../../src/Chat.js";

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

describe("Chat component", () => {
	beforeEach(() => {
		cy.mount(<Chat />);
	});

	it("should toggle popover open and closed via the opener button", () => {
		cy.get("[my-chat]")
			.shadow()
			.find("#opener-btn")
			.as("openerBtn")
			.click();

		cy.get("[my-chat]").should("have.prop", "open", true);
		checkPopoverState("open");

		cy.get("@openerBtn").click();
		checkPopoverState("closed");
	});

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
});
