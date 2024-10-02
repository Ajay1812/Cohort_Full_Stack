function greet(person) {
    return "hello mr " + person.name;
}
console.log(greet({
    name: 'Ajay',
    age: 23,
    genderProps: {
        gender: 'male',
        orientation: 'straight',
        pronouns: 'he/him',
    }
}));
// Interface
// interface PersonInterface {
//   name: string;
//   age: number;
//   greet(): string
//   greetAge():string
// }
// class Person implements PersonInterface {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
//   greet(){
//     return "Hello, Mr " + this.name
//   }
//   greetAge(){
//     return "Your age is " + this.age
//   }
//   // more function you can define 
// }
// const personObj = new Person('Ajay', 23)
// console.log(personObj.greetAge())
// function greet(person: Person):string{
//   return "hello mr " + person.name + " glad that you are " + person.age + " years old"
// }
// console.log(greet({
//   name:"ajay",
//   age: 23
// }))
