// const number = parseInt(prompt("Enter a number of term: "))
// console.log(number);

let n1 = 0
let n2 = 1
let next

console.log("fibonacci series: ")

for (let i = 0; i<=4; i++){
  console.log(n1);
  next = n1 + n2
  n1 = n2
  n2 = next
}
