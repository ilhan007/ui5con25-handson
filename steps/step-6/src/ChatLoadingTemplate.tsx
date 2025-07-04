import type ChatLoading from "./ChatLoading.js";

import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function ChatLoadingTemplate(this: ChatLoading) {
	return (
		<BusyIndicator active={true} delay={500} />
	);
}
