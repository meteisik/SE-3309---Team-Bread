import React,{useState,useEffect} from 'react'
import { Typography } from '@mui/material'
import Table from "./Table"




function Medical() {
 
    const [apiResponse, setResponse] = useState('');

    useEffect(() => {
        getDefaultTable();
    }, []);


    

      function getDefaultTable() {
        fetch("http://localhost:9000/testAPI/getHealthCentres")
            .then(res => res.text())
            .then(res => setResponse(res));
      }
      function getClinics() {
        fetch("http://localhost:9000/testAPI/getClinics")
            .then(res => res.text())
            .then(res => setResponse(res));
      }
      function getHospitals() {
        fetch("http://localhost:9000/testAPI/getHospitals")
            .then(res => res.text())
            .then(res => setResponse(res));
      }


    
    return (
       
<div id ="message container"> 

<button onClick={getClinics}>Clinics</button>
<button onClick={getHospitals}>Hospitals</button>
<button onClick={getDefaultTable}>All</button>
<text>{apiResponse}</text>
</div>





    )
}

export default Medical
