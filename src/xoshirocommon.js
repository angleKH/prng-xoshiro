export var IteratorPrototype = typeof Symbol === "undefined" ? null : Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

export function xoShiRoToString() {
	var that = this.peek();
	return that.toString.apply(that, arguments);
};
