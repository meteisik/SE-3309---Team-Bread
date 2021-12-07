import React, {Component, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Output from '../../Output.json';
import Grid from "@mui/material/Grid";

export default function Citytable1(props){



//table
        return(

            <TableContainer component={Paper} style={{
                alignItems: 'center',
                justifyContent: 'center',
                display:'flex'
            }} >
                <Table sx={{minWidth: 650}} aria-label="customized table"  >
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
                        {props.apiResponses.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {props.apiResponses[i].outbreakDistrict}
                                    </TableCell>
                                    <TableCell align="right">{props.apiResponses[i].numPeople}</TableCell>
                                    <TableCell align="right">{props.apiResponses[i].numCases}</TableCell>
                                    <TableCell align="right">{props.apiResponses[i].numResolved}</TableCell>
                                    <TableCell align="right">{props.apiResponses[i].numRecovered}</TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>





        )


}