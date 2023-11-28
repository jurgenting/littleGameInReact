import React, {useState} from "react";

export default function Game() {
  const [valuesArray, setValuesArray] = useState([new Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  function jumpTo(index) {
    setCurrentMove(index);
  }

  let moves = valuesArray.map((values, index) => {
    let description;
    if (index > 0) {
      description = 'Go to move #' + index;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={index} >
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  })


  return (
    <div className="game">
      <div className="game-board">
        <Board values = {valuesArray[currentMove]} onMove = {onMove} onRestart = {restartGame}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
  
  function onMove(values) {
    console.log(valuesArray);
    const a = [...valuesArray.slice(0, currentMove + 1), values];
    setValuesArray(a);
    setCurrentMove(a.length - 1);
  }

  function restartGame() {
    setValuesArray([new Array(9).fill(null)]);
    setCurrentMove(0);
  }
}

function Board({values, onMove, onRestart}) {
  const [xTurn, setXTurn] = useState(true);
  
  let winner = null;
  let nextPlayer = 'X';

  function handleClickSquare(i) {
    if (values[i] != null || calculateWinner(values)) {
      return;
    }

    const copyValues = values.slice();
    if(xTurn){
      copyValues[i] = 'X';
      nextPlayer = 'O';
    }
    else {
      copyValues[i] = 'O';
      nextPlayer = 'X'
    }
    setXTurn(!xTurn);
    console.log('copyValues: ' + copyValues);
    onMove(copyValues);

  }

  let winnerInfo = calculateWinner(values);
  console.log(winnerInfo);
  let winnerMark;
  if(winnerInfo != null) {
    winnerMark = winnerInfo[3];
    winner = 'The winner is: ' + winnerMark;
  }

  function highLight(winnerInfoArray, index) {
    if(winnerInfoArray != null) {
      console.log("winnerInfoArray is NOT null");
      console.log(winnerInfoArray);
      return winnerInfoArray.indexOf(index);
    }
    else {
      console.log("winnerInfoArray is null");
      return -1;
    }
    
  }
  

  console.log('just before board render: ' + values);
  return (
    <div>
      <div className="status">{winner}</div>
      <div className="status">Next player: {xTurn? 'X':'O'}</div>
      <button onClick={onRestart}>Restart game</button>
      <div className="board-row"></div>
      <Square value = {values[0]} onSquareClick = {() => handleClickSquare(0)} highLight = {highLight(winnerInfo, 0)}/>
      <Square value = {values[1]} onSquareClick = {() => handleClickSquare(1)} highLight = {highLight(winnerInfo, 1)}/>
      <Square value = {values[2]} onSquareClick = {() => handleClickSquare(2)} highLight = {highLight(winnerInfo, 2)}/>
      <div className="board-row"></div>
      <Square value = {values[3]} onSquareClick = {() => handleClickSquare(3)} highLight = {highLight(winnerInfo, 3)}/>
      <Square value = {values[4]} onSquareClick = {() => handleClickSquare(4)} highLight = {highLight(winnerInfo, 4)}/>
      <Square value = {values[5]} onSquareClick = {() => handleClickSquare(5)} highLight = {highLight(winnerInfo, 5)}/>
      <div className="board-row"></div>
      <Square value = {values[6]} onSquareClick = {() => handleClickSquare(6)} highLight = {highLight(winnerInfo, 6)}/>
      <Square value = {values[7]} onSquareClick = {() => handleClickSquare(7)} highLight = {highLight(winnerInfo, 7)}/>
      <Square value = {values[8]} onSquareClick = {() => handleClickSquare(8)} highLight = {highLight(winnerInfo, 8)}/>
    </div>
  );
}

function Square({value, onSquareClick, highLight}) {
  let className;
  console.log('hightlight' + highLight);
  className = highLight === -1 ? "square" : "squarehighlight";
  
  return <button className={className} onClick={onSquareClick}>{value}</button>;
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] != null) {
      return [...lines[i], squares[a]];
    }
  }
  return null;
}
