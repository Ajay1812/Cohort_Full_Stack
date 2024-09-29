import './App.css'
import { Button, Typography, Card } from '@mui/material'

// Now using context api to manage the rerender try to reduce it.
const CounterContext = createContext()
function App() {
  return (
    <CounterContext.Provider value={{
      counter: counter,
      setCounter: setCounter
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: "space-between", border: '2px solid black' }}>
          <Card style={{ padding: 20, width: 500 }}>
            <Typography variant='h5'>Welcome to counter</Typography>
            <br />
            <Buttons />
            <CounterComponent />
          </Card>
        </div>
      </div>
    </CounterContext.Provider>
  )
}
function Buttons() {
  return <div style={{ display: 'flex', justifyContent: "space-between" }}>
    <Increase />
    <Decrease />
  </div>
}
function Increase() {
  const { counter, setCounter } = useContext(CounterContext)
  return <div>
    <Button variant='contained' onClick={() => {
      setCounter(counter + 1)
    }}>Increase Counter</Button>
  </div>
}
function Decrease() {
  const { counter, setCounter } = useContext(CounterContext)
  return <div>
    <Button variant='contained' onClick={() => {
      setCounter(counter - 1)
    }}>Decrease Counter</Button>
  </div>
}
function CounterComponent() {
  const { counter } = useContext(CounterContext)
  return <div style={{ display: 'flex', justifyContent: "center" }}>
    <Typography variant='h4'>{counter}</Typography>
  </div>
}
export default App
