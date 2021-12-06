import React from 'react'
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




function Appointments() {

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


    //--------------------------------------------------------------------------------------------------------------

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


    //-------------------------------------------------------------------------------------------------------

    return (
    <React.Fragment>
    <button onClick={getCitiesFromDB}>load cities</button>


<Box >
      <Grid container spacing={1}>
        <Grid item xs={2}>
        
        <Box sx={{ bgcolor: '#ffb851', height: '100vh' }} />
   
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
        <ListItem>Select a city to book your vaccine:
            <Autocomplete
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
            //options={apiCityResponse.split(",")}
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
                id="outlined-required"
                label="Required"
            />
        </ListItem>
        <ListItem>Please enter a valid vaccine date (form: YYYY-MM-DD):
            <TextField
                required
                id="outlined-required"
                label="Required"
            />
        </ListItem>
        <ListItem>
            <Button>Submit</Button>
        </ListItem>
        </List>
      </Container>
        </Grid>
        <Grid item xs ={2}>
        <Box sx={{ bgcolor: '#ffb851', height: '100vh' }} />
        </Grid>
      </Grid>
    </Box>
    </React.Fragment>
    )
}

export default Appointments
