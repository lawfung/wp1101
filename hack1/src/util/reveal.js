/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the cell is already revealed, do nothing. */}
    {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */}

    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */}
    {/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */}
    let newboard = [];
    for (let i = 0; i < board.length; i++){
        newboard[i] = []
        for(let j = 0; j < board[i].length; j ++) {
            newboard[i][j] = {...board[i][j]}
        }
    }
    if(newboard[x][y].value === '💣') {
      for (let i = 0; i < newboard.length; i++){
        for(let j = 0; j < newboard[i].length; j ++) {
          if(newboard[i][j].flagged === false && newboard[i][j].value === '💣') {
            newboard[i][j].revealed = true
          }
        }
      }
      return {newboard, newNonMinesCount};  
    }
    const dx = [-1, 0, 1, 0]
    const dy = [0, 1, 0, -1]
    const isOk = (xx) => (xx >= 0 && xx < newboard.length);

    const dfs = (x, y) => {
      if(newboard[x][y].value == 0){
        for(let i = 0; i < 4; i ++) {
          if(isOk(x + dx[i]) && isOk(y + dy[i]) && newboard[x + dx[i]][y + dy[i]].revealed === false){
            const nx = x + dx[i]
            const ny = y + dy[i]
            newboard[nx][ny].revealed = true
            newNonMinesCount -= 1
            dfs(nx, ny)
          }
        }
      }
    }
    
    newboard[x][y].revealed = true
    newNonMinesCount -= 1
    dfs(x, y)
    
    return {newboard, newNonMinesCount};
};

