# 202030334 한동렬 

## 04월 18일 보강
### 화면 한줄꺠짐 수정
```js
export default function Square({value, onSquareClick}) {
    return(
        <>
          <button className="square" onClick={onSquareClick}>
            {value}
          </button>
        </>
    );
  }
```
### 과거 움직임 수정
```js
function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    } 
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
```
### map의 기본 구문
- map(callbackFn)

- map(callbackFn, thisArg)
> thisArg = 내부에서 this로 사용할 값을 지정하는데 화살표 함수에선 생략

- 원본배열(history) : map이 호출된 원본 배열
- 원본배열 인덱스(move) : 현재 순환 중인 원본 배열 요소의 인덱스
- 요소 값 (squares) : 현재 순회 중인 요소 배열의 값

### key 선택하기
- key는 react에서 특별하게 미리 지정된 프로퍼티
- 엘리먼트가 생성되면 react는 key 프로퍼티를 추출하여 반환되는 엘리먼트에 직업 key를 지정
- key가 props로 전달되는것처럼 보일 수 있지만 react는 자동으로 key를 사용해 업데이트할 컴포넌트를 결정

### 틱택토 최종 마무리 [submain 브랜치 Game.js] 수정

## 04월 17일 수업(틱택토)
### 새로운 문법 화살표 함수
- ( ) =>
> 간단하게 함수 표시
### 모든영역 클릭시 x 표시
```jsx
import Square from "./Square";
import {
  useState
} from 'react';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    const nextSquares = squares.slice()
    nextSquares[i] = "x"
    setSquares(nextSquares)
  }
  return(
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
        <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=> handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=> handleClick(4)} />
        <Square value={squares[5]} onSquareClick={()=> handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=> handleClick(6)} />
        <Square value={squares[7]} onSquareClick={()=> handleClick(7)} />
        <Square value={squares[8]} onSquareClick={()=> handleClick(8)} />
      </div>
    </>
  );
}
```
### state 끌어올리기 <중요>
- DOM `<button>` 엘리먼트의 on click 어트리뷰트는 빌트인 컴포넌트이기에 react에서 특별한 의미를 가짐

- 사용자 정의 컴포넌트, 예를 들어 Square 경우 이름은 사용자가 원하는 대로 지을 수 있음.

### 불변성?
값이나 상태를 변경할 수 없음을 의미

### 불변성이 왜 중요한가
 최종 결과는 같지만, 원본 데이터를 직접 변형하지 않음으로서 몇 가지 이점을 얻을수 있음

- 불변성을 사용하면 복잡한 기능을 훨씬 쉽게 구현할 수 있음

- 기본적으로 부모 컴포넌트 state가 변경되면 모든 자식 컴포넌트가 자동으로 다시 렌더링 됨

- 불변성을 사용하면 컴포넌트가 데이터의 변경 여부를 저렴한 비용으로 판단할 수 있음.

### x, o 교대로 두기 코드 수정
```js
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); 
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "x"
    } else {
      nextSquares[i] = "o"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext);
  }
}
```

### 두번 클릭시 바뀌는 값 수정
```js
function handleClick(i) {
    if (squares[i]) {
      return;
    }
```
> return값이 없는이유 : '함수를 즉시 종료해라'를 의미

### 구조분해할당
배열이나 객체의 구조를 해체하여 내부 값을 개별 변수에 쉽게 할당하는 방법
- 이를 통해 코드 강결성, 가독성 높임

### 최종 틱택토 코드 [Board.js]
```JS
import Square from "./Square";
import {
  useState
} from 'react';


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "x"
    } else {
      nextSquares[i] = "o"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext);
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
      [2, 4, 6],     
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return(
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
        <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=> handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=> handleClick(4)} />
        <Square value={squares[5]} onSquareClick={()=> handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=> handleClick(6)} />
        <Square value={squares[7]} onSquareClick={()=> handleClick(7)} />
        <Square value={squares[8]} onSquareClick={()=> handleClick(8)} />
      </div>
    </>
  );
}
```

## 04월 10일 수업(틱택토)

### 9개 사각형 생성 APP.JS
- props 데이터전달
``` jsx
import './App.css';

function Board() {
  return (
      <>
        <div className="board-row">
          <Square value='1' />
          <Square value='2' />
          <Square value='3' />
        </div>
        <div className="board-row">
          <Square value='4' />
          <Square value='5' />
          <Square value='6' />
        </div>
        <div className="board-row">
          <Square value='7' />
          <Square value='8' />
          <Square value='9' />
        </div>
      </>
  )
}

function Square({value}) {
  return (
    <>
      <button className="square">{value}</button>
    </>
  )
}

export default function App() {
  return (
    <div>
      <h1>tic tak toe 게임</h1>
      <Board />
    </div>
  );
}
  
```
### 클릭시 콘솔에 로그(수정)
```jsx
function Square({value}) {
  function handleClick() {
    console.log('clicked!');
  }

  return (
    <>
      <button 
        className="square"
        onClick={handleClick}
        >
        {value}
      </button>
    </>
  )
}
```

### 콘솔 대신 클릭시 X
```jsx
import {useState} from 'react';

function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue('X');
  }

  return (
    <>
      <button 
        className="square"
        onClick={handleClick}
        >
        {value}
      </button>
    </>
  )
}
```

- 코드가 너무 길어서 App.js . Board.js . Square.js 수정