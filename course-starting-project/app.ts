function add(n1: number, n2: number, showResult: boolean) {
	// if (typeof n1 !== "number" || typeof n2 !== "number") {
	// 	throw new Error("Incorrect input!");
	// }
	if (showResult) {
		console.log(n1 + n2);
	} else {
		return n1 + n2;
	}
}

const result = add(5, 8, true);
