class Department {
	name: string;

	constructor(n: string) {
		this.name = n;
	}

	// specify this context for typescript
	describe(this: Department) {
		console.log("Department: " + this.name);
	}
}

const accounting = new Department("Accounting");

accounting.describe();

const accountingCopy = { describe: accounting.describe };

// note, this binding is lost now!
// throws an error when this context is specified in typescript
// accountingCopy.describe();
