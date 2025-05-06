import React, { useContext, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Switch,
  IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const colorMode = useContext(ColorModeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: 'EXCHANGE RATES (LIVE)', to: '/exchange' },
    { label: 'ABOUT', to: '/about' },
    { label: 'ERROR PAGE', to: '/error' },
  ];

  return (
    <>
      <AppBar
        position="static"
        color="default"
        sx={{
          // Use the background color of the Calculate button in light mode only
          bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.main : 'background.paper',
          color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary, // Use contrasting text color
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1,  color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary }}>
            Loan Calculator
          </Typography>

          {isMobile ? (
            <>
              <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary }}/>
              </IconButton>
            </>
          ) : (
            <>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  sx={{ color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary }}
                >
                  {item.label}
                </Button>
              ))}
              <Switch
                onChange={colorMode.toggleColorMode}
                sx={{  color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary }}
              />
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.to} component={Link} to={item.to}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem>
              <Switch onChange={colorMode.toggleColorMode} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
