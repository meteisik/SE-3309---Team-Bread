import React, {Component, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Output from '../../Output.json';

export default function Citytable2(props) {


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="customized table">
                <TableHead>
                    {props.apiResponses2.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {'Number of people vaccinated at: '+props.apiResponses2[i].cityName}
                            </TableCell>
                            <TableCell align="right">{props.apiResponses2[i].healthyPop}</TableCell>
                        </TableRow>
                    ))}
                </TableHead>
            </Table>
        </TableContainer>

    )

}