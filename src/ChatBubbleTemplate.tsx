import type ChatBubble from "./ChatBubble.js";

export default function ChatBubbleTemplate(this: ChatBubble) {
	return (
		<div>
			<slot></slot>
		</div>
	);
}
