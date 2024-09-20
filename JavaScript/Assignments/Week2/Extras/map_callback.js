// Array Map with callback
// Implement a function 'mapArray' that takes an array and a callback an arguments. 'mapArray'
// should apply the callback function to each element of the array and return a new array with modified values.

// function mapArray(arr, callback){
//   newArr = []
//   function xyz(element, index, arr){
//     newArr[index] = callback(arr[index])
//   }
//   arr.forEach(xyz)
//   return newArr
// }


// Another way
function mapArray(arr, callback){
  newArr = []
  function xyz(element, index, arr){
    return callback(arr[index])
  }
  
  return arr.map(xyz)
}

function add1(element){
  element += 1
  return element
}

arr = [1,2,3,4,5,6]
console.log(mapArray(arr, add1))
