import logo from './kermit.jpg';
import logo2 from './Trig.jpg';
import './App.css';
import React , { useState,useEffect }from 'react';
import ReactDOM from 'react-dom';
import NavbarVer2 from './NavbarVer2';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './Chat';
import Home from './Home';




//Implement Control + C as a button bound.


function App() {
  

const [apiResponse, setResponse] = useState('');

useEffect(() => {
    callAPI();
}, []);

function callAPI() {
  fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setResponse(res));
}

  return (

    <div className="App">
      <text>{apiResponse}</text>
    
  <BrowserRouter>
      <NavbarVer2/>
      <Switch>
   
   
                <Route path='/' exact component={Home} />
                <Route path='/Home' exact component={Home} />
                <Route path='/Chat' component={Chat}/>


      </Switch>

      
    </BrowserRouter>
    
      
    </div>
  );
}






export default App;
{/*

  function closeTab(){
    window.close();
}
*/}
 {/*<button type="button" onClick={closeTab}>
        EXIT</button> */} 