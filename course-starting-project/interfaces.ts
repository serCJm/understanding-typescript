// interfaces describe the structure of an object
// interfaces and custom types can be used interchangeably
// however, interfaces can only be used to describe the structure of an object
// also, interface definition is clearer
// last, interface can be implemented in a class whereas custom types can't
// interface can be used as a contract to which a class needs to adhere to
// used to share and force functionality amongst classes regarding the structure and features they should have.
// unlike abstract classes, interfaces have no implementation details
interface Greetable {
	name: string;
	age: number;
	readonly nickname: string;

	greet(phrase: string): void;
}

let user1: Greetable;

user1 = {
	name: "James",
	age: 45,
	nickname: "spy",

	greet(phrase) {
		console.log(phrase + this.name + " Bond");
	}
};

user1.greet("My name is ");

// note, can implement more than one interface by separating with a comma
class Person implements Greetable {
	constructor(
		public name: string,
		public age: number,
		public nickname: string
	) {
		this.name = name;
		this.age = age;
		this.nickname = nickname;
	}
	greet(phrase: string) {
		console.log(phrase + this.name + " Bond." + this.age + this.nickname);
	}
	// note, can be extended with other functionality other than the interface requires.
}

let user2: Greetable;
user2 = new Person("James", 30, "spy");
