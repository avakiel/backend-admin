import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from "@mui/material";
import { Product, SelectedPhone } from "@/types/Product";

interface Props {
  products: SelectedPhone[];
}

const ProductsTable: React.FC<Props> = ({ products }) => {
// const onSelectAllClick = () => {};
const numSelected = 0;
const rowCount = 0;

  return (
    <TableContainer component={Paper}>
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Full Price</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Screen</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>RAM</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.priceRegular}</TableCell>
              <TableCell>{product.priceDiscount}</TableCell>
              <TableCell>{product.screen}</TableCell>
              <TableCell>{product.capacity}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.ram}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
