"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from "@prisma/client";
import FormProduct from "./FormProduct";
import { formatProduct } from "../utils/formatProduct";

interface Props {
  products: Product[];
  deleteProduct: (id: number) => void
}

const ProductsTable: React.FC<Props> = ({ products, deleteProduct }) => {
  const [page, setPage] = useState(0);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650, backgroundColor: 'gray', padding: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Price Regular</TableCell>
              <TableCell>Price with Discount</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Screen</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * 15, page * 15 + 15).map((product) => (
              <TableRow onDoubleClick={() => {}} key={product.id}>
                <TableCell>
                  <IconButton aria-label="delete" size="large" onClick={() => deleteProduct(product.id)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <FormProduct product={formatProduct(product)} />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.capacity}</TableCell>
                <TableCell>{product.fullPrice}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.screen}</TableCell>
                <TableCell>{product.ram}</TableCell>
                <TableCell>{product.year}</TableCell>
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

