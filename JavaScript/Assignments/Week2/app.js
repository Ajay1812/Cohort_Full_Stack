const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

function handlesum(counter){
  sum = 0
  for (let i =0; i <= counter; i++){
    sum += i
  }
  return sum
}

function createUser(req, res){
  let user = {}
  user['firstName'] = req.query.firstName
  user['lastName'] = req.query.lastName
  res.send(JSON.stringify(user))
  return user
}

function updateUser(req, res){
  let userDetails = {
    firstName: req.query.firstName,
    lastName: req.query.lastName
  }

  res.send(JSON.stringify(userDetails))
  // res.send("Details Updated")
  return userDetails
}


app.get('/', (req, res)=> {
  res.send('Home')
})

app.get('/posts', (req, res)=> {
  res.send('Posts')
})
app.get('/sum', (req, res)=> {
  let counter = req.query.counter
  res.send(`Sum: ${handlesum(counter)}`)
})
  fs.readFile('a.txt', 'utf-8', (err, data) =>{
    if (err){
      res.status(500).send("SERVER ERROR.")
    }
    else{
      res.send(data)
    }
  });

app.post('/createUser', createUser)

app.put('/update' , updateUser)

app.listen(port, ()=>{
  console.log(`App listening on port ${port}`)
})
