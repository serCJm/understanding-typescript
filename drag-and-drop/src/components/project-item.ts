import { Draggable } from "../models/drag-drop-interfaces.js";
import { Component } from "./base-component.js";
import { Project } from "../models/project-model.js";
import { autobind } from "../utils/decorators.js";

// renders project items
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable {
	private project: Project;

	get persons() {
		if (this.project.people === 1) return "1 person";
		return `${this.project.people} people`;
	}

	constructor(typeId: string, project: Project) {
		super("single-project", typeId, "afterbegin", project.id);
		this.project = project;

		this.configure();
		this.renderContent();
	}

	configure() {
		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.title;
		this.element.querySelector("h3")!.textContent = this.persons;
		this.element.querySelector("p")!.textContent = this.project.description;
	}

	@autobind
	dragStartHandler(event: DragEvent) {
		event.dataTransfer!.setData("text/plain", this.project.id);
		event.dataTransfer!.effectAllowed = "move";
	}

	dragEndHandler(_: DragEvent) {
		console.log("DragEnd");
	}
}
