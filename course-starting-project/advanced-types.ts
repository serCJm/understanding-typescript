// INTERSECTION TYPES
// similar to extendable interfaces
type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "Batman",
	privileges: ["create-server"],
	startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// TYPE GUARDS
function add(a: Combinable, b: Combinable) {
	// type guard
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log("Name: " + emp.name);
	if ("privileges" in emp) {
		console.log("Privileges: " + emp.privileges);
	}
	if ("startDate" in emp) {
		console.log("Privileges: " + emp.startDate);
	}
}

class Car {
	drive() {
		console.log("Car driving");
	}
}

class Truck {
	drive() {
		console.log("Truck driving");
	}
	loadCargo(amount: number) {
		console.log("Loading cargo " + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	// if ('loadCargo' in vehicle) {
	//     vehicle.loadCargo(300);
	// }
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(300);
	}
}

// DISCRIMINATED UNIONS
interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	// if ("flyingSpeed" in animal) {
	// 	console.log("Moving with speed: " + animal.flyingSpeed);
	// }
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;
		case "horse":
			speed = animal.runningSpeed;
			break;
		default:
			return;
	}
	console.log("Moving with speed " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 30 });

// TYPE CASTING
// helps to inform what type a specific value is when TS is unable to detect the type
// const paragraph = document.querySelector("p");
// const paragraph = document.getElementById("message-output");
// const userInputElement = document.getElementById("user-input");
// produces an error
// userInputElement.value = "Hi There";
// need to tell TS what type of HTMLEl that is

// one way:
// const userInputElement = <HTMLInputElement>(
// 	document.getElementById("user-input")
// );
// userInputElement.value = "Hi There"; // works!

// another way
// NOTE: exclamation mark tells TS that this expression will NEVER yield null
const userInputElement = document.getElementById(
	"user-input"
)! as HTMLInputElement;
userInputElement.value = "Hi There"; // works!

// instead of exclamation can use if check:
// const userInputElement = document.getElementById(
// 	"user-input"
// );
// if (userInputElement) {
//     (userInputElement as HTMLInputElement).value = 'Hi There!'
// }

// INDEX PROPERTIES
// useful when don't know what properties will be available
interface ErrorContainer {
	// a property that should be present, should be of type string
	[prop: string]: string;
	// however, because of index prop, can't have properties of other type
	// id: number; // error
	id: string;
}

const errorBag: ErrorContainer = {
	email: "Not a valid email",
	username: "Must start with a capital character",
	id: "test"
};

// FUNCTION OVERLOADS
// function addFuncOver(a: Combinable, b: Combinable) {
// 	// type guard
// 	if (typeof a === "string" || typeof b === "string") {
// 		return a.toString() + b.toString();
// 	}
// 	return a + b;
// }

// const stringResult = addFuncOver('Batman', 'Robin');
// without function overload
// would throw an error because TS does not know what type it returns
// because it can either return a number or string
// stringResult.split(' '); // error
// to fix, could use type casting
// const stringResult = addFuncOver('Batman', 'Robin') as string;
// however, it's verbose
// instead, could use function overload:
function addFuncOver(a: number, b: number): number;
function addFuncOver(a: string, b: string): string;
function addFuncOver(a: Combinable, b: Combinable) {
	// type guard
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}
const stringResult = addFuncOver("Batman", "Robin");
stringResult.split(" "); // works!

// OPTIONAL CHAINING
const fetchUserData = {
	id: "testid",
	name: "Batman",
	job: { title: "hero", desc: "Fights bad guys" }
};

// console.log(fetchUserData.job.title);
// however, sometimes data that comes from outside of an app might be incomplete
// so nested property access would throw an error
// so to mitigate that we could implement conditional checks
// if (fetchUserData.job & fetchUserData.job.title) { code here }
// however, it can be very verbose with deeply nested data
// so, instead can use optional chaining:
console.log(fetchUserData?.job?.title);

// NULLISH COALESCING
const someUserInput = null;
// in cases where user input is null, store default
const storedData = someUserInput || "DEFAULT";
// however, it will also set a default with ALL falsy values
// const someUserInput = '';
// const storedData = someUserInput || 'DEFAULT';
// however, if you want to keep all user inputs other than null (empty)
// can use nullish coalescing instead
// only nullish values will be set to default
// all other falsy values will be set as is
const storedDataCoalescing = someUserInput ?? "DEFAULT";
