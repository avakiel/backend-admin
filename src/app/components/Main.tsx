"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import ProductsTable from "./ProductTable";
import { Product } from "@prisma/client";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  products: Product[];
}

const Main: React.FC<Props> = ({ products }) => {
  const [currentCategory, setCurrentCategory] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/categories/${value + 1}`)
      .then((response) => setCurrentCategory(response.data))
      .catch(() => {
        throw Error();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", width: "100%", backgroundColor: "DimGray", height: "100vh" }}>
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

      {loading ? (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductsTable products={currentCategory} key={"itemOne"} />
      )}
    </Box>
  );
};

export default Main;
