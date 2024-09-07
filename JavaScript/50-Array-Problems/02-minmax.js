// Find the minimum and maximum element in an array
function min(arr){
  let min = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) (min = arr[i])
    else min = arr[0]
  }
  return min
}

function max(arr){
  let max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) (max = arr[i])
    else max = arr[0]
  }
  return max
}

function minmax(arr){
  return [min(arr), max(arr)]
}

const arr = [423, 6, 46, 34, 23, 13, 53, 4];
console.log(minmax(arr))
