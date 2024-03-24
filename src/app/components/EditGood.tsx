import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Product } from '@prisma/client';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

const EditGood: React.FC<Props> = ({ product, onSave }) => {
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(editedProduct);
    handleClose();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name as string]: value as string,
    }));
  };  

  return (
    <div>
      <IconButton size="large" aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" align="center" gutterBottom>
            Edit Product
          </Typography>

          <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="capacity"  sx={{ marginTop: '-0.5rem' }}>Capacity</InputLabel>
              <Select
                id="capacity"
                name="capacity"
                value={editedProduct.capacity}
                onChange={handleSelectChange}
              >
                <MenuItem value="32GB">32GB</MenuItem>
                <MenuItem value="64GB">64GB</MenuItem>
                <MenuItem value="128GB">128GB</MenuItem>
                <MenuItem value="256GB">256GB</MenuItem>
                <MenuItem value="512GB">512GB</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="fullPrice">Price Regular</InputLabel>
              <Input
                id="fullPrice"
                name="fullPrice"
                value={editedProduct.fullPrice}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="price">Price with Discount</InputLabel>
              <Input
                id="price"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4}}>
            <InputLabel htmlFor="color"  sx={{ marginTop: '-0.5rem' }}>Color</InputLabel>
            <Select
              id="color"
              name="color"
              value={editedProduct.color}
              onChange={handleSelectChange}
            >
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="gold">Gold</MenuItem>
              <MenuItem value="spacegray">Space Gray</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
              <MenuItem value="mightgreen">Mightgreen</MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor="screen" sx={{ marginTop: '-0.5rem' }}>Screen</InputLabel>
              <Select
                id="screen"
                name="screen"
                value={editedProduct.screen}
                onChange={handleSelectChange}
              >
                <MenuItem value="6.5' OLED">6.5' OLED</MenuItem>
                <MenuItem value="5.8' OLED">5.8' OLED</MenuItem>
                <MenuItem value="6.1' IPS">6.1' IPS</MenuItem>
                <MenuItem value="5.5' IPS">5.5' IPS</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="ram" sx={{ marginTop: '-0.5rem' }}>RAM</InputLabel>
              <Select
                id="ram"
                name="ram"
                value={editedProduct.ram}
                onChange={handleSelectChange}
              >
                <MenuItem value="3GB">3GB</MenuItem>
                <MenuItem value="4GB">4GB</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="year">Year</InputLabel>
              <Input
                id="year"
                name="year"
                value={editedProduct.year}
                onChange={handleInputChange}
              />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditGood;
