import type Chat from "./Chat.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="root" onClick={this.onClick}>
			{this.counterText} :: {this.count}
		</div>
	);
}
