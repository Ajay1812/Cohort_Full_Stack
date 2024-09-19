import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [todo, setTodo] = useState({
    title: "go to gym",
    description: "from 8-10",
    id: 1
  })
  setInterval(() => {
    setTodo({
      title: "go eat food",
      description: "from 7-8",
      id: 1
    })
  }, 2000)
  return (
    <>
      <h1>Hello World</h1>
      {todo.title}
      <br />
      {todo.description}
      <br />
    </>
  )
}
