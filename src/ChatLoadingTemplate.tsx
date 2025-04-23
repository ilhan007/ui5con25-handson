import type ChatLoading from "./ChatLoading.js";

// UI5 Web Components
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function ChatLoadingTemplate(this: ChatLoading) {
	return (
		<BusyIndicator active={true} delay={500} />
	);
}
