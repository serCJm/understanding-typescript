// note, set target to es6 and
// set experimentalDecorators option to true
// in order to be able to use decorators

// decorator is a function you apply to a class in a certain way
// note, property decorators execute during class declaration only!!!

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
