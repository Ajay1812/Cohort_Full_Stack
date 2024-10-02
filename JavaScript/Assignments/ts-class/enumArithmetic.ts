enum Arithmetic {
  Add, // 0
  Sub, // 1
  Div, // 2
  Mul  // 3
}

function calculateSum(a: number,b : number,type: Arithmetic){
  // console.log(type)
  return a + b
}

console.log(calculateSum(23,25, Arithmetic.Add))
