"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "@fortawesome/fontawesome-free/css/all.css";
import { Product } from "@prisma/client";
import FormProduct from "./FormProduct";
import { formatProduct } from "../utils/formatProduct";
import EditIcon from "@mui/icons-material/Edit";
import classNames from "classnames";
import { colors } from "../color-palette/colors";
import { useSession } from "next-auth/react";
import { SessionWithUserRole } from "../configs/auth";

interface Props {
  products: Product[];
  deleteProduct: (id: number) => void;
  handleAlert: () => void;
  updateProduct: (id: string, productToUpdate: any, handleClose: any, resetForm: any, setLoading: any) => void;
}

const sortFields = [
  "Delete",
  "Edit",
  "ID",
  "Name",
  "Capacity",
  "Price Regular",
  "Price with Discount",
  "Color",
  "Screen",
  "RAM",
  "Year"
];

interface SortOrderState {
  field: string;
  order: SortOrder;
}

enum SortOrder {
  Default = "default",
  Ascending = "asc",
  Descending = "desc"
}

const ProductsTable: React.FC<Props> = ({ products, deleteProduct, updateProduct, handleAlert }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState({} as Product);

  const session = useSession() as unknown as SessionWithUserRole;
  const isNotAdmin = session.data?.user?.role !== "administrator";

  const handleOpen = (product: Product) => {
    setOpenModal(true);
    setEditingProduct(product);
  };
  const handleClose = () => setOpenModal(false);

  const [page, setPage] = useState(0);
  const [sortParams, setSortOrder] = useState<SortOrderState>({
    field: "ID",
    order: SortOrder.Default
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDoubleClickOnEdit = (product: Product) => {
    if (isNotAdmin) {
      return;
    }
  
    handleOpen(product);
  };

  // #region SORT ORDER
  const handleSortField = (field: string): any => {
    let sortByField = field;
    let ordertoggle = SortOrder.Default;
    if (sortParams.order === SortOrder.Default || sortParams.field !== field) {
      ordertoggle = SortOrder.Descending;
    } else if (sortParams.order === SortOrder.Descending && sortParams.field === sortByField) {
      ordertoggle = SortOrder.Ascending
    } else if (sortParams.field === field && sortParams.order === SortOrder.Ascending) {
      ordertoggle = SortOrder.Default
      sortByField = 'ID'
    } else if (sortParams.field !== field) {
      ordertoggle = SortOrder.Descending
    }
    setSortOrder({
      field: sortByField,
      order: ordertoggle
    });
  };


  const sortIconClass = (sortBy: string) => {
    return classNames("fas", {
      "fa-sort": sortParams.field !== sortBy || sortParams.order === SortOrder.Default,
      "fa-sort-down": sortParams.field === sortBy && sortParams.order === SortOrder.Descending,
      "fa-sort-up": sortParams.field === sortBy && sortParams.order === SortOrder.Ascending
    });
  };

  const preparedProducts = (sort: SortOrderState, products: Product[]) => {
    function cleanData(value: string): number {
      switch (sort.field) {
        case "Capacity":
        case "RAM":
          const matchResult = value.match(/(\d+(\.\d+)?)/);
          if (matchResult) {
            const numericValue = parseFloat(matchResult[0]);
            const unit = value.replace(matchResult[0], "").trim().toUpperCase();
            switch (unit) {
              case "TB":
                return numericValue * 1000;
              case "GB":
              default:
                return numericValue;
            }
          }
          return 0;
        case "Screen":
          const screenMatchResult = value.match(/^\d+(?:\.\d+)?/)?.[0];
          if (screenMatchResult) {
            return parseFloat(screenMatchResult) || 0;
          }
          return 0;
        default:
          return 0;
      }
    }

    products.sort((a, b) => {
      switch (sort.field) {
        case "ID":
          return a.id - b.id;
        case "Name":
          return a.name.localeCompare(b.name);
        case "Capacity":
          return cleanData(a.capacity) - cleanData(b.capacity);
        case "Price Regular":
          return a.fullPrice - b.fullPrice;
        case "Price with Discount":
          return a.price - b.price;
        case "Color":
          return a.color.localeCompare(b.color);
        case "Screen":
          return cleanData(a.screen) - cleanData(b.screen);
        case "RAM":
          return cleanData(a.ram) - cleanData(b.ram);
        case "Year":
          return a.year - b.year;
        default:
          return 0;
      }
    });

    if (sort.order === SortOrder.Descending) {
      products.reverse();
    }

    return products;
  };

  const renderProduct = preparedProducts(sortParams, products);
  // #endregion SORT ORDER

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
      <TableContainer
        component={Paper}
      >
        <Table sx={{ minWidth: 650, backgroundColor: colors.whiteBackground, padding: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {sortFields.map((field) => (
                <TableCell align="center" key={field} sx={{ borderColor: colors.border }}>
                  <div onClick={() => handleSortField(field)} style={{ cursor: "pointer" }}>
                    {field !== "Delete" && field !== "Edit" && field}{" "}
                    {field !== "Delete" && field !== "Edit" && (
                      <span className="icon">
                        <i className={sortIconClass(field)} />
                      </span>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderProduct
              .map((product) => (
                <TableRow key={product.id} onDoubleClick={() => handleDoubleClickOnEdit(product)}>
                  <TableCell align="center" width={"5%"} sx={{ borderColor: colors.border }}>
                    <IconButton disabled={isNotAdmin} aria-label="delete" size="large" onClick={() => deleteProduct(product.id)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" sx={{ borderColor: colors.border }}>
                    <IconButton disabled={isNotAdmin} size="large" color="inherit" aria-label="menu" onClick={() => handleOpen(product)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" width={"5%"} sx={{ borderColor: colors.border }}>
                    {product.id}
                  </TableCell>
                  <TableCell align="center" width={"15%"} sx={{ borderColor: colors.border }}>
                    {product.name}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.capacity}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.fullPrice}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.price}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.color}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.screen}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.ram}
                  </TableCell>
                  <TableCell align="center" width={"10%"} sx={{ borderColor: colors.border }}>
                    {product.year}
                  </TableCell>
                </TableRow>
              ))
              .slice(page * 15, page * 15 + 15)}
          </TableBody>
        </Table>
        {openModal && (
          <FormProduct
            product={formatProduct(editingProduct)}
            updateProduct={updateProduct}
            openModal={openModal}
            handleClose={handleClose}
            handleAlert={handleAlert}
          />
        )}
      </TableContainer>

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
          style: { display: "none" }
        }}
        sx={{ backgroundColor: colors.pagination }}
      />
    </Box>
  );
};

export default ProductsTable;
