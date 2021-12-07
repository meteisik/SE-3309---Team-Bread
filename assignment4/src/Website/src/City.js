import React, { useState,useEffect } from 'react'
import TableCity1 from "./Components/Tables/TableCity1"
import TableCity2 from "./Components/Tables/TableCity2"
import TableCity3 from "./Components/Tables/TableCity3"
import TableCity4 from "./Components/Tables/TableCity4";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Grow from "@mui/material/Grow";
import Table from "@mui/material/Table";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";

const Covid=()=> {//sets the react hooks


    const [apiResponse, setResponse] = useState([]);
    const [apiResponse2, setResponse2] = useState([]);
    const [apiResponse3, setResponse3] = useState([]);
    const [apiResponse4, setResponse4] = useState([]);
    const [apiResponse5, setResponse5] = useState([]);

    function componentDidMount() { //main function

        let txt=document.getElementById('txt');
        let cities = txt.value;

		//takes the text box value and adds it to a post request
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cities})
        };

		//fetches queries from server and sets them to an appropriate react hook
        fetch("http://localhost:9000/City/cities", requestOptions)
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));


        fetch("http://localhost:9000/City/vaccinatedincities", requestOptions)
            .then(res=>res.text())
            .then(res=>setResponse2(JSON.parse(res)))

        fetch("http://localhost:9000/City/totalCasesinCity", requestOptions)
            .then(res=>res.text())
            .then(res=>setResponse3(JSON.parse(res)))
        fetch("http://localhost:9000/City/cityPopGet", requestOptions)
            .then(res=>res.text())
            .then(res=>setResponse4(JSON.parse(res)))



    }

    function dataMod() {
//data mod front end
        let txt=document.getElementById('txt2');
        let txt2=document.getElementById('txt3');
        let cities = txt.value;
        let population =txt2.value;
if (population<0) //prevents negative pop
{
    alert("please enter a number greater than 0")

}
else{//Post request headers
    const requestOptions2={
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cities, population})
    }
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cities})
    }; //sends the post
        fetch("http://localhost:9000/City/populationChange", requestOptions2)
            .then(res=>res.text())
            .then(res=>setResponse4(JSON.parse(res)))
    }}
//tables and html are built below 
        return (

            <Box style={{
                alignItems: 'center',
                justifyContent: 'center',
                display:'flex'
            }}  >

                <Grid container spacing={1} style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display:'flex'
                }} >


                    <Grid item xs={1} >
                        <Box sx={{ bgcolor: '#b3e5fc', height: '100vh' }} />

                    </Grid>

                    <Grid item xs={10} style={{textAlign: "center"}}>
                        <Container >
                            <List>

                                <ListItem >

                                    <Table  style={{ width: 500  }}   />
                                    <label>Enter In a City Name</label>
                                    <input type={'text'} id={'txt'}></input><br/>
                                    <Button onClick={componentDidMount}>submit query</Button>

                                </ListItem>
                                <Divider light />

                                <ListItem>
                                    <TableCity3 apiResponses3={apiResponse3}/>

                                </ListItem>
                                <Divider light />
                                <ListItem>


                                    <TableCity2 apiResponses2={apiResponse2}/>

                                </ListItem>

                                <Divider light />

                                <ListItem>

                                        <label>OutBreak Districts in City</label> <br/>
                                </ListItem>
                                <ListItem>
                                        <TableCity1 apiResponses={apiResponse}  />


                                </ListItem>

                            </List>
                            <ListItem >
                                <label>Last 3 Characters of UNLOCODE </label>
                                <input type={'text'} id={'txt2'}></input>
                                <ListItem><label>New Population</label>
                                    <input type={'text'} id={'txt3'}></input>

                                <Button onClick={dataMod}>submit query</Button>

                                </ListItem>
                            </ListItem>

                            <ListItem >

                            <TableCity4 apiResponses4={apiResponse4}/>


                            </ListItem >
                        </Container>
                    </Grid>



                    <Grid item xs ={1}>
                        <Box sx={{ bgcolor: '#b3e5fc', height: '100vh' }} />
                    </Grid>



                </Grid>
            </Box>

        )

}
export default Covid
