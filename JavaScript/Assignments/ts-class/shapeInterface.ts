interface Circle{
  radius: number
}

interface Square{
  side: number
}

interface Rectangle{
  width: number
  length: number
}

type Shape = Rectangle | Square | Circle

function renderShape(shape: Shape){
  console.log("Rendered!")
}

function calculateArea(shape: Shape){
  console.log("Area Calculated ")
}

renderShape({
  radius : 10
})
