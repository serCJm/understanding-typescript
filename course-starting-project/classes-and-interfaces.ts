// abstract
class Department {
	// private employees: string[] = [];
	// change to protected to allow inheritated classes to access it
	protected employees: string[] = [];

	// note, can add public but it's a default so redundant
	name: string;

	// specifying modifiers for constructor properties becomes redundant
	// private id: string;
	// instead, can specify in constructor
	// however, public modifiers also need to be specified
	// readonly modifiers set properties so that they can not be changed
	constructor(private readonly id: string, n: string, public desc: string) {
		this.id = id;
		this.name = n;
		this.name;
	}

	// specify this context for typescript
	describe(this: Department) {
		console.log("Department: " + this.name + this.id + this.desc);
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}
	printEmployeeInformation() {
		console.log(this.employees.length);
	}

	static createEmployee(name: string) {
		return { name };
	}
	// note, can't access static properties in a constructor
	// by using this. Would need to access on the object itself
	static fiscalYear = 2020;

	// note, forces inherited classes to provide this methods
	// note, abstract classes can not be instantiated
	// abstract provideMoreDescription(this: Department): void;
}

const accounting = new Department("tests", "Accounting", "some description");

accounting.describe();
accounting.addEmployee("CJ");
accounting.addEmployee("Batman");

// works but will cause confusion in the code
// to avoid, add private to employees array property
// then it will throw an error
// accounting.employees[1] = "Superman";

accounting.printEmployeeInformation();

const accountingCopy = { describe: accounting.describe };

// note, this binding is lost now!
// throws an error when this context is specified in typescript
// accountingCopy.describe();

const employee1 = Department.createEmployee("Hulk");
const year = Department.fiscalYear;

class ITDepartment extends Department {
	constructor(id: string, desc: string, public admins: string[]) {
		super(id, "IT", desc);
		this.admins = admins;
	}

	provideMoreDescription() {
		console.log("IT department");
	}
}

const it = new ITDepartment("it-id", "it descr", ["Spider-man"]);
it.describe();
it.addEmployee("Wolverine");
it.addEmployee("Iron-man");
it.printEmployeeInformation();

class AccountingDepartment extends Department {
	private lastReport: string;

	get mostRecentReport() {
		if (this.lastReport) return this.lastReport;
		throw new Error("No Report Found");
	}

	set mostRecentReport(value: string) {
		if (!value) throw new Error("Please pass in a values");
		this.addReport(value);
	}

	constructor(id: string, desc: string, private reports: string[]) {
		super(id, "Accounting", desc);
		this.lastReport = reports[0];
	}
	addEmployee(name: string) {
		if (name === "Batman") return;
		// note, a private property can not be accessed
		// instead, to make sure it does not get modified out side the class
		// yet, you can change it from child calsses
		// add protected modifier
		this.employees.push(name);
	}
	addReport(text: string) {
		this.reports.push(text);
		// note, lastReport can not be accessed here because it's private
		// instead, need to use setters
		// this.lastReport = text;
	}
	provideMoreDescription() {
		console.log("Accounting department");
	}
}

const acc = new AccountingDepartment("acc-id", "acc-descr", []);
acc.addEmployee("Captain America");
acc.addReport("earth is safe");
console.log(acc.mostRecentReport);
acc.mostRecentReport = "we need money";
console.log(acc.mostRecentReport);

// SINGLETON CLASS
// instance can be created only once
class MarketingDepartment extends Department {
	private lastReport: string;
	private static instance: MarketingDepartment;

	get mostRecentReport() {
		if (this.lastReport) return this.lastReport;
		throw new Error("No Report Found");
	}

	set mostRecentReport(value: string) {
		if (!value) throw new Error("Please pass in a values");
		this.addReport(value);
	}

	// private constructor can not be instantiated with new
	private constructor(id: string, desc: string, private reports: string[]) {
		super(id, "Marketing", desc);
		this.lastReport = reports[0];
	}

	static getInstance() {
		if (this.instance) return this.instance;
		this.instance = new MarketingDepartment("mark-id", "best mark dep", []);
		return this.instance;
	}

	addEmployee(name: string) {
		if (name === "Black Widow") return;
		// note, a private property can not be accessed
		// instead, to make sure it does not get modified out side the class
		// yet, you can change it from child calsses
		// add protected modifier
		this.employees.push(name);
	}
	addReport(text: string) {
		this.reports.push(text);
		// note, lastReport can not be accessed here because it's private
		// instead, need to use setters
		// this.lastReport = text;
	}
	provideMoreDescription() {
		console.log("Marketing department");
	}
}

// always returns the same instance
const marketing = MarketingDepartment.getInstance();
const marketing2 = MarketingDepartment.getInstance();
console.log(marketing === marketing2);
