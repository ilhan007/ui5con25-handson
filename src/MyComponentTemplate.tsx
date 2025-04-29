import type MyComponent from "./MyComponent.js";

export default function MyComponentTemplate(this: MyComponent) {
	return (
		<div class="root" onClick={this.onClick}>
			{this.counterText} :: {this.count}
		</div>
	);
}
