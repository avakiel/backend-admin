import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AddGood from "./AddGood";

const Header: React.FC = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'DimGray', borderBottom: '1px solid white' }}>
        <Toolbar>
          <AddGood />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            New
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
