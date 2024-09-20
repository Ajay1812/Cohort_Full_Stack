let fs  = require("fs");

function clean(str){
  str = str.trim()
  return str
}

function fileIsRead(err,data){
  console.log(clean(data))
}

// fs.readFile('name.txt', 'utf8', fileIsRead)
fs.readFile('name.txt','utf-8').then(fileIsRead)
