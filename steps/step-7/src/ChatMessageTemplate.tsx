import type ChatMessage from "./ChatMessage.js";

export default function ChatMessageTemplate(this: ChatMessage) {
	return (
		<div>
			<slot></slot>
		</div>
	);
}
