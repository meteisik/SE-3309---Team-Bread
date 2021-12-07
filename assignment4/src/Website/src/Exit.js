import React, { useState, useEffect } from 'react'


import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import importImg1 from './bread1.jpg';
import importImg2 from './bread2.jpg';
import importImg3 from './bread3.jpg';




  
function Exit() {

 
  return (


    <Box >
      <Grid container spacing={1}>
        <Grid item xs={1} >
          <Box sx={{ bgcolor: '#b3e5fc', height: '200vh' }} />
        </Grid>

        <Grid item xs={10}>
          <Container >
            <List>

            <img src={importImg1} alt='import'></img>
            <img src={importImg2} alt='import'></img>
            <img src={importImg3} alt='import'></img>


            
            </List>
          </Container>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{ bgcolor: '#b3e5fc', height: '200vh' }} />
        </Grid>
      </Grid>
    </Box>
  )


}


export default Exit