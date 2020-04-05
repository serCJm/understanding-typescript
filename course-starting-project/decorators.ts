// note, set target to es6 and
// set experimentalDecorators option to true
// in order to be able to use decorators

// decorator is a function you apply to a class in a certain way

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
