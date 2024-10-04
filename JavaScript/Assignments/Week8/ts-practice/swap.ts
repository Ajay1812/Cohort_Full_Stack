function swap<T,P>(a: T, b: P):  [P,T] {
  return [b,a]
}

// Using Arrow fn
const swap2 = <T,P>(a: T, b:P): [P,T] => {
  return [b,a]
}

// let swapRes = swap(1,2)
// let swapRes = swap(false,true)
let swapRes = swap2(2,'Str2')
console.log(swapRes)
