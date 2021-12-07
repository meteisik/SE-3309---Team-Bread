import React, { useState, useEffect } from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container'
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


function Appointments() {

//------------------------- FUNCTIONS USED FOR RETRIEVING, FORMATTING DISPLAYING CITIES ------------------------------------------------------------

    useEffect(() => {
        getCitiesFromDB();
        //getAppointmentsFromDB();
      }, []);

    //Get cities
    const [apiCityResponse, setCityResponse] = React.useState([]);
    
    function getCitiesFromDB() {
        fetch("http://localhost:9000/testAPI/cities")
            .then(res => res.text())
            .then(res => setCityResponse(JSON.parse(res)));
    }

    //format citis for autocomplete input
    function formatCities(){
        let cityNames = "";
        for (let c in apiCityResponse){
            cityNames += apiCityResponse[c].cityName + "*";
        }
        return cityNames;
    }
    //set values to interact with database and retrieve clinic names
    const [cityValue, setCityValue] = React.useState('');
    const [cityInputValue, setCityInputValue] = React.useState('');


    //-------------------------------------------- FUNCTIONS USED FOR RETRIEVING, FORMATTING DISPLAYING CLINICS ----------------------------------------------------------------

    const[apiClinicResponse, setClinicResponse] = React.useState([]);

    function getVaccineClinicsFromDB(cityVal) {
		//takes the text box value and adds it to a post request
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cityVal})
        };

        fetch("http://localhost:9000/testAPI/vaccineClinics", requestOptions)
            .then(res => res.text())
            .then(res => setClinicResponse(JSON.parse(res)));
    }
    function formatClinics(){
        let clinicInfo = "";
        console.log(apiClinicResponse);
        for (let c in apiClinicResponse){
            console.log(apiClinicResponse[c]);
            clinicInfo += "" + apiClinicResponse[c].clinicName + "*";
        }
        console.log(clinicInfo);
        return clinicInfo;
    }
    function getClinicAddress(val){
        let clinicAddress = "";
        for (let c in apiClinicResponse){
            if(apiClinicResponse[c].clinicName == val)
                clinicAddress += "" + apiClinicResponse[c].address;
        }
        console.log(clinicAddress);
        return clinicAddress;
    }
    const [clinicValue, setClinicValue] = React.useState('');
    const [clinicInputValue, setClinicInputValue] = React.useState('');
    const [clinicAddress, setClinicAddress] = React.useState('');

    //-------------------------------------------------------------------------------------------------------

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    //-------------------------------------- FUNCTIONS USED FOR RETRIEVING, FORMATTING DISPLAYING APPOINTMENTS -------------------------------------------------------------

    const[apiAppointmentResponse, setAppointmentResponse] = React.useState([]);

    const[disabled, setDisabled] = React.useState(true);

    function createAppointment(){

        setDisabled(false);
    
        let hcID = document.getElementById('healthcardID').value;
        let date = document.getElementById('date').value;

        let AppointmentInfo = {
            healthCardId : hcID,
            address : clinicAddress,
            date: date
        }

        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({AppointmentInfo})
        };
        
        fetch("http://localhost:9000/testAPI/appointmentTable", requestOptions)
            .then(res => res.text())
            .then(res => setAppointmentResponse(JSON.parse(res)));
    }
    

    //---------------------------------- FUNCTIONS USED FOR RETRIEVING, FORMATTING DELETING APPOINTMENTS -------------------------------------------------------------------

    function modifyAppointment(){
        setDisabled(true);
        
        let hcID = document.getElementById('healthcardID').value;
        let date = document.getElementById('date').value;

        let AppointmentInfo = {
            healthCardId : hcID,
            address : clinicAddress,
            date: date
        }

        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({AppointmentInfo})
        };

        fetch("http://localhost:9000/testAPI/deleteAppointment", requestOptions)
            .then(res => res.text())
            .then(res => setAppointmentResponse(JSON.parse(res)));
        
    }

    //-------------------------------------- FUNCTIONS USED FOR RETRIEVING, FORMATTING DISPLAYING APPOINTMENTS AT ADMIN LEVEL ---------------------------------------------------------

    // const[apiAppointmentADMINResponse, setAppointmentADMINResponse] = React.useState([]);
    
    // function getAppointmentsFromDB() {
    //     fetch("http://localhost:9000/testAPI/ADMINappointments")
    //         .then(res => res.text())
    //         .then(res => setAppointmentADMINResponse(JSON.parse(res)));
    // }

    //-------------------------------------------------------------------------------------------------------

    return (
    <React.Fragment>


<Box >
      <Grid container spacing={1}>
        <Grid item xs={2}>
        
        <Box sx={{ bgcolor: '#b3e5fc', height: '140vh' }} />
   
        </Grid>
        <Grid item xs={8}>
        <Container >
        <List>
        
        <ListItem>
            <Typography variant = "h4" gutterBottom>
            Vaccine Appointment Booking
            </Typography>
        </ListItem>
        <ListItem>
            <Typography variant = "h7" gutterBottom>
            The Ontario government is continuing with the rollout of its vaccine implementation plan using a phased approach, 
            with a commitment to administer the COVID-19 vaccine to everyone who wants it starting with priority populations.
            In order to successfully book your vaccination appointment, you will need to be eligible for booking, and provide 
            an healthcard id to receive your booking confirmation. Please enter your booking information below:
            </Typography>
        </ListItem>
        <Divider/>
        <ListItem>Select a city to book your vaccine:
            <Autocomplete
            renderInput={getCitiesFromDB}
            value={cityValue}
            onChange={(event, newValue) => {
            setCityValue(newValue);
            getVaccineClinicsFromDB(newValue);
            }}
            inputValue={cityInputValue}
            onInputChange={(event, newInputValue) => {
            setCityInputValue(newInputValue);
            }}
            disablePortal
            xs = {4}
            id="combo-box-demo"
            options={formatCities().split("*")}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="cities" />}
            />
        </ListItem>
        <ListItem>Select a vaccine clinic in your city {cityValue}:
            <Autocomplete
            value={clinicValue}
            onChange={(event, newValue) => {
            let adressVal = getClinicAddress(newValue);
            setClinicAddress(adressVal);
            setClinicValue(newValue);
            }}
            inputValue={clinicInputValue}
            onInputChange={(event, newInputValue) => {
            setClinicInputValue(newInputValue);
            }}
            clinicAddress={clinicAddress}
            disablePortal
            xs = {4}
            id="combo-box-demo"
            options={formatClinics().split("*")}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="clinics" />}
            />
        </ListItem>
        <ListItem>Clinic address: {clinicAddress}
        </ListItem>
        <ListItem>Please enter a valid healthcard id: 
            <TextField
                required
                id="healthcardID"
                label="Required"
            />
        </ListItem>
        <ListItem>Please enter a valid vaccine date (form: YYYY-MM-DD):
            <TextField
                required
                id="date"
                label="Required"
            />
        </ListItem>
        <ListItem>
            <Button disabled={!disabled} onClick={createAppointment}>Submit</Button>
        </ListItem>
        <ListItem>
            <Button id="modify" disabled={disabled} onClick={modifyAppointment}>Delete Appointment</Button>
        </ListItem>
        <Divider />
        <ListItem>
        <Typography variant = "h6" gutterBottom>
            Your Vaccine Appointment:
        </Typography>
        </ListItem>
        <ListItem>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiAppointmentResponse.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="right">{apiAppointmentResponse[i].personName}</TableCell>
                                <TableCell align="right">{apiAppointmentResponse[i].injectionDate}</TableCell>
                                <TableCell align="right">{apiAppointmentResponse[i].address}</TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </ListItem>
        <Divider/>
        {/* <ListItem>
        <Typography variant = "h6" gutterBottom>
            All Vaccine Appointments:
        </Typography>
        </ListItem>
        <ListItem>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiAppointmentADMINResponse.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="right">{apiAppointmentADMINResponse[i].personName}</TableCell>
                                <TableCell align="right">{apiAppointmentADMINResponse[i].injectionDate}</TableCell>
                                <TableCell align="right">{apiAppointmentADMINResponse[i].address}</TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </ListItem> */}
        </List>
      </Container>
        </Grid>
        <Grid item xs ={2}>
        <Box sx={{ bgcolor: '#b3e5fc', height: '140vh' }} />
        </Grid>
      </Grid>
    </Box>
     
    </React.Fragment>
    )
}

export default Appointments
