'use client';

import React from 'react';
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddGood() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const requiredDataToAddGood = [
    'namespaceId',
    'name',
    'capacityAvailable',
    'capacity',
    'priceRegular',
    'priceDiscount',
    'colorsAvailable',
    'color',
    'images',
    'description',
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
    'year',
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1 },
              marginBottom: 5,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            {requiredDataToAddGood.map(item => (
              <FormControl variant="standard" key={item} required>
                <InputLabel htmlFor="component-simple">{item}</InputLabel>
                <Input id="component-simple" placeholder={item} />
              </FormControl>
            ))}

            {/* <FormControl error variant="standard">
              <InputLabel htmlFor="component-error">Name</InputLabel>
              <Input
                id="component-error"
                defaultValue="Composed TextField"
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">Error</FormHelperText>
            </FormControl> */}

            <Button
              variant="contained"
              type='submit'
              sx={{position: 'absolute', right: 10, bottom: 10}}
            >
              Add good
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
