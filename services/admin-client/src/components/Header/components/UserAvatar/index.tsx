import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';

import UserMenu from './UserMenu';
import { useRootState } from '~/store/util/useRootState';
import { getAdmin } from '~/store/Authentication/selectors';

const UserAvatar: React.FC = () => {
  const state = useRootState();
  const admin = getAdmin(state);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  if (!admin) return null;

  const { name, surname } = admin;

  const initials = `${name[0]}${surname[0]}`;

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={openMenu}>
        <Avatar>{initials}</Avatar>
      </IconButton>
      <UserMenu anchorEl={anchorEl} closeMenu={closeMenu} />
    </>
  );
};

export default UserAvatar;
