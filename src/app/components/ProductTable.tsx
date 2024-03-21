"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectedPhone } from "@/types/Product";

interface Props {
  products: SelectedPhone[];
}

const ProductsTable: React.FC<Props> = ({ products }) => {
  // const onSelectAllClick = () => {};
  const numSelected = 0;
  const rowCount = 0;

  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table sx={{ minWidth: 650, backgroundColor: 'gray', padding: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
               {/* <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
            />
          </TableCell> */}
              <TableCell>Delete</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Price Regular</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Screen</TableCell>
              <TableCell>Resolution</TableCell>
              <TableCell>Processor</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>Camera</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * 15, page * 15 + 15).map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <IconButton aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.capacity}</TableCell>
                <TableCell>{product.priceRegular}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.screen}</TableCell>
                <TableCell>{product.resolution}</TableCell>
                <TableCell>{product.processor}</TableCell>
                <TableCell>{product.ram}</TableCell>
                <TableCell>{product.camera}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPage={15}
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage=""
        SelectProps={{ 
          native: true,
          IconComponent: () => null, 
          style: { display: 'none' }
        }}
        sx={{ backgroundColor: 'gray' }}
      />
    </TableContainer>
  );
};

export default ProductsTable;

