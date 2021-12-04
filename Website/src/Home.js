import React , { useState,useEffect }from 'react'
import { Typography } from '@mui/material'

function database(){
    const mysql=require('mysql');

    //function newConnection(){
    let conn = mysql.createConnection({ 
    host:'localhost',
    user:'root',
    password:'root',
    database:'covid',
    port:3306
 });
// return conn;
// }


   // let conn=newConnection();

        conn.connect();
    conn.query("SELECT * FROM covidVarient",(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
        else{
            console.log(row[0])
        }
    });
    conn.end();
}


function Home() {
    
    const [apiResponse, setResponse] = useState('');

   /* useEffect(() => {
        callAPI();
    }, []);*/

    function getCovidVarients() {
        fetch("http://localhost:9000/testAPI/covidVarients")
            .then(res => res.text())
            .then(res => setResponse(res));
      }


    return (
       
<div id ="message container"> 

<button onClick={getCovidVarients}>click me</button>
<text>{apiResponse}</text>

</div>





    )
}

export default Home
