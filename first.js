function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function greet() {
    return this.name;
}

var p = new Person('Harry', 30);
p.greet


