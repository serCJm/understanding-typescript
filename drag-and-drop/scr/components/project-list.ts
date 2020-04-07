/// <reference path="base-component.ts" />
/// <reference path="../utils/decorators.ts" />
/// <reference path="../models/drag-drop-interfaces.ts" />
/// <reference path="../models/project-model.ts" />
/// <reference path="../project-state.ts" />

namespace App {
	// existing projects render logic
	export class ProjectList extends Component<HTMLDivElement, HTMLElement>
		implements DragTarget {
		assignedProjects: Project[] = [];

		constructor(private type: "active" | "finished") {
			super("project-list", "app", "beforeend", `${type}-projects`);

			this.configure();
			this.renderContent();
		}

		private renderProjects() {
			const listEl = document.querySelector(
				`#${this.type}-projects-list`
			)! as HTMLUListElement;
			listEl.innerHTML = "";
			for (const prjItem of this.assignedProjects) {
				new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
			}
		}

		configure() {
			this.element.addEventListener("dragover", this.dragOverHandler);
			this.element.addEventListener("dragleave", this.dragLeaveHandler);
			this.element.addEventListener("drop", this.dropHandler);

			projectState.addListener((projects: Project[]) => {
				const relevantProjects = projects.filter((project) => {
					if (this.type === "active") {
						return project.status === ProjectStatus.Active;
					} else {
						return project.status === ProjectStatus.Finished;
					}
				});
				this.assignedProjects = relevantProjects;
				this.renderProjects();
			});
		}

		renderContent() {
			const listId = `${this.type}-projects-list`;
			this.element.querySelector("ul")!.id = listId;
			this.element.querySelector("h2")!.textContent =
				this.type.toUpperCase() + " PROJECTS";
		}

		@autobind
		dragOverHandler(event: DragEvent) {
			if (event.dataTransfer?.types[0] === "text/plain") {
				event.preventDefault();
				const listEl = this.element.querySelector("ul")!;
				listEl.classList.add("droppable");
			}
		}

		@autobind
		dropHandler(event: DragEvent) {
			const prjId = event.dataTransfer!.getData("text/plain");
			projectState.moveProject(
				prjId,
				this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
			);
		}

		@autobind
		dragLeaveHandler(_: DragEvent) {
			const listEl = this.element.querySelector("ul")!;
			listEl.classList.remove("droppable");
		}
	}
}
