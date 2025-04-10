# 202030334 한동렬 
## 04월 10일 수업(틱택토)

### 9개 사각형 생성 APP.JS
- props 데이터전달
``` 
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
```
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
```
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