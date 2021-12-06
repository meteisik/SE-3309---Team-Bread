var express = require("express");
var router = express.Router();
const newConnection=require('./DBConnection');
const mysql=require('mysql');


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
router.get("/initializeTables", function(req, res, next) {
    let conn=newConnection();
    conn.connect();
    conn.query(`
    Drop View HCCInfo, hospitalInfo, clinicInfo; `,(err,row,fields)=>{
    if(err){
        console.log(err);
        }
        
    });
    conn.query(`Create view HCCInfo(address,cityName,spotName)
    AS select hcc.address, c.cityName, v.spotName from healthcarecentre as hcc 
        JOIN city as c ON hcc.UNLOCode=c.UNLOCode Left Join (select clinicName as spotName, address from vaccineclinic  
        UNION select hospitalName, address from hospital) as v on v.address=hcc.address; `,(err,row,fields)=>{
    if(err){
        console.log(err);
        }
        
    });
    conn.query(`Create view clinicInfo(address,clinicName,cityName)
    AS SELECT v.address, v.clinicName,c.cityName  FROM vaccineclinic AS v
            JOIN healthcarecentre AS hcc
            ON v.address=hcc.address
            JOIN city AS c
            ON hcc.UNLOCode=c.UNLOCode; `,(err,row,fields)=>{
    if(err){
        console.log(err);
        }
        
    });
    conn.query(`Create view hospitalInfo(address,hospitalName,bedsAvailable,numOfCovidCases,cityName)
    AS SELECT h.address, h.hospitalName, h.bedsAvailable,h.numOfCovidCases,c.cityName  FROM hospital AS h
        JOIN healthcarecentre AS hcc
        ON h.address=hcc.address
        JOIN city AS c
        ON hcc.UNLOCode=c.UNLOCode;`,(err,row,fields)=>{
    if(err){
        console.log(err);
        }
        
    });
    conn.query(`SELECT * FROM HCCInfo`,(err,row,fields)=>{
        if(err){
            console.log(err);
            }else{
            
                res.send(JSON.stringify(row));
            }
            
        })
    conn.end();
    
});

router.get("/getHealthCentres", function(req, res, next) {
    
    if(req.query.city==""){
       
        let conn=newConnection();
        conn.connect();
            
        conn.query(`Select * from HCCInfo;`,(err,row,fields)=>{
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
    }else{
        let conn=newConnection();
        conn.connect();
            
        conn.query(`Select * from HCCInfo
        Where cityName LIKE "`+req.query.city+`%";`,(err,row,fields)=>{
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
    }
        
    });


router.get("/getHospitals", function(req, res, next) {
    
    if(req.query.city==""){
       
        let conn=newConnection();
        conn.connect();
            
        conn.query(`Select * from hospitalInfo;`,(err,row,fields)=>{
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
    }else{
        let conn=newConnection();
        conn.connect();
            
        conn.query(`Select * from hospitalInfo
        Where cityName LIKE "`+req.query.city+`%";`,(err,row,fields)=>{
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
    }
        
    });

router.get("/getClinics", function(req, res, next) {
    
    if(req.query.city==""){
       
        let conn=newConnection();
        conn.connect();
            
        conn.query(`Select * from clinicInfo;`,(err,row,fields)=>{
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
    }else{
        let conn=newConnection();
        conn.connect();
            
        conn.query(`Select * from clinicInfo
        Where cityName LIKE "`+req.query.city+`%";`,(err,row,fields)=>{
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
    }
        
    });

//##################################  FOR APPOINTMENTS PAGE  #######################################

    router.get("/cities", function(req, res, next) {
        let conn=newConnection();
        conn.connect();
            
        conn.query("SELECT cityName FROM city",(err,row,fields)=>{
        if(err){ 
            console.log(err);
            }
            else{
                let allData={};

            for(r in row){
                allData[r]=row[r];
            }

            res.send(JSON.stringify(row))
        }
    });
    conn.end();
});

router.post("/vaccineClinics", function(req, res, next) {

    let cities = req.body.cityVal;
    console.log(req.body.cityVal);
    console.log(cities);

    let conn=newConnection();
    conn.connect();
        
    let queryStatement = `SELECT clinicName, c.address FROM healthcarecentre h, vaccineClinic c
                WHERE h.address = c.address AND h.UNLOCode = (SELECT UNLOCode FROM City
                WHERE cityName = ` + mysql.escape(cities) + `)`;
    
    conn.query(queryStatement,(err,row,fields)=>{
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

router.post("/appointmentTable", function(req, res, next) {

    let appointmentInfo = req.body.AppointmentInfo;
    hcId = appointmentInfo.healthCardId;
    address = appointmentInfo.address;
    date = appointmentInfo.date;
    console.log(hcId);
    console.log(address);
    console.log(date);

    

    let conn=newConnection();
    conn.connect();

    conn.query(`INSERT INTO vaccineAppointment
    VALUES ("${date}","${address}")`);

    conn.query(`INSERT INTO registration
    VALUES ("${hcId}","${date}")`);

    let queryStatement = `SELECT p.personName, v.injectionDate, v.address From Person p, vaccineappointment v
                WHERE p.healthCardId = "${hcId}" AND v.address = "${address}" AND v.injectionDate = "${date}"`;

    conn.query(queryStatement,(err,row,fields)=>{
    if(err){ 
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

