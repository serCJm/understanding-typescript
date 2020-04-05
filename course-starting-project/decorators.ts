// note, set target to es6 and
// set experimentalDecorators option to true
// in order to be able to use decorators

// decorator is a function you apply to a class in a certain way
// note, property decorators execute during declaration only, NOT execution!!!

function Logger(target: Function) {
	console.log("Logging...");
	console.log(target);
}
// also, could use a decorator factory
// function Logger(logString: string) {
// 	return function (target: Function) {
// 		console.log(logString);
// 		console.log(target);
// 	};
// }

// note, if using decorator factory function,
// would need to execute: @Logger('Logging...')
@Logger
class PersonDecorator {
	name = "Batman";

	constructor() {
		console.log("Creating person project...");
	}
}

const pers = new PersonDecorator();
console.log(pers);

function WithTemplate(template: string, hookId: string) {
	// _ tells TS the argument won't be used but needs to be specified
	return function (_: Function) {
		const hookEl = document.getElementById(hookId);
		// const p = new target();
		if (hookEl) {
			hookEl.innerHTML = template;
			// hookEl.querySelector('h1')!.textContent = p.name;
		}
	};
}

// NOTE: decorators execute bottom up!!!
// HOWEVER, execution of factory function happens top down!!!
@Logger
@WithTemplate("<h1>Hello World</h1>", "app")
class PersonDecorator2 {
	name = "Batman";

	constructor() {
		console.log("Creating person project...");
	}
}

// PROPERTY DECORATORS
// note, property decorators execute during class declaration only!!!
function Log(target: any, propertyName: string | Symbol) {
	console.log("Property descriptor!");
	console.log(target, propertyName);
}

// accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Accessor decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

// method decorator
function Log3(
	target: any,
	name: string | Symbol,
	descriptor: PropertyDescriptor
) {
	console.log("Method decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

// parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
	console.log("Method decorator!");
	console.log(target);
	console.log(name);
	console.log(position);
}

class Product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error("Invalid price - should be positive!");
		}
	}

	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}

// Note, decorators can also return values
// in the case below, because extending the original class passed to it
// and returning an extended class
// to execute, the class will need to be rendered first
function WithTemplate2(template: string, hookId: string) {
	// generic is used to say takes original class and extends it returning an object
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalContructor: T
	) {
		return class extends originalContructor {
			constructor(..._: any[]) {
				super();
				console.log("Rendering template");
				const hookEl = document.getElementById(hookId);
				// const p = new originalContructor();
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector("h1")!.textContent = this.name;
				}
			}
		};
	};
}

@WithTemplate2("<h1>Hello World</h1>", "app")
class PersonDecorator3 {
	name = "Batman";

	constructor() {
		console.log("Creating person project...");
	}
}
// to execute the decorator return value
// the class will need to be rendered first
const pers2 = new PersonDecorator3();
console.log(pers2);

// NOTE: method and accessor decorator return values are valid
// HOWEVER, decorator return values on properties and parameters ARE IGNORED

// AUTOBIND DECORATOR EXAMPLE

function Autobind(
	// target
	_: any,
	//methodName
	_2: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			// this is responsible for what ever triggers the get methods
			// it will always be triggered by the object that holds the method
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjustedDescriptor;
}

class Printer {
	message = "This works!";

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();

const btn = document.querySelector("button")!;
// note, this context on the showMessage is lost without Autobind decorator
// to fix, could implement bind method
// btn.addEventListener("click", p.showMessage.bind(p));
btn.addEventListener("click", p.showMessage);
