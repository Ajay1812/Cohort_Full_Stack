let arr = [{
  name:"Ajay",
  age: 23
},{
  name:"Rohit",
  age: 27
},
{
  name:"Jitu",
  age: 27
}]

// let newArr = []

// for (let i = 0; i< arr.length;i++){
//   if (arr[i].age > 25){
//     newArr.push({
//       name: arr[i].name,
//       age: arr[i].age,
//       isAllowed: true
//     })
//   }
//   else{
//     newArr.push({
//       name: arr[i].name,
//       age: arr[i].age,
//       isAllowed: false
//     })
//   }
// }

// console.log(newArr)

// using Map

let newArr = arr.map((value)=>{
  if (value.age > 25){
    return ({
      // name :value.name,
      // age : value.age,
      // isAllowed : true,
      ...value, isAllowed : true // another way
    })
  }
  else{
    return ({
      // name : value.name,
      // age : value.age,
      // isAllowed : false,
      ...value, isAllowed:false
    })
  }
})

// another way 
// let newArr = arr.map((value)=>{
//   return ({
//     name : value.name,
//     age : value.age,
//     isAllowed : value.age > 25,
//   })
// })

console.log(newArr)
