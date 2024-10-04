// type arrInput =  number[] | string[]

// function getFirstElementNumOrStr(arr : arrInput): (number | string) {
//   return arr[0]
// }

// let result1 = getFirstElementNumOrStr([1,2,3]) // res1 : string | number
// let result2 = getFirstElementNumOrStr(["one","two","three"]) // res2 : string | number
// console.log(result1) // 1
// console.log(result2) // one

// Generics - it will return the type according to input array <T>(arr: T[])
type User = {
  name: string;
  age: number;
};

function getFirstElement<T>(arr: T[]) {
  return arr[0];
}

let res1 = getFirstElement([1, 2, 3, 4]); // res1 : number
let res2 = getFirstElement(["one", "two", "three"]); // res2 : string
let res3 = getFirstElement<User>([
  { name: "Ajay", age: 23 },
  { name: "Rohit", age: 27 },
]); // res: User
console.log(res1); // 1
console.log(res2); // one
console.log(res3); // { name: "Ajay", age: 23 }
