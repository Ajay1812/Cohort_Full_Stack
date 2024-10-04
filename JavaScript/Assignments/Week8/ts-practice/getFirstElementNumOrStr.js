// type arrInput =  number[] | string[]
function getFirstElement(arr) {
    return arr[0];
}
var res1 = getFirstElement([1, 2, 3, 4]); // res1 : number
var res2 = getFirstElement(["one", "two", "three"]); // res2 : string
var res3 = getFirstElement([
    { name: "Ajay", age: 23 },
    { name: "Rohit", age: 27 },
]); // res: User
console.log(res1); // 1
console.log(res2); // one
console.log(res3); // { name: "Ajay", age: 23 }
