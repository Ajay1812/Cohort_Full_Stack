function hollowSqr(num){
  let pattern = ""
  let space = ""
  for(let i = 0; i < num; i++){
    for (let j = 0; j < num; j++) {
      pattern += "*"
    }
    pattern += "\n"
  }
  console.log(pattern)
}

hollowSqr(5)

