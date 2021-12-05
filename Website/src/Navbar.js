import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {GiSlicedBread} from 'react-icons/gi'
import {AiFillSetting} from 'react-icons/ai'
import { Divider } from "@mui/material";
import { purple } from '@mui/material/colors';
const pages = ['COVID PATIENTS', 'HOTSPOTS', 'VACCINATED', 'HOSPITALS'];
const settings = ['Admin', 'Public'];



const Navbar = () => {

  function closeTab(){
    window.close();
}
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };




  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
           <IconButton  size="large" color ="secondary"> <GiSlicedBread/>  </IconButton>
          </Typography> 

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">OOOOM</Typography> {/* menu items */}
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">1234</Typography> {/* menu items */}
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">567</Typography> {/* menu items */}
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">482</Typography> {/* menu items */}
              </MenuItem>
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton> TEAM BREAD  </IconButton>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
            <Button component={Link} to= "/Home"
           
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                COVID CASES
            </Button>
          
            <Button component={Link} to= "/Covid" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              HOTSPOTS
            </Button>
        
              
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            < AiFillSetting/>
              </IconButton>
            </Tooltip>
            
            
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >


              
          <MenuItem  onClick={handleCloseNavMenu}>


<Button textAlign="center">ADMIN</Button>


</MenuItem>
<MenuItem  onClick={handleCloseNavMenu}>


<Button textAlign="center">PUBLIC</Button>


</MenuItem>
<Divider/>
<MenuItem  onClick={handleCloseNavMenu}>


<Button color="success" onClick={closeTab} textAlign="center">EXIT</Button>     {/* RIGHT SIDE SIGN */}


</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;