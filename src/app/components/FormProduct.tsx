"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Modal,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Category } from "@prisma/client";
import { normalizeField } from "../utils/normalizeField";
import { getItemId } from "../utils/getItemId";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../color-palette/colors";

const availableRam = {
  phones: ["2GB", "3GB", "4GB", "8GB", "16GB", "32GB"],
  accessories: ["768MB", "0.75GB", "1GB"],
  tablets: ["4GB", "8GB", "16GB", "32GB"]
};
const availableCapacity: AvailableFields = {
  phones: ["32GB", "64GB", "128GB", "256GB", "512GB"],
  accessories: ["38mm", "40mm", "42mm", "44mm"],
  tablets: ["62GB", "128GB", "256GB", "512GB", "1TB"]
};
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
const initialValues: Values = {
  name: "",
  priceRegular: "",
  priceWithDiscount: "",
  color: "",
  screen: "",
  year: "",
  image: []
};
const initialErrors = {
  name: "",
  priceRegular: "",
  priceWithDiscount: "",
  color: "",
  screen: "",
  year: "",
  image: "",
  capacity: "",
  ram: "",
  category: ""
};

interface Values {
  name: string;
  priceRegular: string;
  priceWithDiscount: string;
  color: string;
  screen: string;
  year: string;
  image: string[];
}

interface Errors {
  name: string;
  priceRegular: string;
  priceWithDiscount: string;
  color: string;
  screen: string;
  year: string;
  image: string;
  capacity: string;
  ram: string;
  category: string;
}

interface AvailableFields {
  phones: string[];
  accessories: string[];
  tablets: string[];
}

export interface EditProduct {
  id: string;
  name: string;
  itemId: string;
  priceRegular: string;
  priceWithDiscount: string;
  color: string;
  screen: string;
  year: string;
  image: string[];
  categoryId: string;
  capacity: string;
  ram: string;
}

interface Props {
  product: EditProduct;
  openModal: boolean;
  handleClose: () => void;
  handleAlert: () => void;
  updateProduct?: (id: any, productToUpdate: any, handleClose: any, resetForm: any, setLoading: any) => void
}

type PropsValues = Omit<EditProduct, "id" | "categoryId" | "capacity" | "ram" | 'itemId'>;

