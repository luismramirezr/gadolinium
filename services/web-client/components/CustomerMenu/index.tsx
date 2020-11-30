import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';

import { usePrefix } from 'utils/i18n';
import { signOut } from 'store/Authentication/actions';

interface Props {
  anchorEl: HTMLElement | null;
  handleClose(): void;
}

const CustomerMenu: React.FC<Props> = ({ anchorEl, handleClose }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOut());
    push('/');
  };

  const t = usePrefix('Components.TopBar.CustomerMenu');

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => push('/meus-pedidos')}>{t('MyOrders')}</MenuItem>
      <MenuItem onClick={() => push('/minha-conta')}>{t('MyAccount')}</MenuItem>
      <MenuItem onClick={handleLogOut}>{t('LogOut')}</MenuItem>
    </Menu>
  );
};

export default CustomerMenu;
