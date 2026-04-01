
import './styles.css';
import { useState } from 'react';
import { Board } from "./Board";
import { findChangedCoord } from './utils';


function App() {
  return (
    <>
      <h1>Tic, tac, toe</h1>
      <Game/>
    </>
  )
}

function Game(){
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAsc, setIsasc] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function setOrder() {
    setIsasc(!isAsc);
  }

  const moves = history.map((squares,i) =>{

    const move = isAsc ? i : history.length -1 -i;

    
    let description;
    if(move > 0) {
      const coordChanged = findChangedCoord(history[move-1],history[move]);
      if (move === history.length -1){
        description = 'Estas en el movimiento #' + move +' ('+coordChanged.row +','+ coordChanged.col +")";
        return (
          <li key={move}>
            <span>{description}</span>
          </li>
        )
      } else {
        description = 'Ir al movimiento #' + move + ' ('+coordChanged.row +','+ coordChanged.col +")";
      }
    }
    else {
      description = 'Ir al movimiento al inicio del juego'
    }


    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )

  });
  

  return(
    <div className='game'>
      <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <button onClick={setOrder}>Cambiar orden</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


export default App

