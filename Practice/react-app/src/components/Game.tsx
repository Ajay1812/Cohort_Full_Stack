import { useState } from "react"
const Game = () => {
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "Ajay"
    }
  })
  const handleClick = () => {
    setGame({
      ...game, player: {
        ...game.player,
        name: "john"
      }
    })
  }

  return (
    <>
      <div>Game</div>
      <button onClick={handleClick}>Click</button>
    </>
  )
}

export default Game
