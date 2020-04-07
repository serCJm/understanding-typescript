import { Project, ProjectStatus } from "./models/project-model";

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
	// protected can't be accessed from outside
	// but can be accessed by inherited classes
	protected listeners: Listener<T>[] = [];
	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}

export class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	// make sure created only once
	private constructor() {
		super();
	}

	private updateListeners() {
		for (const listenerFn of this.listeners) {
			listenerFn([...this.projects]);
		}
	}

	static getInstance() {
		if (this.instance) return this.instance;
		this.instance = new ProjectState();
		return this.instance;
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const uniqueId =
			new Date().getMilliseconds() +
			Math.floor(Math.random() * 100).toString(16);
		const newProject = new Project(
			uniqueId,
			title,
			description,
			numOfPeople,
			ProjectStatus.Active
		);

		this.projects.push(newProject);

		this.updateListeners();
	}

	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find((prj) => prj.id === projectId);
		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}
}

export const projectState = ProjectState.getInstance();
