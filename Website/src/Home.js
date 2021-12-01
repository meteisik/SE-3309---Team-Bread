import React from 'react'
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
    
    return (
       
<div id ="message container"> 

<button onClick={database}>click me</button>

</div>





    )
}

export default Home
