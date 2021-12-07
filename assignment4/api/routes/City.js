var express = require("express");
var router = express.Router();
const newConnection=require('./DBConnection');
const mysql=require('mysql');

router.get("/", function(req, res, next) {

    res.send("API is working properly");
});

// the functions below assign the post request body to a variable, connects to the database, and then uses that variable to make a mysql query and then returns it to the react front end in a JSON string

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
router.post('/cityPopGet',function (req,res,next){

    let cities=req.body.cities
    console.log(cities);
    let conn=newConnection();
    conn.connect();
    let preparedStatement=`SELECT cityName, population 
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
router.post('/populationChange',function (req,res,next){
//this is a city population data mod, takes the post request and sends it to the database
    let cities='CA  '+req.body.cities+' ';
    let population=req.body.population;
    console.log(cities);
    console.log(population);
    let x=parseInt(population)



    let conn=newConnection();
    conn.connect();
    let preparedStatement=`SELECT cityName, population 
                            FROM City
                            WHERE UNLOCode=`+mysql.escape(cities);


    let preparedStatement2=`UPDATE city 
                            SET population= `+mysql.escape(population)
                            +`WHERE UNLOCode =`+mysql.escape(cities);


    conn.query(preparedStatement2,(err,row,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(row[0])
        }
    });

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
