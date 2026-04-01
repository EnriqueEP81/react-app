
import { calculateWinner } from './utils';

export function Board({xIsNext, squares, onPlay}) {
  
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i]="X";
    } else {
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else if(squares.every(square =>square!==null)){
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return(
    <Squares status={status} squares={squares} handleClick={handleClick} winner={winner}/>
  );
}


function Squares({status,squares,handleClick,winner}) {
    const boardRows = [];

    for (let row = 0; row < 3; row++ ) {
        const squaresInRow = [];

        for (let col = 0; col < 3; col++) {
            let index = row * 3 + col;
            const isWinning = winner?.line?.includes(index);
            squaresInRow.push(
                <Square key={index} value = {squares[index]} onSquareClick={() => handleClick(index)} isWinning ={isWinning}/> 
            );
        }
        boardRows.push(
             <div key={row} className="board-row">{squaresInRow}</div>
        );
    }

    return(
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>    
    );
}


function Square({value, onSquareClick, isWinning}){

  return(
    <button 
      className={isWinning? "square winner":"square"}
      onClick={onSquareClick}
    >
    {value}
    </button>
  )
}
