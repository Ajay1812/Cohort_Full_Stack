function printToScreen(){
  console.log("Hello World!")
}

setTimeout(printToScreen, 2 * 1000)

let count = 0
for (let i =0; i <= 1000; i++){
  count += 1
}
console.log(count)
