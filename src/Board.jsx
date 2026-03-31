
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
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return(
    <Squares2 status={status} squares={squares} handleClick={handleClick}/>
  );
}

function Squares({status,squares,handleClick}) {
    return(
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value = {squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value = {squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

function Squares2({status,squares,handleClick}) {
    const boardRows = [];

    for (let row = 0; row < 3; row++ ) {
        const squaresInRow = [];

        for (let col = 0; col < 3; col++) {
            let index = row * 3 + col;
            squaresInRow.push(
                <Square key={index} value = {squares[index]} onSquareClick={() => handleClick(index)}/> 
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


function Square({value, onSquareClick}){

  return(
    <button 
      className="square"
      onClick={onSquareClick}
    >
    {value}
    </button>
  )
}
