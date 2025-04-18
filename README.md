# 202030334 한동렬

## 04월 18일 보강 (틱택토[submain브랜치])
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

## 04월 17일 수업내용
### slice()메서드
- array.slice(start, end)
> 인자로 start, end 가짐
------
▼ 아래 내용은 submain 브랜치 4월 17일 README와 동일함 
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
### history 및 handleplay 그리고 board.js > game.js


## 04월 10일 수업내용(틱택토게임)
```
react-1 submain 브랜치에서 틱택토 내용 readme 와 js파일 수정

```
## 04월 03일 수업내용
### 화면업데이트하기
- unstate로부터 현재의 state를 지정할 수 있는 변수인 count와 이름 업데이트할 수 있는 함수인 setCount를 얻을 수 있습니다.
- 변수이름과 변수 이름 앞에 set을 붙인 업데이트 함수를 관용적으로 사용

### Hook 사용하기
- use로 시작하는 함수를 Hook이라고 함
- usestate는 React에서 제공하는 내장 Hook임
- 다른 내장 Hook은 API 참고서에서 찾아볼 수 있음
- 또한 기존의 것들을 조합하여 자신만의 Hook 작성할 수 있음
- Hook은 다른 홤수보다 더 제한적
``` 
- component 또는 다른 Hook의 상단에서만 Hook을 호출할 수 있음.
- 조건이나 반복문에서 useState를 사용하고 싶다면 새 컴포넌트를 추출하여 그곳에 넣으세요.
```

### Hook 사용규칙
- 최상위에서만 호출해야함
- if, for, while 등의 블록 내부에서 Hooks를 호출하면 안 됨
- 함수의 조건문 내부에서 호출하면 실행 순서가 달라질 수 있기 떄문
- React 함수형 component 또는 사용자 Hook 내부에서만 사용 가능
```
React의 동작을 예측가능하고, 안정성을 높이기 위해 필요한 규칙입니다.
- rendering 순서를 보장하기 위해
- 불필요한 사이드 이펙트 방지
```

### 왜 function형 컴포넌트에만 Hook을 사용할까?
- Class형 component는 lifecycle 함수를 통해서 상태 관리를 했습니다.
- 그런 이유 떄문에 Class형 component는 유지보수가 어렵고 복잡해질 수 있었습니다.
- React는 component의 상태 관리와 로직을 더 간결하게 만들기 위해 Hooks를 도입함. 



## 03월 27일 수업내용

### Component의 생성 및 nesting(중첩)
- component는 고유한 로직, 모양을 가진 ui일부
- component는 버튼처럼 작을 수도 있고, 전체 페이지처럼 클 수도 있습니다.
- component는 마크엄을 반환하는 javascript 함수웁니다.
- Nesting은 CSS 선택자의 중첩구조를 생각하면 쉽게 이해가능

### export dafault와 export의 차이
```
Name Exports
- 하나의 파일안에 여러개의 component가 있을 때 사용
- component를 사용하는 쪽에서는 component 정확한 이름을 반드시 명시

default Exports
- 하나의 파일안에서 하나의 component만 내보내는 경우 사용
- component를 사용하는 쪽에서는 어떤 이름을 사용해도 됨
```

### JSX로 마크업 작성
- JSX는 HTML보다 더욱 엄격한 문법을 적용 합니다.
- JSX에서는 <"br" />같이 싱글 태그라도 태그를 닫아여 합니다
- React에서는 여러 개의 component를 JSX 태그로 반활할 수 있습니다.

### 스타일 추가하기
- React에서는 className으로 CSS 클래스를 지정합니다.
- className은 HTML의 class 속성과 동일한 방식으로 동작합니다.
- CSS규칙은 별도의 CSS 파일에 작성합니다. 그런데 React는 CSS 파일을 추가하는 방법을 규정하지는 않습니다.
> 정적 페이지를 작성할 때와 동일한 방법 지원
- 가장 간단한 방법은 HTML에 <'link'> 태그를 추가하는 것입니다.

### 데이터 표시하기
- JSX를 사용하면 자바스크립트에 마크업을 넣을 수 있습니다.
> 반대 아닌가? JS안의 마크업 안에 JS를 넣는 다는 것이 더 정확
- JSX코드 내에서 JavaScript로 탈출하여 변수나 표현식 사용하는 것
-이 방법을 "Escape Back"이라고 합니다.
- {} 중괄호 사용해서 변수나 표현식을 사용자에게 표시하도록 하는것


### 리스트 렌더링하기
- 컴포넌트 리스트를 렌더링하기 위해서는 for문 및 map()함수와 같은 자바스크립트 기능을 사용합니다.
- <'li'>에 key속성이 있는 것을 주목하세요
- 목록을 사용할 때는 각 항목에 대해 고유하게 식별하는 문자열 또는 숫자를 전달해야 합니다.
- 항목을 삽입,삭제, 또는 재정렬할 떄 어떤 일이 일어났는지 알기 위해 key를 사용합니다.

# 
## 03월 20일 수업내용
