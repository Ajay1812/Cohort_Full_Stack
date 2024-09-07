// Sort the array of 0s, 1s, and 2s
function zeroOnesTwos(arr){
  return arr.sort((a,b) => a-b)
}

const arr = [1,2,0,0,0,0,1,1,2,2]
console.log(zeroOnesTwos(arr))
