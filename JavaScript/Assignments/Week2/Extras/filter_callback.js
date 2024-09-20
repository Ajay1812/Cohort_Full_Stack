// Array Filter with Callback: 
// Write a function 'filterArray' that takes an array and callback function as arguments. 'filterArray'
// should filter the elements of the array based specified by the callback function and return a new array with the filtered

function filterArray(arr, callback){
  function xyz(element, index, arr){
    return callback(arr[index])
  }
  return arr.filter(xyz)
}

function lessthan3(element){
  if (element < 4){
    return element
  }
}

arr = [1,2,3,4,5,6]
console.log(filterArray(arr, lessthan3))
