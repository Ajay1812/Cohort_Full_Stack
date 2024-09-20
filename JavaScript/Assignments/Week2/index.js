const express = require('express')
const app = express()
const port = 3000
let bodyParser = require('body-parser')

// Registering the middleware
// function middleware1(req,res,next){
//   numberRequests += 1 
//   console.log(numberRequests)
//   console.log("From middleware: " + req.headers.counter)
//   next()
// }
// app.use(middleware1)

// add middleware bodyparser
app.use(bodyParser.json())


function sum(counter){
  let sum = 0
  for (let i= 1 ; i <= counter;i++){
    sum += i
  }
  return sum
}

function mul(counter){
  let mul = 1
  for (let i= 1 ; i <= counter;i++){
    mul *= i
  }
  return mul
}

// app.get('/handlesum', (req, res)=> {
//   let counter = req.query.counter
//   res.send(`Sum: ${sum(counter)}`)
// })

app.post('/handlesum', (req, res)=> {
  // let counter = req.query.counter 
  // let counter = req.headers.counter
  let counter = req.body 
  // console.log(counter)
  let calculatedSum = sum(counter.counter) // for body
  let calculatedMul = mul(counter.counter) // for body
  // let calculatedSum = sum(counter) // using query parameters
  // let calculatedMul = mul(counter)
  let answerObject = {
    sum: calculatedSum,
    mul: calculatedMul
  }
    // res.json(answerObject)
    console.log(answerObject)
    res.send(answerObject)
})

function givePage(req,res){
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Hello From page</title></head><body><b>Hello </b></body></html>`)
  // res.sendFile(__dirname + "/Resume - Ajay.pdf")
}


app.get('/', givePage)

app.listen(port, ()=>{
  console.log(`App listening on port ${port} `)
})




