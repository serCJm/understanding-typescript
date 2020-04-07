namespace App {
	// Component Base Class
	// only for inheritance
	// thus abstract class
	export abstract class Component<
		T extends HTMLElement,
		U extends HTMLElement
	> {
		templateElement: HTMLTemplateElement;
		hostElement: T;
		element: U;

		constructor(
			templateId: string,
			hostElementId: string,
			insertPlace: InsertPosition,
			newElementId?: string
		) {
			this.templateElement = document.querySelector(
				`#${templateId}`
			)! as HTMLTemplateElement;
			this.hostElement = document.querySelector(`#${hostElementId}`)! as T;

			const importedNode = document.importNode(
				this.templateElement.content,
				true
			);
			this.element = importedNode.firstElementChild as U;
			if (newElementId) this.element.id = newElementId;

			this.attach(insertPlace);
		}

		private attach(insertPlace: InsertPosition) {
			this.hostElement.insertAdjacentElement(insertPlace, this.element);
		}

		abstract configure(): void;

		abstract renderContent(): void;
	}
}
