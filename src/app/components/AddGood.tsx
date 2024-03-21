'use client';

import React from 'react';
import {
  Box,
  Typography,
  Modal,
  IconButton,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddGood() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const requiredDataToAddGood = ['Name', 'FullPrice', 'Price', 'Screen', 'Capacity', 'Ram', 'Year', 'Image'];

  return (
    <div>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
        <AddIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new good
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            {requiredDataToAddGood.map(item => (
              <FormControl variant="standard" key={item}>
                <InputLabel htmlFor="component-simple">{item}</InputLabel>
                <Input id="component-simple" placeholder={item} />
              </FormControl>
            ))}

            <FormControl error variant="standard">
              <InputLabel htmlFor="component-error">Name</InputLabel>
              <Input
                id="component-error"
                defaultValue="Composed TextField"
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">Error</FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
