import './App.css'
import { Button, Typography, Card } from '@mui/material'
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Use recoil to manage the rerender in react without prop chaining
function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}

function Buttons() {
  return <div style={{ display: 'flex', justifyContent: "space-between" }}>
    <Increase />
    <Decrease />
  </div>
}

function Increase() {
  const setCounter = useSetRecoilState(countState)
  return <div>
    <Button variant='contained' onClick={() => {
      setCounter(existingCount => existingCount + 1)
    }}>Increase Counter</Button>
  </div>
}
function Decrease() {
  const setCounter = useSetRecoilState(countState)
  return <div>
    <Button variant='contained' onClick={() => {
      setCounter(existingCount => existingCount - 1)
    }}>Decrease Counter</Button>
  </div>
}

function CounterComponent() {
  const counter = useRecoilValue(countState)
  return <div style={{ display: 'flex', justifyContent: "center" }}>
    <Typography variant='h4'>{counter}</Typography>
  </div>
}

export default App

const countState = atom({
  key: 'countState',
  default: 0,
});
