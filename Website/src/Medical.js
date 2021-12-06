import React,{useState,useEffect} from 'react'
import HospitalTable from "./Components/Tables/HospitalTable.js"
import HealthCareCentreTable from "./Components/Tables/HealthCareCentreTable"
import VaccineClinicTable from "./Components/Tables/VaccineClinicTable"


import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
function Tables(props) {
  const tableNum = props.tableState;
  if (tableNum==0) {
    return <HealthCareCentreTable HCC={props.apiTable}></HealthCareCentreTable>;
  }else if(tableNum==1){
    return <VaccineClinicTable clinicArray={props.apiTable}></VaccineClinicTable>
  }else{
    return <HospitalTable hospitalArray={props.apiTable}></HospitalTable>;
  }
  
}

function Medical() {
 
    const [apiResponse, setResponse] = useState([]);
    const [tableState, setTableState] = useState(0);

    useEffect(() => {
        getDefaultTable();
    }, []);

    function getDefaultTable() {
        fetch("http://localhost:9000/testAPI/getHealthCentres")
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));
          setTableState(0);
           
      }
      function getClinics() {
        fetch("http://localhost:9000/testAPI/getClinics")
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));
            setTableState(1);
      }
      function getHospitals() {
        fetch("http://localhost:9000/testAPI/getHospitals")
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));
            setTableState(2);
      }
      return(

        
        <Box >
        <Grid container spacing={1}>
          <Grid item xs={1} > 
              <Box sx={{ bgcolor: '#ff9800', height: '100vh' }} />
          </Grid>
  
          <Grid item xs={10}>
          <Container >
          <List>
  
          <ListItem >
           

        <button onClick={getDefaultTable}>All</button>
        <button onClick={getClinics}>Clinics</button>
        <button onClick={getHospitals}>Hospitals</button>

          

        
        </ListItem>
        <Divider light />
        
        <ListItem >
          Filter by City:
        <TextField
                label="City"
            />
        </ListItem>
        <Divider light />
        <ListItem>
          <Tables tableState={tableState} apiTable={apiResponse}></Tables>
        </ListItem>
          </List>
        </Container>
          </Grid>
          <Grid item xs ={1}>
          <Box sx={{ bgcolor: '#ff9800', height: '100vh' }} />
          </Grid>
        </Grid>
      </Box>
      )

    
}


export default Medical
