import './App.css'

import { useState } from 'react';

function Square({value,onSquareClick}){
  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function indexnum(i,j,n){
  return i+j*n;
}

export default function Board() {
  const n = 8;
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(n*n).fill());

  function genboard(){
    let allarr = []
    for(let j=0; j<n; j++){
      let rowarr = [];
      for (let i=0; i < n; i++){
          rowarr.push(<Square value={squares[i+j*n]} onSquareClick={() =>handleClick(indexnum(i,j,n),n)} />)
        };
      allarr.push(<div className="board-row">{rowarr}</div>);
    }
    return allarr;
  }

  function handleClick(i,n){
    //console.log(squares);
    if (squares[i] || calculateWinner(squares,n)){
    }
    else{
      const nextSquares = squares.slice();
      if (xIsNext){
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  }

  return (
    <>
        {genboard()}
    </>
  )
}

  function nCoordList(a,b,n,updisplace,rightdisplace){
    let arr = []; 
    for(let i=0;i<n;i++){
      //ループ1回ごとにrightdisplace右にずれ、-updisplace下にずれる
      arr.push(indexnum(a+i*rightdisplace,b-i*updisplace,n)); 
    }
    return arr;
  }

  function winnerLines(n){
    let winarr =[];
    for(let j=0;j<n;j++){
      winarr.push(nCoordList(j,0,n,-1,0)); //列方向,上から下
    }
    for(let j=0;j<n;j++){
      winarr.push(nCoordList(0,j,n,0,1)); //行方向,左から右
    }
    winarr.push(nCoordList(0,0,n,-1,1)); //左上から右下
    winarr.push(nCoordList(n-1,0,n,-1,-1)); //右上から左下
    return winarr;
  }

  function isElementAllSame(list){
    let t = true;
    for (let i=1; i<list.length; i++){
      if(list[i]!==list[i-1]){
        t = false;
      }
    }
    return [t,list[0]];
  }

  function squarePick(squares,line){
    let list=[];
    //console.log(squares);
    console.log(line);
    for(let i=0; i<line.length; i++){
      console.log(line);
      console.log(squares[line[i]]);
      list.push(squares[line[i]]);
    }
    console.log(list);
    return list;
  }

  function calculateWinner(squares,n) {
    const lines = winnerLines(n);
    //console.log(squares);
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (isElementAllSame(squarePick(squares,line))[0]===true) {
        return isElementAllSame(squarePick(squares,line))[1];
      }
    }
    return null;
  }
