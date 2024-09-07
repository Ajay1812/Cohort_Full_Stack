function sum(n, m){
  return n + m
}
function sub(n, m){
  return n - m
}
function mul(n, m){
  return n * m
}
function div(n, m){
  return n / m
}

function doArithmetic(firstEl, secondEl, arithmeticFn){
  return arithmeticFn(firstEl,secondEl)
}

let answer = doArithmetic(1,2 , div)
console.log(answer)
