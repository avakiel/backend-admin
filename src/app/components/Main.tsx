"use client"

import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import ProductsTable from './ProductTable';
import { Product, SelectedPhone } from '@/types/Product';

interface Props {
  products: SelectedPhone[];
}

const Main: React.FC<Props> = ({ products }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabContents = [<ProductsTable products={products} key={'itemOne'} />, "Item Two", "Item Three"];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', width: '100%', backgroundColor: 'DimGray', height: '100vh' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', '& .MuiTabs-indicator': { backgroundColor: 'white', width: 5 } }}
      >
        <Tab label="Phones" style={{ color: value === 0 ? 'white' : 'black' }} />
        <Tab label="Tablets" style={{ color: value === 1 ? 'white' : 'black' }} />
        <Tab label="Accessories" style={{ color: value === 2 ? 'white' : 'black' }} />
      </Tabs>
      {tabContents[value]}
    </Box>

  );
};

export default Main;
