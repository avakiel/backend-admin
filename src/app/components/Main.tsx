"use client";

import React, { useState } from "react";
import { Tabs, Tab, Typography, Box, Autocomplete, TextField } from "@mui/material";
import ProductsTable from "./ProductTable";
import { Product, SelectedPhone } from "@/types/Product";

interface Props {
  products: SelectedPhone[];
}

interface AutocompleteOption {
  label: string;
  id: string;
}

const Main: React.FC<Props> = ({ products }) => {
  const [value, setValue] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<AutocompleteOption | null>(null);

  const options = products.map((item) => ({
    label: item.name,
    id: item.id
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleProductChange = (event: React.ChangeEvent<{}>, newValue: AutocompleteOption | null) => {
    if (newValue) {
      setSelectedProduct(newValue);
    } else {
      setSelectedProduct(null);
    }
  };

  const preparedProducts = selectedProduct ? products.filter((item) => item.id === selectedProduct?.id) : products;

  const tabContents = [<ProductsTable products={preparedProducts} key={"itemOne"} />, "Item Two", "Item Three"];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', width: '100%', backgroundColor: 'DimGray', height: '100vh' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", "& .MuiTabs-indicator": { backgroundColor: "white", width: 5 } }}
      >
        <Tab label="Phones" style={{ color: value === 0 ? "white" : "black" }} />
        <Tab label="Tablets" style={{ color: value === 1 ? "white" : "black" }} />
        <Tab label="Accessories" style={{ color: value === 2 ? "white" : "black" }} />
      </Tabs>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        onChange={handleProductChange}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Find 1 Product" />}
      />
      {tabContents[value]}
    </Box>
  );
};

export default Main;
