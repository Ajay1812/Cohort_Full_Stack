import { useEffect, useState } from 'preact/hooks'


// custom hook
function useTodos() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    console.log("Hi form useEffect")
    fetch("http://localhost:3000/todos", { method: "GET" }).then((response) => {
      response.json().then((data) => {
        setTodos(data)
      })
    })
    setInterval(() => {
      fetch("http://localhost:3000/todos", { method: "GET" }).then((response) => {
        response.json().then((data) => {
          setTodos(data)
        })
      })
    }, 1000)
  }, [])

  return todos
}

// const deleteTodo = (id) => {
//   fetch(`http://localhost:3000/todos/${id}`, {
//     method: "DELETE"
//   }).then((response) => {
//     if (response.ok) {
//       console.log("Item deleted");
//       setTodos(todos.filter(todo => todo.id !== id));
//     } else {
//       console.error("Error deleting item");
//     }
//   }).catch((error) => {
//     console.error("Fetch error:", error);
//   });
// };



export function App() {
  const todos = useTodos()
  return (
    <>
      <h1>Todo App</h1>
      {todos.map((todo) => {
        return <div>
          Title: {todo.title}
          Description: {todo.description}
          {/* ID: {todo.id} */}
          <button onClick={() => {
            fetch(`http://localhost:3000/todos/${parseInt(todo.id)}`, { method: "DELETE" }).then((response) => {
              if (response.ok) {
                { todos.filter((t) => t.id === todo.id) }
              } else {
                console.error("Failed to delete todo");
              }
            })
          }}>Delete</button>
        </div >
      })}
    </>
  )
}


// function Todo(props) {
//   return <div style={{ background: "cyan" }}>
//     {props.title}
//     {props.description}
//   </div>
// }
