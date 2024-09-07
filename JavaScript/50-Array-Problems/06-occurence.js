// Find the occurrence of an integer in the array
function occurrence(arr, n){
  let res = 0
  for (let i = 0; i < arr.length; i++){
    if (arr[i] === n){
      res += 1
    }
  }
  return res
}

const arr = [1,3,4,4,5,4,4,4]
console.log(occurrence(arr, 4))
