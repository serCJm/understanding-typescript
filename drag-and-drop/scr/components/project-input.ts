/// <reference path="base-component.ts" />
/// <reference path="../utils/decorators.ts" />
/// <reference path="../utils/validation.ts" />
/// <reference path="../project-state.ts" />

namespace App {
	// initial input render logic
	export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
		titleInputElement: HTMLInputElement;
		descriptionInputElement: HTMLInputElement;
		peopleInputElement: HTMLInputElement;

		constructor() {
			super("project-input", "app", "afterbegin", "user-input");

			this.titleInputElement = this.element.querySelector(
				"#title"
			)! as HTMLInputElement;
			this.descriptionInputElement = this.element.querySelector(
				"#description"
			)! as HTMLInputElement;
			this.peopleInputElement = this.element.querySelector(
				"#people"
			)! as HTMLInputElement;

			this.configure();
		}

		configure() {
			this.element.addEventListener("submit", this.submitHandler);
		}

		renderContent() {}

		@autobind
		private submitHandler(event: Event) {
			event.preventDefault();
			const userInput = this.gatherUserInput();
			if (Array.isArray(userInput)) {
				const [title, desc, people] = userInput;
				projectState.addProject(title, desc, people);
			}
			this.clearInput();
		}

		private gatherUserInput(): [string, string, number] | void {
			const enteredTitle = this.titleInputElement.value;
			const enteredDescription = this.descriptionInputElement.value;
			const enteredPeople = this.peopleInputElement.value;

			// if (
			// 	enteredTitle.trim().length === 0 ||
			// 	enteredDescription.trim().length === 0 ||
			// 	enteredPeople.trim().length === 0
			// ) {
			// 	alert("Invalid input, please try again!");
			// 	return;
			// } else {
			// 	return [enteredTitle, enteredDescription, +enteredPeople];
			// }

			const titleValidatable: Validatable = {
				value: enteredTitle,
				required: true,
			};
			const descriptionValidatable: Validatable = {
				value: enteredDescription,
				required: true,
				minLength: 6,
			};
			const peopleValidatable: Validatable = {
				value: +enteredPeople,
				required: true,
				min: 0,
				max: 6,
			};

			if (
				validate(titleValidatable) &&
				validate(descriptionValidatable) &&
				validate(peopleValidatable)
			) {
				return [enteredTitle, enteredDescription, +enteredPeople];
			} else {
				alert("Invalid input, please try again!");
				return;
			}
		}

		private clearInput() {
			this.titleInputElement.value = "";
			this.descriptionInputElement.value = "";
			this.peopleInputElement.value = "";
		}
	}
}
