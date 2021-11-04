import './App.css';
import handleClick from "./handleClick.js"
import React, {useState} from "react";

function App() {
  const [holding, setHol] = useState("0")
  const [operat, setOpe] = useState(null)
  const [waiting, setWai] = useState(null)
  const [memory, setMem] = useState("0")
  const [state, setSta] = useState(0) // 0 for replace 1 for append
  const [errmsg, setErr] = useState(null)

  const dummy_handleClick = button => (
    () => {
      handleClick(button, holding, setHol, 
                          operat, setOpe,
                          waiting, setWai,
                          memory, setMem,
                          state, setSta,
                          errmsg, setErr);
    }
  )
  return (
    <div className="App">
      <div className="Display1">
        <div className="DisplayM"> Mem : {memory} </div>
        <div className="DisplayS"> {((!errmsg) && waiting) ? holding + operat : ""} </div>
      </div>
      <div className="Display2"> {errmsg || waiting || (holding + (operat ? operat : "")) } </div>
      <div className="Panel">
        <button onClick={dummy_handleClick("C")}>C</button>
        <button onClick={dummy_handleClick("MC")}>MC</button>
        <button onClick={dummy_handleClick("MR")}>MR</button>
        <button onClick={dummy_handleClick("M-")}>M-</button>
        <button onClick={dummy_handleClick("M+")}>M+</button>

        <button onClick={dummy_handleClick("←")}>←</button>
        <button onClick={dummy_handleClick("7")}>7</button>
        <button onClick={dummy_handleClick("8")}>8</button>
        <button onClick={dummy_handleClick("9")}>9</button>
        <button onClick={dummy_handleClick("÷")}>÷</button>

        <button onClick={dummy_handleClick("+/-")}>+/-</button>
        <button onClick={dummy_handleClick("4")}>4</button>
        <button onClick={dummy_handleClick("5")}>5</button>
        <button onClick={dummy_handleClick("6")}>6</button>
        <button onClick={dummy_handleClick("×")}>×</button>

        <button onClick={dummy_handleClick("%")}>%</button>
        <button onClick={dummy_handleClick("1")}>1</button>
        <button onClick={dummy_handleClick("2")}>2</button>
        <button onClick={dummy_handleClick("3")}>3</button>
        <button onClick={dummy_handleClick("-")}>-</button>

        <button onClick={dummy_handleClick("abs")}>abs</button>
        <button onClick={dummy_handleClick("0")}>0</button>
        <button onClick={dummy_handleClick(".")}>.</button>
        <button onClick={dummy_handleClick("=")}>=</button>
        <button onClick={dummy_handleClick("+")}>+</button>
      </div>
    </div>
  );
}

export default App;
