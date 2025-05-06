// Header.jsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../context/ThemeContext';
//import { ColorModeContext } from '../ThemeContext';


const Header = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static" color="default" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>
        <Button color="inherit" component={Link} to="/">HOME</Button>
        <Button color="inherit" component={Link} to="/exchange">EXCHANGE RATES (LIVE)</Button>
        <Button color="inherit" component={Link} to="/about">ABOUT</Button>
        <Button color="inherit" component={Link} to="/error">ERROR PAGE</Button>
        <Switch onChange={colorMode.toggleColorMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
