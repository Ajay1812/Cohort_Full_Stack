// for (let i = 0; i < 5 ; i++) {
//   let pattern = ""
//   for(let j = 0; j <= i; j++){
//     pattern += '*'
//   }
//   console.log(pattern)
// }

function createPattern(numberOfRows){
  for (let i = 0; i < numberOfRows ; i++) {
    let pattern = ""
    for(let j = 0; j < i+1 ; j++){
      pattern +=  '* * '
    }
    return pattern
  }
  }

console.log(createPattern(5))
