import React from 'react';
import { IconButton } from '@material-ui/core';

import { LocalMallOutlined } from '@material-ui/icons';

const CartMenu: React.FC = () => (
  <IconButton>
    <LocalMallOutlined color="primary" />
  </IconButton>
);

export default CartMenu;
