import { Card, Button, Typography } from '@mui/material';
import { useState } from 'react';

export function CardsComponent() {
  const [counter, setCounter] = useState(0)
  return <>
    <div style={{ display: "flex", justifyContent: 'center', alignContent: "center", marginTop: "5rem", height: "140px" }}>
      <Card variant="outlined">
        <Typography variant='h5' style={{ display: 'flex', justifyContent: "center" }}>Welcome to Counter
        </Typography>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", gap: "20px" }}>
          <Button variant='contained' onClick={() => setCounter(counter + 1)}>Increase Counter</Button>
          <Typography variant='h4'>{counter}</Typography>
          <Button variant='contained' onClick={() => setCounter(counter - 1)}>Decrease Counter</Button>
        </div>
        <br />
      </Card>
    </div>
  </>
}
