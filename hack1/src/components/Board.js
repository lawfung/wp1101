/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        const tmp = createBoard(boardSize, mineNum)
        // console.log(tmp)
        setBoard(tmp.board)
        setMineLocations(tmp.mineLocations)
        setRemainFlagNum(mineNum)
        setNonMineCount(boardSize * boardSize - mineNum)
        setGameOver(false)
        setWin(boardSize * boardSize - mineNum === 0)
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        freshBoard()
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newboard = [];
        for (let i = 0; i < board.length; i++){
            newboard[i] = []
            for(let j = 0; j < board[i].length; j ++) {
                newboard[i][j] = {...board[i][j]}
            }
        }
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        if(board[x][y].revealed){
            return
        }
        if(newboard[x][y].flagged) {
            newboard[x][y].flagged = false
            setRemainFlagNum(remainFlagNum + 1)
        }
        else {
            if(remainFlagNum === 0) {
                return;
            }
            newboard[x][y].flagged = true
            setRemainFlagNum(remainFlagNum - 1)
        }
        setBoard(newboard)
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        if(win || gameOver || board[x][y].revealed || board[x][y].flagged){
            return
        }
        
        
        const tmp = revealed(board, x, y, nonMineCount)
        setBoard(tmp.newboard)
        console.log(board)
        setNonMineCount(tmp.newNonMinesCount)

        if(board[x][y].value === '💣') {
            setGameOver(true)
            return
        }
        if(tmp.newNonMinesCount === 0) {
            setWin(true)
        }
    };

    return(
        <div className = 'boardPage' >
            
            <div className = 'boardWrapper' >
                {win || gameOver ? <Modal restartGame={restartGame} backToHome={backToHome} win={win}></Modal> : <></>}
            {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}
            
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}></Dashboard>
                    {board.map( (row, idr) =>(
                            <div id={"row"+idr} style={{display:"flex"}}>
                                {row.map( (cc, idc) => (
                                        <Cell rowIdx={idr} colIdx={idc} detail={cc} updateFlag={updateFlag} revealCell={revealCell}></Cell>
                                    )
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    ); 

    

}

export default Board