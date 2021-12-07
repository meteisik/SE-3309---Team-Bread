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



function closeTab(){
    window.close();
}

function closeTab2(){

    document.getElementsByTagName ('html') [0] .remove ();
}

function closeTab3(){
   
    window.open('','_self').close()

}
  
function Exit() {

 
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

                <Typography>WELCOME TO THE EXIT PAGE</Typography>
                </ListItem>
           
       




            
              <Divider light />
              <ListItem >
                 <Button color="success" onClick={closeTab} textAlign="center">EXIT</Button> 
              </ListItem>
              <ListItem >
                 <Button color="success" onClick={closeTab2} textAlign="center">EXIT2</Button> 
              </ListItem>
              <ListItem >
                 <Button color="success" onClick={closeTab3} textAlign="center">EXIT3</Button> 
              </ListItem>
            
            </List>
          </Container>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{ bgcolor: '#ff9800', height: '100vh' }} />
        </Grid>
      </Grid>
    </Box>
  )


}


export default Exit