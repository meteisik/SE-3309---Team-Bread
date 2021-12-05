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

//Displays Name, Vaccine, Clinic info

export default class BasicTable extends Component{
    

 render()
 {
 
    const length = Object.keys(Output).length
 

    return (

        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table" size="small" padding = "normal">

        <TableHead>
        
          <TableRow>
            
            <TableCell size="small">Health Card</TableCell>
            <TableCell size="small"align="right">Name</TableCell>
            <TableCell size="small" align="right">Vaccine</TableCell>
            <TableCell align="right">Clinic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {Output.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Output[i].healthCardID}
              </TableCell>
              <TableCell align="right">{Output[i].personName}</TableCell>
              <TableCell align="right">{Output[i].vaccineName}</TableCell>
              <TableCell align="right">{Output[i].clinicName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}