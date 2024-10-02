// one interface can use another interface
// and also using extend keyword take all the properties from interface to another interface
interface PersonGenderProperties{
  gender: string
  orientation: string
  pronouns : string
}

interface PersonInterface extends PersonGenderProperties{
  name: string
  age: number
  genderProps: PersonGenderProperties
}

interface AnimalInterface extends PersonGenderProperties{
  name: string,
  furType: string
}

// function greet(person: PersonInterface){

// }

// console.log(greet({
//   name: 'Ajay',
//   age: 23,
//   genderProps: {
//     gender: 'male',
//     orientation: 'straight',
//     pronouns: 'he/him',
//   }
// }))















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
