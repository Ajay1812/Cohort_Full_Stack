function logResponseBody(jsonBody){
  console.log(jsonBody)
}

function callbackFn(result){
  result.json().then(logResponseBody)
}

let sendObj = {
  method:"POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ counter: 10 })
}
fetch("http://localhost:3000/handlesum", sendObj).then(callbackFn)
