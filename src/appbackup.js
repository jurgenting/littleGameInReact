import React, {useState} from "react";

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*todo*/}</ol>
      </div>
    </div>


  );
}

export function Board() {
  const [xTurn, setXTurn] = useState(true);
  const [values, setValues] = useState(new Array(9).fill(null));
  let winner = null;

  function handleClickSquare(i) {
    if (values[i] != null || calculateWinner(values)) {
      return;
    }

    const copyValues = values.slice();
    if(xTurn){
      copyValues[i] = 'X';
      values[i] = 'X';
    }
    else {
      copyValues[i] = 'O';
      values[i] = 'O';
    }
    setValues(values);
    setXTurn(!xTurn);
    console.log('copyValues: ' + copyValues);
  }

  let winnerMark = calculateWinner(values);
  if(winnerMark != null) {
    winner = 'The winner is: ' + winnerMark;
  }
  

  console.log('just before board render: ' + values);
  return (
    <div>
      <div className="status">{winner}</div>
      <div className="board-row"></div>
      <Square value = {values[0]} onSquareClick = {() => handleClickSquare(0)}/>
      <Square value = {values[1]} onSquareClick = {() => handleClickSquare(1)}/>
      <Square value = {values[2]} onSquareClick = {() => handleClickSquare(2)}/>
      <div className="board-row"></div>
      <Square value = {values[3]} onSquareClick = {() => handleClickSquare(3)}/>
      <Square value = {values[4]} onSquareClick = {() => handleClickSquare(4)}/>
      <Square value = {values[5]} onSquareClick = {() => handleClickSquare(5)}/>
      <div className="board-row"></div>
      <Square value = {values[6]} onSquareClick = {() => handleClickSquare(6)}/>
      <Square value = {values[7]} onSquareClick = {() => handleClickSquare(7)}/>
      <Square value = {values[8]} onSquareClick = {() => handleClickSquare(8)}/>
    </div>
  );
}

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
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
