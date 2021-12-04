import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Output from './Output'

import { render } from "@testing-library/react";
import Students from "./Students";




export default class BasicTable extends Component{
    


 
 render()
 {
 
    return (

        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell>healthCardID</TableCell>
            <TableCell align="right">personName</TableCell>
            <TableCell align="right">vaccineName</TableCell>
            <TableCell align="right">clinicName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>




        


          {Students.students.map((row, i) =>  (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.healthCardID}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}