import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Appbar() {
  return (
    // Box component to provide a flexible container
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar component for the top navigation bar */}
      <AppBar position="static">
        {/* Toolbar component to hold the elements inside the AppBar */}
        <Toolbar>
          {/* IconButton component for the menu icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* MenuIcon component for the menu icon */}
            <MenuIcon />
          </IconButton>
          {/* Typography component for the title text */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spring Boot React Full Stack Application
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}