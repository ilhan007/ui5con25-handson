import type Chat from "./Chat.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import headsetIcon from "@ui5/webcomponents-icons/dist/headset.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import minimizeIcon from "@ui5/webcomponents-icons/dist/minimize.js";
import IllustratedMessage from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";

export default function ChatTemplate(this: Chat) {
	return (
		<div class="my-chat-root">
			<div class="my-chat-opener-btn-container" popover="auto">
				<Button
					id="opener-btn"
					icon={headsetIcon}
					onClick={this.onOpenerBtnClick}
				/>
			</div>

			<Popover
				opener="opener-btn"
				open={this.open}
				placement="Top"
			>
				<Bar slot="header" design="Subheader">
					<Title slot="startContent">
						{this.headerTitle}
					</Title>

					<Button
						icon={minimizeIcon}
						onClick={this.onMinimizeBtnClick}
						slot="endContent"
					/>
				</Bar>

				<div class="my-chat-content">
					<div class="my-chat-messages">
						{/* The messages slot */}
						{
							this.messages.length > 0 ?
								(
									<slot></slot>
								)
								:
								(
									<IllustratedMessage
										design="Dialog"
										titleText="How can I assist you today?"
										subtitleText="Please enter your query to begin the conversation."
									/>
								)
						}
					</div>
				</div>
			</Popover>
		</div>
	);
}
