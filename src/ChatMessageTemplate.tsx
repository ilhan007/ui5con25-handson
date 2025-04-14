import type ChatMessage from "./ChatMessage.js";

export default function ChatMessageTemplate(this: ChatMessage) {
	return (
		<div class="my-chat-message-root">
			<slot></slot>
		</div>
	);
}
