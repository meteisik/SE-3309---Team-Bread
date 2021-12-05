import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Output from '../../Output.json';

import { render } from "@testing-library/react";
import { Typography } from "@mui/material";


import Table2 from '@mui/material/Table';

//Displays Name, Vaccine, Clinic info

export default class BasicTable extends Component{
    

 render()
 {
 
    const length = Object.keys(Output).length
   

    return (

      <TableContainer style={{
        alignItems: 'center',
        justifyContent: 'center',
        display:'flex'
        }} 
component={Paper}>
<Table2  sx={{maxWidth: 1000}}aria-label="customized table">
     <TableHead>
       <TableRow>
         
         <TableCell>Name</TableCell>
         <TableCell >City</TableCell>
         <TableCell >Address</TableCell>
         <TableCell >Beds Available</TableCell>
         <TableCell >Active Cases</TableCell>
         
       </TableRow>
     </TableHead>
     <TableBody> 
       {this.props.hospitalArray.map((row, i) => (
         <TableRow
           key={i}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
          <TableCell  align="left" component="th" scope="row">
                 {this.props.hospitalArray[i].hospitalName}</TableCell>
           <TableCell  align="left" component="th" scope="row">
                 {this.props.hospitalArray[i].cityName}</TableCell>
           <TableCell  align="left" component="th" scope="row">
                 {this.props.hospitalArray[i].address}</TableCell>
                 <TableCell  align="left" component="th" scope="row">
                 {this.props.hospitalArray[i].bedsAvailable}</TableCell>
           <TableCell  align="left" component="th" scope="row">
                 {this.props.hospitalArray[i].numOfCovidCases}</TableCell>

         </TableRow>
       ))}
     </TableBody>
   </Table2>
 </TableContainer>
    
  );
}
}