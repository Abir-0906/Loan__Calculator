import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>
        <Button color="inherit" component={Link} to="/">HOME</Button>
        <Button color="inherit" component={Link} to="/exchange">EXCHANGE RATES (LIVE)</Button>
        <Button color="inherit" component={Link} to="/about">ABOUT</Button>
        <Button color="inherit" component={Link} to="/error">ERROR PAGE</Button>
        <Switch color="default" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

