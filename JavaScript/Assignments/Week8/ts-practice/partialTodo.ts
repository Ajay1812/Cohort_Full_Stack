// interface Todo {
//   title?: string // ? : it make this title to optional
//   description ?: string
//   id ?: number
//   done ?: boolean
// }

// Partial
interface Todo {
  title: string
  description : string
  id : number
  done : boolean
}

type UpdateTodoInput = Partial<Todo> 

function UpdateTodo(id:number, newProps: UpdateTodoInput){

}
console.log(UpdateTodo(1, {
  description: "HellÒ"
}))
