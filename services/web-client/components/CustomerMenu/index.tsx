import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

import { usePrefix } from 'utils/i18n';

interface Props {
  anchorEl: HTMLElement | null;
  handleClose(): void;
}

const CustomerMenu: React.FC<Props> = ({ anchorEl, handleClose }) => {
  const t = usePrefix('Components.TopBar.CustomerMenu');

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>{t('MyOrders')}</MenuItem>
      <MenuItem onClick={handleClose}>{t('MyAccount')}</MenuItem>
      <MenuItem onClick={handleClose}>{t('LogOut')}</MenuItem>
    </Menu>
  );
};

export default CustomerMenu;
