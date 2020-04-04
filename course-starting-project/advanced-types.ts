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

//
