// BASIC TYPES
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
	// if (typeof n1 !== "number" || typeof n2 !== "number") {
	// 	throw new Error("Incorrect input!");
	// }
	const result = n1 + n2;
	if (showResult) {
		console.log(phrase + result);
		return;
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

// console.log(person2.name);

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

// LITERAL TYPES - exact value it should hold
function combineLiteral(
	input1: number | string,
	input2: number | string,
	resultConversion: "as-number" | "as-text"
) {
	let result;
	// need a runtime check
	if (
		(typeof input1 === "number" && typeof input2 === "number") ||
		resultConversion === "as-number"
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combineLiteralAges = combineLiteral(30, 40, "as-number");

const combineLiteralNames = combineLiteral("First", "Last", "as-text");

// TYPE ALIASES - CUSTOM TYPES
// type User = { name: string; age: number };
// const u1: User = { name: 'Max', age: 30 }; // this works!
// function greet(user: User) {
//     console.log('Hi, I am ' + user.name);
//   }

//   function isOlder(user: User, checkAge: number) {
//     return checkAge > user.age;
//   }

type Combine = number | string;
type ConversionDesc = "as-number" | "as-text";

function combineCustom(
	input1: Combine,
	input2: Combine,
	resultConversion: ConversionDesc
) {
	let result;
	// need a runtime check
	if (
		(typeof input1 === "number" && typeof input2 === "number") ||
		resultConversion === "as-number"
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combineCustomAges = combineCustom(30, 40, "as-number");

const combineCustomNames = combineCustom("First", "Last", "as-text");

// FUNCTION RETURN TYPES
// inferred
// function addNums(n1: number, n2: number): number
function addNums(n1: number, n2: number) {
	const result = n1 + n2;
	return result;
}

// specify that there's no return value
function printResult(num: number): void {
	console.log("Result: " + num);
}
// if return undefined, specify undefined
function printResult2(num: number): undefined {
	console.log("Result: " + num);
	return;
}

// FUNCTION as TYPE
function addNumsFn(n1: number, n2: number) {
	const result = n1 + n2;
	return result;
}

// note, can still assign another function to this var
let holdsAnyFn: Function;
holdsAnyFn = addNumsFn;
// holds only a function that matches the function description
let holdsMatchFn: (a: number, b: number) => number;
holdsMatchFn = addNumsFn;
// throws error
// holdsMatchFn = printResult;

// FUNCTION TYPES AND CALLBACKS
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

addAndHandle(10, 20, result => console.log(result));

// UNKNOWN TYPE
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
// userName = userInput; // throws an error because userInput is not guaranteed to be a string
// however, if used userInput: any, it would pass because any removes typechecking
// instead can add an extra step to remove the error:
if (typeof userInput === "string") {
	userName = userInput; // works!
}

// NEVER TYPE
// this function never returns, so void would be wrong, instead use never
function generateError(message: string, code: number): never {
	throw { message, errorCode: code };
}
generateError("There was an error", 500);
