// Find the Kth largest and Kth smallest number in an array
// Kth smallest

// function kthSmallest(arr, k){
//   arr.sort((a,b) => (a - b))
//   return arr[k-1]
// }
// function kthLargest(arr, k){
//   arr.sort((a,b) => (b - a))
//   return arr[k-1]
// }

// function kthSmallLarge(arr, k){
//   return [kthSmallest(arr, k) , kthLargest(arr, k)]
// }

function kthSmallest(arr, k) {
  for (let i = 0; i < k; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr[k - 1];
}

function kthLargest(arr, k) {
  for (let i = 0; i < k; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    let temp = arr[i];
    arr[i] = arr[maxIndex];
    arr[maxIndex] = temp;
  }
  return arr[k - 1];
}

function kthLargestSmallest(arr, k){
  return [kthSmallest(arr,k), kthLargest(arr,k)]
}

// [12, 3, 5, 7, 19]
// [7, 10, 4, 3, 20, 15]
console.log(kthLargestSmallest([12, 3, 5, 7, 19], 2));  
