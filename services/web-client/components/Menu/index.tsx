import React from 'react';
import { Box, IconButton } from '@material-ui/core';

import { MenuOutlined } from '@material-ui/icons';
import Drawer from './components/Drawer';

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <IconButton onClick={() => setOpen((p) => !p)}>
        <MenuOutlined color="primary" />
      </IconButton>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default Menu;
