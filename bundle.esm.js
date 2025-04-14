// used in test pages
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";

import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import {
	getNoConflict,
	setNoConflict,
} from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";

// Enable additional themes and i18n texts
import "./dist/Assets.js";

// Import your web components here from the dist/ directory
import "./dist/Chat.js";
import "./dist/ChatMessage.js";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/TextArea.js";
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";

import "@ui5/webcomponents-icons/dist/paper-plane.js";
import "@ui5/webcomponents-icons/dist/minimize.js";

window["sap-ui-webcomponents-bundle"] = {
	renderFinished,
	configuration: {
		getAnimationMode,
		getLanguage,
		getTheme,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getFirstDayOfWeek,
	},
};