const FormProduct: React.FC<Props> = ({ product, openModal, handleClose, handleAlert, updateProduct = () => {} }) => {
  const existProduct = Object.keys(product).length !== 0;
  const valuesFromProduct = {
    name: product.name,
    priceRegular: product.priceRegular,
    priceWithDiscount: product.priceWithDiscount,
    color: product.color,
    screen: product.screen,
    year: product.year,
    image: product.image
  };

  const [values, setValues] = useState<PropsValues>(existProduct ? valuesFromProduct : initialValues);
  const [capacity, setCapacity] = useState(existProduct ? product.capacity : "");
  const [ram, setRam] = useState(existProduct ? product.ram : "");

  const [loading, setLoading] = useState(false);
  const [blockActions, setBlockActions] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [category, setCategory] = useState("");
  const categoryID = categories.find((cat) => cat.name === category)?.id;

  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    setBlockActions(true);
    axios
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data);

        if (existProduct) {
          const foundCategory = response.data.find((category: any) => category.id === +product.categoryId);
          if (foundCategory) {
            setCategory(foundCategory.name);
          }
        }
      })
      .catch(() => {
        throw Error();
      })
      .finally(() => {
        setBlockActions(false);
      });
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
    if (!value) {
      setErrors({
        ...errors,
        [name]: "This field is required"
      });
    } else {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {} as Errors;
    let formIsValid = true;
    const fieldsToCheck = ["priceRegular", "priceWithDiscount", "year"];

    Object.keys(values).forEach((key) => {
      if (!values[key as keyof Values]) {
        newErrors[key as keyof Errors] = "This field is required";
        formIsValid = false;
      }

      if (fieldsToCheck.includes(key) && isNaN(+values[key as keyof Values])) {
        newErrors[key as keyof Errors] = "This field is not a number";
        formIsValid = false;
      }
    });

    if (!capacity) {
      newErrors.capacity = "This field is required";
      formIsValid = false;
    }
    if (!ram) {
      newErrors.ram = "This field is required";
      formIsValid = false;
    }
    if (!category) {
      newErrors.category = "This field is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    return formIsValid;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (validateForm()) {
      if (!existProduct) {
        const newProduct = {
          itemId: getItemId(values.name),
          name: values.name,
          fullPrice: +values.priceRegular,
          price: +values.priceWithDiscount,
          screen: values.screen,
          capacity,
          color: values.color,
          ram,
          year: +values.year,
          image: values.image,
          categoryId: categoryID as number
        };
  
        axios
          .post("/api/products", newProduct)
          .then(() => {
            handleClose();
            resetForm();
            handleAlert();
          })
          .catch((error) => {
            throw new Error();
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        const productToUpdate: any = {
          name: values.name,
          itemId: product.itemId,
          fullPrice: +values.priceRegular,
          price: +values.priceWithDiscount,
          screen: values.screen,
          capacity,
          color: values.color,
          ram,
          year: +values.year,
          image: values.image,
          categoryId: categoryID as number
        };

        updateProduct(product.id, productToUpdate, handleClose, resetForm, setLoading);
      }
    } else {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if(!existProduct) {
      setCategory("");
    }
    setValues(initialValues);
    setCapacity("");
    setRam("");
  };

  return (
    <div>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ color: colors.textBlack }} id="modal-modal-title" variant="h6" component="h2">
            {existProduct ? `Edit product` : "Add new product"}
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
                name="category"
                labelId="category"
                id="category"
                value={category}
                label="category"
                disabled={existProduct}
                onChange={(event) => {
                  const { name, value } = event.target;
                  setCategory(value);

                  if (!value) {
                    setErrors({
                      ...errors,
                      [name]: "This field is required"
                    });
                  } else {
                    setErrors({
                      ...errors,
                      [name]: ""
                    });
                  }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && <FormHelperText sx={{ color: colors.error }}>{errors.category}</FormHelperText>}
            </FormControl>
            {Object.keys(values).map((key) => (
              <FormControl variant="standard" key={key} required>
                <InputLabel htmlFor={key}>{normalizeField(key)}</InputLabel>
                <Input id={key} name={key} value={values[key as keyof Values]} onChange={handleChange} />

                {errors[key as keyof Values] && (
                  <FormHelperText sx={{ color: colors.error }}>{errors[key as keyof Errors]}</FormHelperText>
                )}
              </FormControl>
            ))}

            <FormControl sx={{ width: "100%" }} variant="standard" required>
              {category && (
                <>
                  <InputLabel id="capacity">Capacity</InputLabel>
                  <Select
                    name="capacity"
                    labelId="capacity"
                    id="capacity"
                    value={capacity}
                    label="capacity"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setCapacity(value);

                      if (!value) {
                        setErrors({
                          ...errors,
                          [name]: "This field is required"
                        });
                      } else {
                        setErrors({
                          ...errors,
                          [name]: ""
                        });
                      }
                    }}
                  >
                    {category &&
                      availableCapacity[category as keyof AvailableFields].map((cap) => (
                        <MenuItem key={cap} value={cap}>
                          {cap}
                        </MenuItem>
                      ))}
                    {!category && <MenuItem disabled>Select category</MenuItem>}
                  </Select>
                </>
              )}
              {errors.capacity && <FormHelperText sx={{ color: colors.error }}>{errors.capacity}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="standard" required>
              {category && (
                <>
                  <InputLabel id="ram">RAM</InputLabel>
                  <Select
                    name="ram"
                    labelId="ram"
                    id="ram"
                    value={ram}
                    label="ram"
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setRam(value);

                      if (!value) {
                        setErrors({
                          ...errors,
                          [name]: "This field is required"
                        });
                      } else {
                        setErrors({
                          ...errors,
                          [name]: ""
                        });
                      }
                    }}
                  >
                    {category &&
                      availableRam[category as keyof AvailableFields].map((cap) => (
                        <MenuItem key={cap} value={cap}>
                          {cap}
                        </MenuItem>
                      ))}
                    {!category && <MenuItem disabled>Select category</MenuItem>}
                  </Select>
                </>
              )}
              {errors.ram && <FormHelperText sx={{ color: colors.error }}>{errors.ram}</FormHelperText>}
            </FormControl>

            <Button
              variant="contained"
              disabled={loading || blockActions}
              onClick={() => resetForm()}
              sx={{ width: "15%", backgroundColor: colors.wrong,  height: "9%", position: "absolute", right: 150, bottom: 10 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={loading || blockActions}
              sx={{ width: "15%", backgroundColor: colors.success,  height: "9%", position: "absolute", right: 10, bottom: 10 }}
            >
              {loading ? <CircularProgress sx={{ color: colors.loader }} /> : existProduct ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FormProduct;
