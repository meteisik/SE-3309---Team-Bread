import React, {Component, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Output from '../../Output.json';
export default function Citytable4(props){
//table
    return(
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="customized table">
                <TableHead>
                    {props.apiResponses4.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {'Population of: '+props.apiResponses4[i].cityName}
                            </TableCell>
                            <TableCell align="right">{props.apiResponses4[i].population}</TableCell>
                        </TableRow>
                    ))}
                </TableHead>
            </Table>
        </TableContainer>


    )
}