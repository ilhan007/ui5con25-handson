import type ChatBot from "./ChatBot.js";

export default function ChatBotTemplate(this: ChatBot) {
	return (
		<div class="root" onClick={this.onClick}>
			{this.counterText} :: {this.count}
		</div>
	);
}
