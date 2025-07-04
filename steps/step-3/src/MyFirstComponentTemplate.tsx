import type MyFirstComponent from "./MyFirstComponent.js";

export default function MyFirstComponentTemplate(this: MyFirstComponent) {
	return (
		<div class="root" onClick={this.onClick}>
			{this.counterText} :: {this.count}
		</div>
	);
}
