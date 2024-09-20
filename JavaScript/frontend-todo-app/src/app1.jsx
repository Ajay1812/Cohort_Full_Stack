import { useState } from "preact/hooks"

export function App1() {
  const [todo, setTodo] = useState({
    title: "go to gym",
    description: "from 8-9"
  })
  setTimeout(() => {
    setTodo({
      title: "eat something" + Math.random(),
      description: "from 9-10"
    })
  }, 1000);

  return <>
    {todo.title}
    <br />
    {todo.description}
  </>
}
