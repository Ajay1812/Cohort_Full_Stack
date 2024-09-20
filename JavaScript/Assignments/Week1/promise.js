function promiseBody(resolve){
  return setTimeout(resolve, 1000)
}

function medicine1Get(){
  let answer = new Promise(promiseBody)
  return answer
}


let medicine = medicine1Get()
medicine.then(()=>{
  console.log('Medicine 1 received')
})


// function a(){
//   console.log('hi');
  
// }

// let obj = {
//   name: a
// }

// key can be function if we provide the function reference in a value.
// obj.name() 

// console.log(Object.keys(obj))
