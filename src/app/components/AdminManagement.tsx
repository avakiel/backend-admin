import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  permissions: string;
  gitHubAccount: string;
}

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: 'Admin 1', email: 'admin1@example.com', phone: '1234567890', permissions: 'Admin', gitHubAccount: 'admin1' },
    { id: 2, name: 'Admin 2', email: 'admin2@example.com', phone: '0987654321', permissions: 'SuperAdmin', gitHubAccount: 'admin2' }
  ]);

  const [formData, setFormData] = useState<Admin>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    permissions: '',
    gitHubAccount: ''
  });

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleOpenDialog = () => {
    setEditMode(false);
    setFormData({
      id: 0,
      name: '',
      email: '',
      phone: '',
      permissions: '',
      gitHubAccount: ''
    });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditMode(true);
    setOpen(true);
    setFormData(admin);
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.permissions || !formData.gitHubAccount) {
      alert('Please fill in all fields');
      return;
    }
    
    if (editMode) {
      setAdmins(admins.map(admin => admin.id === formData.id ? formData : admin));
    } else {
      const maxId = Math.max(...admins.map(admin => admin.id));
      const newId = maxId + 1;
      setAdmins([...admins, { ...formData, id: newId }]);
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Admin Management
      </Typography>
      {admins.map(admin => (
        <Box key={admin.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography>
            {admin.name} - {admin.permissions}
          </Typography>
          <div>
            <IconButton aria-label="edit" onClick={() => handleEditAdmin(admin)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDeleteAdmin(admin.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Box>
      ))}
      <Button variant="contained" onClick={handleOpenDialog}>Add Admin</Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Admin' : 'Add Admin'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter admin details:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Select
            margin="dense"
            id="permissions"
            label="Permissions"
            displayEmpty
            fullWidth
            value={formData.permissions}
            onChange={(e) => setFormData({ ...formData, permissions: e.target.value as string })}
          >
            <MenuItem value="" disabled>
              Select Permissions
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
          </Select>

          <TextField
            margin="dense"
            id="gitHubAccount"
            label="GitHub Account"
            fullWidth
            value={formData.gitHubAccount}
            onChange={(e) => setFormData({ ...formData, gitHubAccount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMode ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminManagement;
