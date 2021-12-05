var express = require("express");
var router = express.Router();
const newConnection=require('./DBConnection');

router.get("/", function(req, res, next) {
    
    res.send("API is working properly");
});

router.get("/covidVarients", function(req, res, next) {
    let conn=newConnection();
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

///////////////////////get requests for the medical section\\\\\\\\\\\\\\\\\\\\\\\\\\
router.get("/getHealthCentres", function(req, res, next) {
    let conn=newConnection();
    conn.connect();
        
    conn.query(`select hcc.address, c.cityName, v.spotName from healthcarecentre as hcc 
    JOIN city as c ON hcc.UNLOCode=c.UNLOCode Left Join (select clinicName as spotName, address from vaccineclinic  
    UNION select hospitalName, address from hospital) as v on v.address=hcc.address; `,(err,row,fields)=>{
    if(err){
        console.log(err);
        }
        else{
            let allData={};
            for(r in row){
                allData[r]=row[r];
            }
            res.send(JSON.stringify(row));
        }
    });
    conn.end();
    
});

router.get("/getHospitals", function(req, res, next) {
    let conn=newConnection();
    conn.connect();
        
    conn.query(`SELECT h.address, h.hospitalName, h.numOfCovidCases,h.bedsAvailable,c.cityName  FROM hospital AS h
    JOIN healthcarecentre AS hcc
    ON h.address=hcc.address
    JOIN city AS c
    ON hcc.UNLOCode=c.UNLOCode;`,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
        else{
            let allData={};
            for(r in row){
                allData[r]=row[r];
            }
            res.send(JSON.stringify(row));
        }
    });
    conn.end();
    
});

router.get("/getClinics", function(req, res, next) {
    let conn=newConnection();
    conn.connect();
        
    conn.query(`SELECT v.address, v.clinicName,c.cityName  FROM vaccineclinic AS v
    JOIN healthcarecentre AS hcc
    ON v.address=hcc.address
    JOIN city AS c
    ON hcc.UNLOCode=c.UNLOCode;`,(err,row,fields)=>{
    if(err){ 
        console.log(err);
        }
        else{
            let allData={};
            for(r in row){
                allData[r]=row[r];
            }
            res.send(JSON.stringify(row));
        }
    });
    conn.end();
    
});



module.exports = router;

