// OVERVIEW
// some types, such as an array, can store any type of data
// as such, it becomes a generic type because they are dependent on the types they store
// const names: Array = []; // error! generic type
// instead, need to specify the type of data that goes into the array
const names: Array<string> = []; // works! the same as string[]

// generics are useful with promises
// to specify Promise return value
// to give better support
const promise: Promise<string> = new Promise(res => {
	setTimeout(() => res("Done!"), 2000);
});
// now, it would be safe to apply string methods on the return value
promise.then(data => data.split(""));

// GENERIC FUNCTION
// function merge(objA: object, objB: object) {
// 	return Object.assign(objA, objB);
// }

const mergedObj = merge({ name: "Batman" }, { age: 30 });
// can't access properties because TS does not know about returned obj structure
// mergedObj.name; // error!
// one way to fix is to do type casting but it's verbose
// const mergedObj = merge({ name: "Batman" }, { age: 30 }) as {name: string, age: number};
// instead, better to turn it into generic function
// tells to TS that these two generics types will intersect
// these types are set dynamically from whatever is passed to the function
function merge<T, U>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}
const mergedObj2 = merge({ name: "Batman" }, { age: 30 });
console.log(mergedObj2.name); // works!
// instead of setting T and U dynamically, can also specify them
// however, it's redundant
// const mergedObj2 = merge<{name: string}, {age: number}>({ name: "Batman" }, { age: 30 });

// GENERIC CONSTRAINTS
function mergeConst<T, U>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}
// second parameter expects a generic type, so it will silently fail
// if pass an argument other than object
const mergedObjConst = merge({ name: "Batman" }, 30);
// console.log(mergedObjConst.age); // error!
// to fix, can specify expected generic type
function mergeConst2<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}
// const mergedObjConst2 = merge({ name: "Batman" }, 30); error!

// ANOTHER EXAMPLE
interface Lengthy {
	length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = "Got no value.";
	if (element.length > 0)
		descriptionText = "Got " + element.length + " elements.";
	return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));

// "KEYOF" CONSTRAINT
// function extractAndConvert(obj: object, key: string) {
// 	return obj[key]; // error! TS does not know if obj has that key
// }
// instead, use a generic type with keyof
function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return obj[key]; // works!
}

// GENERIC CLASSES
class DataStorage<T> {
	private data: T[] = [];
	addItem(item: T) {
		this.data.push(item);
	}
	removeItem(item: T) {
		this.data.splice(this.data.indexOf(item), 1);
	}
	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Batman");
textStorage.addItem("Robin");
textStorage.removeItem("Robin");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

const objStorage = new DataStorage<object>();
objStorage.addItem({ name: "Spider" });
objStorage.addItem({ name: "Man" });
// note, because it's an object - bad methods implementation
// object is passed by ref and indexOf will fail to find that element
// so removeItem will simply remove the last item from the array
objStorage.removeItem({ name: "Spider" });
console.log(objStorage.getItems());
// a better implementation would be to make sure the class only works with primitives
// class DataStorage<T extends string | number | boolean> {
// 	private data: T[] = [];
// 	addItem(item: T) {
// 		this.data.push(item);
// 	}
// 	removeItem(item: T) {
//      if (this.data.indexOf(item) === -1) return;
// 		this.data.splice(this.data.indexOf(item), 1);
// 	}
// 	getItems() {
// 		return [...this.data];
// 	}
// }

// GENERIC UTILITY TYPES

// Partial
interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {
	let courseGoal: Partial<CourseGoal> = {};
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.completeUntil = date;
	return courseGoal as CourseGoal;
}

// Readonly
const readonlyNames: Readonly<string[]> = ["Batman", "Robin"];
// readonlyNames.push("Joker"); // error! can't modify readonlyNames
