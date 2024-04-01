"use client";

import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import FormProduct, { EditProduct } from "./FormProduct";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AdminInfo from './AdminInfo';

const Header: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleOpen = () => {
    setOpenModal(true)
  };
  const handleClose = () => setOpenModal(false);

  const handleAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  
  const session = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "DimGray", borderBottom: "1px solid white" }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
           <AddIcon />
          </IconButton>
          <FormProduct product={{} as EditProduct} openModal={openModal} handleClose={handleClose} handleAlert={handleAlert}/>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            New
          </Typography>

          <AdminInfo adminName="Oleksandr" />

          <Link
            href="/api/auth/signin"
            onClick={() =>
              signOut({
                callbackUrl: "/"
              })
            }
          >
            Sign Out
          </Link>

          <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => handleCloseAlert()}>
            <Alert onClose={() => handleCloseAlert()} severity="success">
              Success created!
            </Alert>
          </Snackbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
