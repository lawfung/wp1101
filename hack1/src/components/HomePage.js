/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './css/HomePage.css';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    {/* Some functions may be added here! */}
    // const [a, setA] = useState(10)
    // const [b, setB] = useState(8)
    const updateA = (evt) => {
      mineNumOnChange(evt.target.value)
    }
    const updateB = (evt) => {
      boardSizeOnChange(evt.target.value)
    }
    return(
      <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
            {/* -- TODO 1-1 -- */}
            <button className = "btn" onClick={startGameOnClick}>Start Game</button>
            <div className = "controlContainer">
              <button className = "btn" onClick={()=>{setShowPanel(!showPanel)}}>Difficulty Adjustment</button>
              { showPanel ? 
                <div className = "controlWrapper" >
                  <div className = "error" style={{color:(mineNum > boardSize * boardSize  ? '#880000' : 'transparent')}}>ERROR: Mines number and board size are invalid!</div>
                  <div className = "controlPanel">
                    <div className = "controlCol" >
                      <p className = "controlTitle" >Mines Number</p>
                      <input type="range" step = "1" min = "1" max = "50" defaultValue ={mineNum} onChange={updateA}/>
                      <p className = "controlNum" >{mineNum}</p>
                    </div>
                    <div className = "controlCol" >
                      <p className = "controlTitle" >Board Size (n×n)</p>
                      <input type="range" step = "1" min = "1" max = "20" defaultValue = {boardSize} onChange={updateB}/>
                      <p className = "controlNum" >{boardSize}</p>
                    </div>
                  </div>
                </div> :
                <></>
              }
              {/* -- TODO 6-2 -- */}
              {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
              {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
              {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
            </div>
            
        </div>
    );

}
export default HomePage;   