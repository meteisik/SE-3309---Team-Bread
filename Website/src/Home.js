import Table2 from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { render } from "@testing-library/react";
import { Typography } from "@mui/material";


import React , { Component, useState,useEffect } from 'react'
import Table from "./Components/Tables/Table"

function Home() {
   
   const [vaccineRateResponse, setVaccineRate] = useState([]);
   const [mortalityRateResponse, setMortalityRate] = useState([]);
   const [numberOfCasesResponse, setNumberOfCases] = useState([]);
   const [totalPopulationResponse, setTotalPopulation] = useState([]);
   const [topHotspotsResponse, setTopHotspots] = useState([]);

   function componentDidMount() {
      fetch("http://localhost:9000/home/vaccinePercentages")
            .then(res => res.text())
            .then(res => setVaccineRate(JSON.parse(res)));
      fetch("http://localhost:9000/home/mortalityRecoveryRates")
            .then(res => res.text())
            .then(res => setMortalityRate(JSON.parse(res)));
      fetch("http://localhost:9000/home/numberOfCases")
            .then(res => res.text())
            .then(res => setNumberOfCases(JSON.parse(res)));
      fetch("http://localhost:9000/home/totalPopulation")
            .then(res => res.text())
            .then(res => setTotalPopulation(JSON.parse(res)));
      fetch("http://localhost:9000/home/topHotspots")
            .then(res => res.text())
            .then(res => setTopHotspots(JSON.parse(res)));
   }

   useEffect(() => {
      componentDidMount();
    }, []);

   return (
       
      <div>
         <h1 style={{fontSize:30}}>HOME</h1>
         <button onClick={componentDidMount}>Refresh</button>
         <TableContainer style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     display:'flex'
                     }} 
            component={Paper}>
            <Table2 sx={{maxWidth: 450}} aria-label="customized table">
               <TableBody>
                  {numberOfCasesResponse.map((row, i) => (
                     <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left" style={{fontSize:25}}>Total # of Covid Cases</TableCell>
                        <TableCell style={{fontSize:25}} align="right" component="th" scope="row">
                              {numberOfCasesResponse[i].NumberOfCases}</TableCell>
                     </TableRow>
                     )
                  )}
               </TableBody>
            </Table2>
         </TableContainer>
         <TableContainer style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     display:'flex'
                     }} 
            component={Paper}>
            <Table2 sx={{maxWidth: 450}} aria-label="customized table">
               <TableBody>
                  {totalPopulationResponse.map((row, i) => (
                     <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left" style={{fontSize:25}}>Total Population</TableCell>
                        <TableCell style={{fontSize:25}} align="right" component="th" scope="row">
                              {totalPopulationResponse[i].Population}</TableCell>
                     </TableRow>
                     )
                  )}
               </TableBody>
            </Table2>
         </TableContainer>
         <TableContainer style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     display:'flex'
                     }} 
            component={Paper}>
            <Table2 sx={{maxWidth: 450}} aria-label="customized table">
               <TableBody>
                  {mortalityRateResponse.map((row, i) => (
                     <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left" style={{fontSize:25}}>Mortality Rate</TableCell>
                        <TableCell style={{fontSize:25}} align="right" component="th" scope="row">
                              {mortalityRateResponse[i].AverageMortalityRate}%</TableCell>
                     </TableRow>
                     )
                  )}
               </TableBody>
            </Table2>
         </TableContainer>
         <TableContainer style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     display:'flex'
                     }} 
            component={Paper}>
            <Table2 sx={{maxWidth: 450}} aria-label="customized table">
               <TableBody>
                  {mortalityRateResponse.map((row, i) => (
                     <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left" style={{fontSize:25}}>Recovery Rate</TableCell>
                        <TableCell style={{fontSize:25}} align="right" component="th" scope="row">
                              {mortalityRateResponse[i].AverageRecoveryRate}%</TableCell>
                     </TableRow>
                     )
                  )}
               </TableBody>
            </Table2>
         </TableContainer>
         <TableContainer style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     display:'flex'
                     }} 
            component={Paper}>
            <Table2 sx={{maxWidth: 450}} aria-label="customized table">
               <TableBody>
                  {vaccineRateResponse.map((row, i) => (
                     <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell style={{fontSize:25}} align="left" component="th" scope="row">
                              {vaccineRateResponse[i].vaccinedStatus}</TableCell>
                        <TableCell style={{fontSize:25}} align="right">{vaccineRateResponse[i].percentage}%</TableCell>
                     </TableRow>
                     )
                  )}
               </TableBody>
            </Table2>
         </TableContainer>
         <label style={{fontSize:25}}>Top 3 Hotspots</label>
         <TableContainer style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     display:'flex'
                     }} 
            component={Paper}>
            <Table2 sx={{maxWidth: 450}} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <TableCell align="left">City</TableCell>
                     <TableCell align="right"># of Cases</TableCell>
                     <TableCell align="right">Infection Name</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {topHotspotsResponse.map((row, i) => (
                     <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left" component="th" scope="row">
                              {topHotspotsResponse[i].outbreakDistrict}</TableCell>
                        <TableCell align="right">{topHotspotsResponse[i].numCases}</TableCell>
                        <TableCell align="right">{topHotspotsResponse[i].infectionName}</TableCell>
                     </TableRow>
                     )
                  )}
               </TableBody>
            </Table2>
         </TableContainer>
      </div>
   )
}
export default Home