let fs = require('fs');

function sumAll(n){
  let sum = 0
  for(let i = 0; i<=n;i++){
    sum += i
  }
  return sum
}

function fileIsRead(err,data){
  console.log(sumAll(data))
}

fs.readFile('a.txt','utf8', fileIsRead)

