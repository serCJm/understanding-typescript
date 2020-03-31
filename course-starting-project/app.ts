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
	age: 25,
	hobbies: ["sports", "programming"]
};

let person2: {
	name: string;
	age: number;
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
