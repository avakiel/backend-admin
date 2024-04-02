"use client";

import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import FormProduct, { EditProduct } from "./FormProduct";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SessionWithUserRole } from "../configs/auth";

const Header: React.FC = () => {
  const session = useSession() as unknown as SessionWithUserRole;
  const isNotAdmin = session.data?.user?.role !== "administrator";

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
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "DimGray", borderBottom: "1px solid white" }}>
        <Toolbar>
          <IconButton disabled={isNotAdmin} size="large" edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
           <AddIcon />
          </IconButton>
          <FormProduct product={{} as EditProduct} openModal={openModal} handleClose={handleClose} handleAlert={handleAlert}/>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            New
          </Typography>
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
