var express = require("express");
var router = express.Router();
const newConnection=require('./DBConnection');

router.get("/", function(req, res, next) {
    
    res.send("API is working properly");
});

router.get("/vaccinePercentages", function(req, res, next) {
   let conn=newConnection();
   conn.connect();
      
   conn.query(
   `
   SELECT vaccinedStatus, count(*) * 100.0 / sum(count(*)) over() as percentage
   FROM PERSON
   GROUP BY vaccinedStatus;
   
   `,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
   else{
      res.send(JSON.stringify(row));
      console.log(row[0])
   }
   });
   conn.end();
});

router.get("/mortalityRecoveryRates", function(req, res, next) {
   let conn=newConnection();
   conn.connect();
      
   conn.query(
   `
   SELECT AVG(mortalityRate) as AverageMortalityRate, AVG(recoveryRate) as AverageRecoveryRate
   FROM covidvarient

   `,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
   else{
      res.send(JSON.stringify(row));
      console.log(row[0])
   }
   });
   conn.end();
});

router.get("/numberOfCases", function(req, res, next) {
   let conn=newConnection();
   conn.connect();
      
   conn.query(
   `
   SELECT SUM(numOfCovidCases) AS NumberOfCases
   FROM HOSPITAL 
   
   `,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
   else{
      res.send(JSON.stringify(row));
      console.log(row[0])
   }
   });
   conn.end();
});

router.get("/totalPopulation", function(req, res, next) {
   let conn=newConnection();
   conn.connect();
      
   conn.query(
   `
   SELECT SUM(population) AS Population
   FROM CITY 
   
   `,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
   else{
      res.send(JSON.stringify(row));
      console.log(row[0])
   }
   });
   conn.end();
});

router.get("/topHotspots", function(req, res, next) {
   let conn=newConnection();
   conn.connect();
      
   conn.query(
   `
   SELECT outbreakDistrict, numCases, infectionName
   FROM HOTSPOT
   NATURAL JOIN INFECTION
   ORDER BY numCases DESC
   LIMIT 3
   
   `,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
   else{
      res.send(JSON.stringify(row));
      console.log(row[0])
   }
   });
   conn.end();
});

module.exports = router;

