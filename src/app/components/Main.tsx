"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import ProductsTable from "./ProductTable";
import { Product } from "@prisma/client";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../color-palette/colors";

const Main: React.FC = () => {
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

  const deleteProduct = (id: number) => {
    setLoading(true);

    axios
      .delete(`/api/products/${id}`)
      .then((response) => {
        setCurrentCategory((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch(() => {
        throw Error();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", width: "100%", backgroundColor: colors.border, height: "90vh" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", "& .MuiTabs-indicator": { backgroundColor: colors.textWhite, width: 5 } }}
      >
        <Tab label="Phones" style={{ color: value === 0 ? colors.textWhite : colors.textBlack }} />
        <Tab label="Accessories" style={{ color: value === 1 ? colors.textWhite : colors.textBlack }} />
        <Tab label="Tablets" style={{ color: value === 2 ? colors.textWhite : colors.textBlack }} />
      </Tabs>

      {loading ? (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress sx={{color: colors.textWhite}} />
        </Box>
      ) : (
        <ProductsTable products={currentCategory} deleteProduct={deleteProduct} />
      )}
    </Box>
  );
};

export default Main;
