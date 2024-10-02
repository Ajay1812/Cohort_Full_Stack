function greet(person) {
    return "Hi Mr. ".concat(person.name, " and your age is ").concat(person.age);
}
console.log(greet({
    name: "Ajay",
    age: 23,
    gender: {
        gender: "male"
    }
}));
