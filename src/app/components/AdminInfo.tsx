import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminManagement from './AdminManagement';
import UserList from './AdminManagement';

interface Props {
  adminName: string;
}

const AdminInfo: React.FC<Props> = ({ adminName }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 450, padding: '10px' }} role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem sx={{
          marginInline: 'auto',
          width: 90,
          height: 90,
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundImage: 'url(https://media.mate.academy/fit-in/128x128/users/226884/avatars/current-1700058082518.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        </ListItem>

        <ListItem>
          <ListItemText primary={'Oleksandr Rezanov'} />
        </ListItem>

        <ListItem>
          <ListItemText primary={`Permissions: superAdmin`} />
        </ListItem>

        <ListItem>
          <ListItemText primary={'oleksandr.rezanov.dev@gmail.com'} />
        </ListItem>

        <ListItem>
          <ListItemText primary={'+380957826595'} />
        </ListItem>

        <ListItem>
          <ListItemText primary={'https://github.com/OleksandrRezanov'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer} style={{ color: 'white', textTransform: 'none', fontSize: '16px' }}>
        {adminName}
        <AccountCircleIcon sx={{ marginInline: '5px', fontSize: '50px' }} />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer} >
        {DrawerList}
        <div style={{padding: '20px'}}>
          <AdminManagement />
        </div>
      </Drawer>
    </div>
  );
}

export default AdminInfo;
