// BASIC TYPES
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
	// if (typeof n1 !== "number" || typeof n2 !== "number") {
	// 	throw new Error("Incorrect input!");
	// }
	const result = n1 + n2;
	if (showResult) {
		console.log(phrase + result);
	} else {
		return result;
	}
}

const result = add(5, 8, true, "Result is: ");

// OBJECT TYPES
// note, type structure is inferred implicitly
const person1 = {
	name: "CJ",
	age: 25,
	hobbies: ["sports", "programming"]
};

// explicit type structure definition. Could do both, however, redundant.
let person2: {
	name: string;
	age: number;
	role: [number, string]; // specifies a tuple - ts type. Note, fixed length, however, push still works on it - exception
};

console.log(person2.name);

let product: {
	id: string;
	price: number;
	tags: string[];
	details: {
		title: string;
		description: string;
	};
};

let mixedArr: any[];

for (const hobby of person1.hobbies) {
	console.log(hobby.toUpperCase());
	// console.log(hobby.map()); // throws an error in advance because of wrong type!
}

// ENUM TYPES
enum Role {
	ADMIN,
	READ_ONLY,
	AUTHOR
}
//enum Role { ADMIN='ADMIN', READ_ONLY=100, AUTHOR=5 }

const person3 = {
	name: "CJ",
	age: 25,
	hobbies: ["sports", "programming"],
	role: Role.ADMIN
};

if (person3.role === Role.ADMIN) {
	console.log("works");
}

// ANY TYPE
let canHoldAnyType: any; // better avoid, negates ts checks, might use of unknown values

// UNION TYPES
function combine(input1: number | string, input2: number | string) {
	let result;
	// need a runtime check
	if (typeof input1 === "number" && typeof input2 === "number") {
		result = input1 + input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combineAges = combine(30, 40);

const combineNames = combine("First", "Last");
