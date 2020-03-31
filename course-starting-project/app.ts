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

const person1 = {
	name: "CJ",
	age: 25
};

let person2: {
	name: string;
	age: number;
};

console.log(person2.name);
