import React from 'react'
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
function Covid() 
{
    return (
      
      <List>
<ListItem>
 <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image= {logo}
        alt="LIZARD "
      />
      <CardContent>
        <Typography position = "middle"gutterBottom variant="h5" component="div">
          Kermit the god
        </Typography>
        <Typography variant="body2" color="text.secondary">
          THIS IS A BOX THAT IS USED TO DISPLAY THE VALOR OF KERMIT
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>


    </ListItem>

    <ListItem>
 <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={logo2}
        alt="2ND BOX"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>


    </ListItem>
      </List>
    )
}

export default Covid
