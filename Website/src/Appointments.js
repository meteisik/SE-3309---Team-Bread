import React from 'react'
import { Grid, Typography } from '@mui/material'
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
    let [apiCityResponse, setCityResponse] = React.useState('');
    fetch("http://localhost:9000/testAPI/cities")
        .then(res => res.text())
        .then(res => setCityResponse(res));
    

    //format citis for autocomplete input
    function formatCities(){
        const cityList = JSON.parse(apiCityResponse);
        console.log(apiCityResponse);
        let cityNames = "";
        for (let c in cityList){
            cityNames += cityList[c].cityName + "*";
        }
        return cityNames;
    }
    
    //set values to interact with database and retrieve clinic names
    const [cityValue, setCityValue] = React.useState('');
    const [cityInputValue, setCityInputValue] = React.useState('');


    // const[apiClinicResponse, setClinicResponse] = React.useState('');
    // function getVaccineClinicsFromDB() {
    //     fetch("http://localhost:9000/testAPI/vaccineClinics")
    //         .then(res => res.text())
    //         .then(res => setClinicResponse(res));
    // }
    // getVaccineClinicsFromDB();

    // //format citis for autocomplete input
    // function formatClinics(){
    //     let clinicList = JSON.parse(apiClinicResponse);
    //     let clinicNames = "";
    //     for (let c in clinicList){
    //         clinicNames += clinicList[c] + "*";
    //     }
    //     console.log(clinicNames);
        
    // }
    // formatClinics();
    
    const [clinicValue, setClinicValue] = React.useState('');
    const [clinicInputValue, setClinicInputValue] = React.useState('');


    
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
    
    

    <React.Fragment>


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

        <ListItem>
            <div>{`city value: ${cityValue !== null ? `'${cityValue}'` : 'null'}`}</div>
            <div>{`city inputValue: '${cityInputValue}'`}</div>
        </ListItem>

        
        <ListItem>
            Select a city to book your vaccine:
            <Autocomplete
            value={cityValue}
            onChange={(event, newValue) => {
            setCityValue(newValue);
            }}
            inputValue={cityInputValue}
            onInputChange={(event, newInputValue) => {
            setCityInputValue(newInputValue);
            }}
            disablePortal
            xs = {4}
            id="combo-box-demo"
            options={apiCityResponse.split(",")}
            //options={formatCities().split("*")}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="cities" />}
            />
        </ListItem>

        <ListItem>
            <div>{`clinic value: ${clinicValue !== null ? `'${clinicValue}'` : 'null'}`}</div>
            <div>{`clinic inputValue: '${clinicInputValue}'`}</div>
        </ListItem>

        {/* <ListItem>
            Select a hospital in your city {cityValue}:
            <Autocomplete
            value={clinicValue}
            onChange={(event, newValue) => {
            setClinicValue(newValue);
            }}
            inputValue={clinicInputValue}
            onInputChange={(event, newInputValue) => {
            setClinicInputValue(newInputValue);
            }}
            disablePortal
            xs = {4}
            id="combo-box-demo"
            options={formatCities().split("*")}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="clinics" />}
            />
        </ListItem> */}

        <ListItem>
            Please enter a valid healthcard id: 
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
/** */

export default Appointments
