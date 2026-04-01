export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}


export function findChangedIndex(prevSquares, currentSquares){
  return currentSquares.findIndex((val,i) => val!==prevSquares[i])
}

export function findChangedCoord(prevSquares, currentSquares){
  if(!prevSquares) return null;
  return indexToCoord(currentSquares.findIndex((val,i) => val!==prevSquares[i]));
}

function indexToCoord(index){
  return {
    row: Math.floor(index/3),
    col:index % 3
  }
}