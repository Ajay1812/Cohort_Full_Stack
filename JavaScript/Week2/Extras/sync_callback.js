//  Synchronous callback
//  - Write a function 'higherOrder' that takes a callback function as an argument. Inside 'higherOrder',
// call the function synchronously.  

function exampleCallback(){
  console.log("Synchronous call")
}

function higherOrder(callback){
  console.log("Hello")
  callback()
}

higherOrder(exampleCallback)
