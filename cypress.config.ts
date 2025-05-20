import { defineConfig } from "cypress";

export default defineConfig({
	viewportWidth: 1440,
	viewportHeight: 1080,
	component: {
		devServer: {
			framework: "@ui5/cypress-ct-ui5-webc" as any,
			bundler: "vite",
		},
	},
});
