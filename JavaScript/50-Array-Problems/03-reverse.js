// Write a program to reverse the array
function reverse(arr){
  let reverse = []
  for (let i = arr.length -1 ; i >= 0 ; i--){
    reverse.push(arr[i])
  }
  return reverse
}

const arr =  [4, 5, 1, 2]
console.log(reverse(arr))
