import './App.css';
import MyB from "./Mybutton"
import { Button1,Button3 } from './ButtonLib';  
import AP from './AboutPage';
import Profile from './Profile';
import ShoppingList from './ShoppingList';
import CountState from './CountState';
import { useState } from 'react';


function CountState2({ count, onClick}) {
  return (
      <div>
          <button onClick={onClick}>
          Clicked {count} times
          </button>
      </div>
  );
}

export default function App() {
    const [count,setCount] = useState(0);

    function handleClick() {
        setCount(count + 1)
    }

  return (
    <div className="wrapper">
      <div>
        <h1>Hello React</h1>
        <MyB /><br/>
        <Button1 /><br/>
        <Button3 />
        <AP />
        <Profile />
        <ShoppingList />
      </div>
      <div>
        <p>Updating the screen</p>
        <CountState/>
        <CountState/>
        <CountState/>
    
        <p>Sharing data between components</p>
        <CountState2 count={count} onClick={handleClick} />
        <CountState2 count={count} onClick={handleClick} />
      </div>
    </div>
  )  
}