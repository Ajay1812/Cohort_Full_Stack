const express = require('express');
const port = 3000;
const app = express();
const fs = require('fs');

function addTask(req, res){
  let user = {}
  user['id'] = Math.random().toString(16).slice(2)
  user['name'] = req.query.name
  user['task'] = req.query.task
  // console.log(user)
  fs.appendFile('data.json', JSON.stringify(user) + ",\n", (err)=>{
    if (err){
      console.log("Error: ", err)
    }
    else{
      console.log("File written successfully\n");
    }
  })
  res.send(JSON.stringify(user))
  return user
}

function deleteInfo(req,res){
  const id = req.
  res.send('Delete')
}

function editDetails(req, res){
  res.send("updated")
}


app.get('/', (req, res)=>{
  res.send("Home")
})

// Read data
app.get('/GetUserDetails', (req,res)=>{
  fs.readFile('data.json', 'utf-8', (err, data)=>{
    if (err){
      res.status(500).send("SERVER ERROR.")
    }
    else{
      res.send(data)
    }
  })
})

app.post('/addTask', addTask)

app.put('/update', editDetails)

app.delete('/delete', deleteInfo)

app.listen(port, ()=>{
  console.log(`App running on port ${port}`)
})


