import './App.css';
import MyB from "./Mybutton"
import { Button1,Button3 } from './ButtonLib';  
import AP from './AboutPage';
import Profile from './Profile';
import ShoppingList from './ShoppingList';

export default function App() {
  return (
    <div className="wrapper">
      <h1>Hello React</h1>
      <MyB /><br/>
      <Button1 /><br/>
      <Button3 />
      <AP />
      <Profile />
      <ShoppingList />
    </div>
  )  
}