import React, { useState,useEffect } from 'react'
import TableCity1 from "./Components/Tables/TableCity1"
import TableCity2 from "./Components/Tables/TableCity2"
import TableCity3 from "./Components/Tables/TableCity3"
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

const Covid=()=> {//sets the react hooks


    const [apiResponse, setResponse] = useState([]);
    const [apiResponse2, setResponse2] = useState([]);
    const [apiResponse3, setResponse3] = useState([]);

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

    }
//tables and html are built below 
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
                                    <Box sx={{ height: 180 }}>
                                        <label>OutBreak Districts in City</label>
                                        <TableCity1 apiResponses={apiResponse} style={{ width: 700 }} />

                                    </Box>
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
export default Covid
