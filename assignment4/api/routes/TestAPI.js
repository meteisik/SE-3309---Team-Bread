var express = require("express");
var router = express.Router();


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





router.get("/", function(req, res, next) {
    
    res.send("API is working properly");
});

router.get("/covidVarients", function(req, res, next) {
    const mysql=require('mysql');

    //function newConnection(){
    let conn = mysql.createConnection({ 
    host:'localhost',
    user:'root',
    password:'root',
    database:'covid',
    port:3306
 });
        conn.connect();
    conn.query("SELECT * FROM covidVarient",(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
        else{
            let allData={};

            for(r in row){
                allData[r]=row[r];
            }

            res.send(JSON.stringify(allData));
            console.log(row[0])
        }
    });
    conn.end();
    
});

module.exports = router;

