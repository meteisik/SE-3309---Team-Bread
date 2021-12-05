import logo from './kermit.jpg';
import logo2 from './Trig.jpg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import NavbarVer2 from './NavbarVer2';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import City from './City';
import Home from './Home';
import Table from "./Components/Tables/Table"
import Appointments from "./Appointments"
import Medical from "./Medical"
//Implement Control + C as a button bound.


function App() {



  return (

    <div className="App">

  <BrowserRouter>
      <NavbarVer2/>
      <Switch>
   
   
                
                <Route path='/Home' component={Home} />
                <Route path='/City' component={City}/>
                <Route path='/Appointments' component={Appointments}/>
                <Route path='/Medical' component={Medical}/>

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
