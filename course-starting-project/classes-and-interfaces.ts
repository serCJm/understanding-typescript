class Department {
	private employees: string[] = [];

	// note, can add public but it's a default so redundant
	name: string;

	// specifying modifiers for constructor properties becomes redundant
	// private id: string;
	// instead, can specify in constructor
	// however, public modifiers also need to be specified
	constructor(private id: string, n: string, public desc: string) {
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
