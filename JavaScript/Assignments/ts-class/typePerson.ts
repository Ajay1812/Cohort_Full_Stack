// Type are same as interface there are few difference :
// 1. you cant use extend keyword to your type in another type but in interface you can have one interface into another.
// 2. syntax : type PersonType = {}
// 3. you cant implement as class but interface can 
type PersonGender = {
  gender: string
}


type PersonType = {
  name: string,
  age: number
  gender: PersonGender
}

function greet(person: PersonType){
  return `Hi Mr. ${person.name} and your age is ${person.age}`
}


console.log(greet({
  name: "Ajay",
  age: 23,
  gender: {
    gender : "male"
  }
}))
