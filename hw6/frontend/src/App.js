import React, {useState} from "react";
import './App.css';
import { guess, startGame, restart }  from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const startMenu =
    <div>
      {/* someFunctionToBackend; and setHasStarted */}
      <button onClick = {
        async ()=>{const msg = await startGame();setHasStarted(true);setHasWon(false);setNumber("");setStatus(msg);}
      } > start game </button> 
    </div>
  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }
  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      {/* Get the value from input */}
      <input value={number} onChange={(e)=>{setNumber(e.target.value);}}></input>
      {/* Send number to backend */}
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p>{status}</p>
    </>
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button  onClick = {
        // Handle restart for backend and frontend
        async ()=>{const msg = await restart(); setHasStarted(true);setHasWon(false);setNumber("");setStatus(msg);}
      } >restart</button>
    </>
  )
  const game = <div>{hasWon ? winningMode : gameMode}</div>

  return <div className="App">{hasStarted ? game : startMenu}</div>

}

export default App;
