import { useEffect, useState } from 'preact/hooks'

export function App() {
  const [todos, setTodos] = useState([{
    title: "go to gym",
    description: "from 8-10",
    id: 1
  }
    // {
    // title: "go eat something",
    // description: "from 7-8",
    // id: 2
    // },
    // {
    //   title: "watch movie",
    //   description: "from 11-01",
    //   id: 3
    // }
  ])

  // console.log("Above useEffect") // keep calling again and again 
  useEffect(() => {
    console.log("Hi form useEffect")
    setInterval(() => {
      setTodos({
        title: "go eat something " + Math.random(),
        description: "from 7-8",
        id: 1
      })
    }, 1000)
  }, [])

  return (
    <>
      <h1>Todo App</h1>
      {/* {todos.map((todo) => {
        return <Todo title={todo.title} description={todo.description} />
      })} */}

      {todos.title}
      <br />
      {todos.description}
    </>
  )
}


function Todo(props) {
  return <div style={{ background: "cyan" }}>
    {props.title}
    {props.description}
  </div>
}
