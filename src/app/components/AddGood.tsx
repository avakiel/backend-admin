"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { Category, Product } from "@prisma/client";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function AddGood() {
  const [values, setValues] = useState({
    name: "",
    capacity: "",
    priceRegular: "",
    priceWithDiscount: "",
    color: "",
    screen: "",
    ram: "",
    year: ""
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: Product = {

    }
  };

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((response) => setCategories(response.data))
      .catch(() => {
        throw Error();
      });
  }, []);

  return (
    <div>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
        <AddIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ color: "black" }} id="modal-modal-title" variant="h6" component="h2">
            Add new product
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
              marginBottom: 5
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <FormControl sx={{ width: "100%" }} variant="standard" required>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="category"
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {Object.keys(values).map((key) => (
              <FormControl variant="standard" key={key} required>
                <InputLabel htmlFor={key}>{key}</InputLabel>
                <Input id={key} name={key} value={values[key]} onChange={handleChange} />
              </FormControl>
            ))}

            {/* <FormControl error variant="standard">
              <InputLabel htmlFor="component-error">Name</InputLabel>
              <Input
                id="component-error"
                defaultValue="Composed TextField"
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">Error</FormHelperText>
            </FormControl> */}

            <Button variant="contained" type="submit" sx={{ position: "absolute", right: 10, bottom: 10 }}>
              Add good
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
