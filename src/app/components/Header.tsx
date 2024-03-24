"use client";

import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import FormProduct, { EditProduct } from "./FormProduct";

const Header: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => {
    setOpenModal(true)
  };
  const handleClose = () => setOpenModal(false);
  const session = useSession();

  // console.log(session);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "DimGray", borderBottom: "1px solid white" }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
           <AddIcon />
          </IconButton>
          <FormProduct product={{} as EditProduct} openModal={openModal} handleClose={handleClose}/>

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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
