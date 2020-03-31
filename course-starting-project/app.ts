function add(n1: number, n2: number) {
	if (typeof n1 !== "number" || typeof n2 !== "number") {
		throw new Error("Incorrect input!");
	}
	return n1 + n2;
}

const result = add(5, 8);
console.log(result);
