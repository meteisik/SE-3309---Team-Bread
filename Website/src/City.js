import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import List  from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import logo from './kermit.jpg';
import logo2 from './Trig.jpg';
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Output from './Output.json';
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

            <div>
                <input type={'text'} id={'txt'}></input><br/>
                <button onClick={componentDidMount}>submit query</button>
                <br/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="customized table">
                        <TableHead>
                            {apiResponse2.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {'Number of people vaccinated at: '+apiResponse2[i].cityName}
                                    </TableCell>
                                    <TableCell align="right">{apiResponse2[i].healthyPop}</TableCell>
                                </TableRow>
                                ))}
                                </TableHead>
                                </Table>
                                </TableContainer>

                <br/>
                <br/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="customized table">
                        <TableHead>
                            {apiResponse3.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {'Total Number of Covid Cases At: '+document.getElementById('txt').value}
                                    </TableCell>
                                    <TableCell align="right">{apiResponse3[i].sumCases}</TableCell>
                                </TableRow>
                            ))}
                        </TableHead>
                    </Table>
                </TableContainer>

                <br/>




<br/>
<label>OutBreak Districts in City</label>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <TableCell>outbreakDistrict</TableCell>
                            <TableCell align="right">numPeople</TableCell>
                            <TableCell align="right">numCases</TableCell>
                            <TableCell align="right">numResolved</TableCell>
                            <TableCell align="right">numRecovered</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiResponse.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {apiResponse[i].outbreakDistrict}
                                </TableCell>
                                <TableCell align="right">{apiResponse[i].numPeople}</TableCell>
                                <TableCell align="right">{apiResponse[i].numCases}</TableCell>
                                <TableCell align="right">{apiResponse[i].numResolved}</TableCell>
                                <TableCell align="right">{apiResponse[i].numRecovered}</TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        )

}
export default Covid
