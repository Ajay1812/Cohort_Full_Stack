import { useState, useEffect } from 'preact/hooks'
import './app.css'

function useTodos() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/todos', { method: "GET" }).then((response) => {
      response.json().then((data) => {
        setTodos(data)
      })
      setInterval(() => {
        fetch('http://localhost:3000/todos', { method: "GET" }).then((response) => {
          response.json().then((data) => {
            setTodos(data)
          })
        })
      }, 1000)
    })
  }, [])
  return todos
}


export function App() {
  const todos = useTodos()
  return (
    <>
      {todos.map((todo) => {
        return <div>
          {todo.title}
          {todo.description}
          <button onClick={() => {
            fetch(`http://localhost:3000/todos/${parseInt(todo.id)}`, { method: "DELETE" }).then((response) => {
              if (response.ok) {
                { todos.filter((t) => t.id === todo.id) }
              } else {
                console.error("Failed to delete todo");
              }
            })
          }}>Delete</button>
        </div>
      })}
    </>
  )
}
