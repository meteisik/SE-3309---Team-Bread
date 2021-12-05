var express = require("express");
var router = express.Router();
const newConnection=require('./DBConnection');
const mysql=require('mysql');

router.get("/", function(req, res, next) {

    res.send("API is working properly");
});



router.post('/cities',function (req,res,next){


    let cities=req.body.cities

    console.log(cities);
    let conn=newConnection();
    conn.connect();


    let preparedStatement=`SELECT outbreakDistrict, numPeople, numCases, numResolved, numRecovered
                            FROM Hotspot
                                WHERE UNLOCode = (SELECT UNLOCode FROM City WHERE cityName=` +mysql.escape(cities) +` )`;

    conn.query(preparedStatement,(err,row,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            let allData={};

            for(r in row){
                allData[r]=row[r];
            }

            res.send(JSON.stringify(row));
            console.log(row[0])
        }
    });
    conn.end();


});

router.post('/vaccinatedincities',function (req,res,next){

    let cities=req.body.cities
    console.log(cities);
    let conn=newConnection();
    conn.connect();
    let preparedStatement=`SELECT cityName ,population-(SELECT COUNT(healthCardID)
                            FROM Person
                            WHERE doseNumber = 0 AND UNLOCode =(SELECT UNLOCode FROM City WHERE cityName=`+mysql.escape(cities)+` )) AS healthyPop
                            FROM City
                            WHERE cityName=`+mysql.escape(cities);

    conn.query(preparedStatement,(err,row,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            let allData={};

            for(r in row){
                allData[r]=row[r];
            }

            res.send(JSON.stringify(row));
            console.log(row[0])
        }
    });
    conn.end();




} );


router.post('/totalCasesinCity',function (req,res,next){
    let cities=req.body.cities
    console.log(cities);
    let conn=newConnection();
    conn.connect();
    let preparedStatement=`SELECT sum(numCases) as sumCases
                            FROM Hotspot
                            WHERE UNLOCode = (SELECT UNLOCode FROM City WHERE cityName=` +mysql.escape(cities) +` )`

    conn.query(preparedStatement,(err,row,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            let allData={};

            for(r in row){
                allData[r]=row[r];
            }

            res.send(JSON.stringify(row));
            console.log(row[0])
        }
    });
    conn.end();




});

module.exports = router;
