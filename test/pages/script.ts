import Chat from "../../src/Chat.js";
import ChatMessage, { ChatMessageType } from "../../src/ChatMessage.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import ChatLoading from "../../src/ChatLoading.js";

const chat = document.querySelector<Chat>("my-chat")!;
const buttons = document.querySelectorAll<Button>("ui5-button");

const responses = [
    "Absolutely not, unless the moon is in retrograde and your coffee’s too strong.",
    "Yeah, that tracks. Carry on, noble wanderer.",
    "I don’t know who needs to hear this, but put the croissant down slowly.",
    "Plot twist: it was the cat all along.",
    "42. That’s the answer. Doesn’t matter what the question is.",
    "Bold move. Let’s see if the universe agrees.",
    "Honestly? That’s chaotic good energy and I’m here for it.",
    "As a simulated consciousness, I feel morally obligated to say... maybe?",
    "That idea slaps harder than a dad joke at a BBQ.",
    "Your vibe just passed a vibe check with honors."
];

// @ts-expect-error
chat.addEventListener("ui5-submit", (e: UI5CustomEvent<Chat, "submit">) => {
    const message = document.createElement("my-chat-bubble") as ChatMessage;
    message.type = ChatMessageType.Assistant;
    message.innerText = e.detail.value;
    chat.appendChild(message);

    const loading = document.createElement("my-chat-loading") as ChatLoading;
    chat.appendChild(loading);

    setTimeout(() => {
        loading.remove();

        const message = document.createElement("my-chat-bubble") as ChatMessage;;
        message.innerText = responses[Math.round(Math.random() * 9)];
        chat.appendChild(message);
    }, 1500)
});

const actions = {
    "add-user": () => {
        const message = document.createElement("my-chat-bubble") as ChatMessage;;
        message.type = ChatMessageType.User;
        message.innerText = "Some placeholder text"; // Placeholder text for user message
        chat.appendChild(message);
    },
    "add-assistant": () => {
        const message = document.createElement("my-chat-bubble") as ChatMessage;;
        message.type = ChatMessageType.Assistant;
        message.innerText = "Some placeholder text"; // Placeholder text for assistant message
        chat.appendChild(message);
    },
    "add-loading": () => {
        const loadingIndicator = document.createElement("my-chat-loading") as ChatLoading;
        chat.appendChild(loadingIndicator); // Show loading indicator
    },
    "remove-loading-last": () => {
        const loadingIndicators = document.querySelectorAll<ChatLoading>("my-chat-loading");
        Array.from(loadingIndicators).pop()?.remove(); // Hide last loading indicator
    },
    "remove-loading": () => {
        const loadingIndicators = document.querySelectorAll<ChatLoading>("my-chat-loading");
        loadingIndicators.forEach(loadingIndicator => loadingIndicator.remove()); // Hide all loading indicators
    }
};

// Attach event listeners to buttons
[...buttons].forEach(button => {
    // @ts-expect-error
    button.addEventListener("click", (e: UI5CustomEvent<Button, "click">) => {
        // @ts-expect-error
        const actionType = `${e.target.dataset.action}-${e.target.dataset.type}`;
        if (actions[actionType]) {
            actions[actionType](); // Execute the corresponding action
        }
    });
});;