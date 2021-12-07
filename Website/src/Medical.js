import React, { useState, useEffect } from 'react'
import HospitalTable from "./Components/Tables/HospitalTable.js"
import HealthCareCentreTable from "./Components/Tables/HealthCareCentreTable"
import VaccineClinicTable from "./Components/Tables/VaccineClinicTable"
import AverageStaffTables from "./Components/Tables/AverageStaffTable"


import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';

function Tables(props) {
  const tableNum = props.tableState;
  if (tableNum === 0) {
    return <HealthCareCentreTable HCC={props.apiTable}></HealthCareCentreTable>;
  } else if (tableNum === 1) {
    return <VaccineClinicTable clinicArray={props.apiTable}></VaccineClinicTable>
  } else {
    return <HospitalTable hospitalArray={props.apiTable}></HospitalTable>;
  }

}

function Medical() {

  const [apiResponse, setResponse] = useState([]);
  const [tableState, setTableState] = useState(0);
  const [cityNameState, setCityState] = useState('');
  const [averageState, setAverageState] = useState([]);
  
  

  useEffect(() => {
    getDefaultTable();
    getAverageTable();
  }, []);

  function getAverageTable() {
    fetch("http://localhost:9000/testAPI/AverageStaff" )
        .then(res => res.text())
        .then(res => setAverageState(JSON.parse(res)));

  }
  function getDefaultTable() {
    fetch("http://localhost:9000/testAPI/initializeTables" )
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));

  }
  function getHCC() {
    setTableState(0);
    fetch("http://localhost:9000/testAPI/getHealthCentres?city=" + cityNameState)
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));

  }
  function getClinics() {
    setTableState(1);
    fetch("http://localhost:9000/testAPI/getClinics?city=" + cityNameState)
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));

  }
  function getHospitals() {
    setTableState(2);
    fetch("http://localhost:9000/testAPI/getHospitals?city=" + cityNameState)
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));
  }
  function getHCCByCity() {
    if (tableState === 0) {
      fetch("http://localhost:9000/testAPI/getHealthCentres?city=" + cityNameState)
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));

    } else if (tableState === 1) {
      fetch("http://localhost:9000/testAPI/getClinics?city=" + cityNameState)
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));

    } else {
      fetch("http://localhost:9000/testAPI/getHospitals?city=" + cityNameState)
        .then(res => res.text())
        .then(res => setResponse(JSON.parse(res)));

    }
  }

  
  
  return (


    <Box >
      <Grid container spacing={1}>
        <Grid item xs={1} >
          <Box sx={{ bgcolor: '#ff9800', height: '100vh' }} />
        </Grid>

        <Grid item xs={10}>
          <Container >
            <List>

              <ListItem >


                <Button onClick={getHCC}>All</Button>
                <Button onClick={getClinics}>Clinics</Button>
                <Button onClick={getHospitals}>Hospitals</Button>




              </ListItem>
              <Divider light />
              <ListItem >
                <h3>Vaccine clinics with more than average employees</h3>
              </ListItem>
              <ListItem >
                <AverageStaffTables  Average={averageState}></AverageStaffTables>
              </ListItem>
              <Divider light />
              <ListItem >
                Filter by City:
                <TextField
                value={cityNameState}
                  label="City"
                  onChange={(e)=>{setCityState(e.target.value)}}
                />
                <Button onClick={getHCCByCity}>Submit</Button>
              </ListItem>
              <Divider light />
              <ListItem >
                <h3>HealthCare Centres</h3>
              </ListItem>
              <ListItem>
                <Tables tableState={tableState} apiTable={apiResponse}></Tables>
              </ListItem>
            </List>
          </Container>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{ bgcolor: '#ff9800', height: '100vh' }} />
        </Grid>
      </Grid>
    </Box>
  )


}


export default Medical
