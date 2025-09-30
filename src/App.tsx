import './App.css'

import { useState } from 'react';

function Square({value,onSquareClick}){
  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(16).fill('blank'));

  function handleClick(i){
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      </div>
      <div className="board-row">
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      </div>
      <div className="board-row">
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
        <Square value={squares[10]} onSquareClick={() => handleClick(10)}/>
        <Square value={squares[11]} onSquareClick={() => handleClick(11)}/>
      </div>
      <div className="board-row">
        <Square value={squares[12]} onSquareClick={() => handleClick(12)}/>
        <Square value={squares[13]} onSquareClick={() => handleClick(13)}/>
        <Square value={squares[14]} onSquareClick={() => handleClick(14)}/>
        <Square value={squares[15]} onSquareClick={() => handleClick(15)}/>
      </div>
    </>
  )
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}