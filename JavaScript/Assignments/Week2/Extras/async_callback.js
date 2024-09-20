// Asynchronous callback
// write a function 'higherOrderAsync' that takes a callback function as an argument. Inside
// 'higherOrderAsync'. call the callback function asynchronously using setTimeout after a delay of 
// n seconds, where n is current day of the month according to UTC time (1 <= n <= 31)


function getDate(){
  let date = new Date()
  return date.getUTCDate()
}

function higherOrderAsync(callback, n){
  setTimeout(callback, getDate(n) * 1000)
}

function printText(){
  console.log("Success")
}

higherOrderAsync(printText)
