// Project Type
enum ProjectStatus {
	Active,
	Finished,
}

class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: ProjectStatus
	) {}
}

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

class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	// make sure created only once
	private constructor() {
		super();
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
		for (const listenerFn of this.listeners) {
			listenerFn([...this.projects]);
		}
	}
}

const projectState = ProjectState.getInstance();

// form validation logic
interface Validatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

function validate(validatableInput: Validatable) {
	let isValid = true;
	if (validatableInput.required) {
		isValid = isValid && validatableInput.value.toString().trim().length !== 0;
	}
	if (
		validatableInput.minLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid &&
			validatableInput.value.trim().length > validatableInput.minLength;
	}
	if (
		validatableInput.maxLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid &&
			validatableInput.value.trim().length < validatableInput.maxLength;
	}
	if (
		validatableInput.min != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value > validatableInput.min;
	}
	if (
		validatableInput.max != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value < validatableInput.max;
	}
	return isValid;
}

// this context binding decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

// Component Base Class
// only for inheritance
// thus abstract class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

// initial input render logic
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

// renders project items
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
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

	configure() {}

	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.title;
		this.element.querySelector("h3")!.textContent = this.persons;
		this.element.querySelector("p")!.textContent = this.project.description;
	}
}

// existing projects render logic
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
	assignedProjects: Project[] = [];

	constructor(private type: "active" | "finished") {
		super("project-list", "app", "beforeend", `${type}-projects`);

		this.configure();
		this.renderContent();
	}

	configure() {
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

	private renderProjects() {
		const listEl = document.querySelector(
			`#${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = "";
		for (const prjItem of this.assignedProjects) {
			new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
		}
	}
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
