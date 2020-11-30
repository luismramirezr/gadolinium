import React from 'react';
import { Avatar, Box } from '@material-ui/core';

import { useRootState } from 'store/util/useRootState';

import useStyles from './styles';
import { getCustomer } from 'store/Authentication/selectors';
import CustomerMenu from 'components/CustomerMenu';

const UserAvatar = () => {
  const state = useRootState();
  const customer = getCustomer(state);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const closeCustomerMenu = () => {
    setAnchorEl(null);
  };

  if (!customer) return null;

  const { avatar, name, surname } = customer;

  const initials = `${name[0]}${surname[0]}`;

  const classes = useStyles();
  return (
    <Box>
      <Avatar
        className={classes.avatar}
        src={avatar}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {initials}
      </Avatar>
      <CustomerMenu anchorEl={anchorEl} handleClose={closeCustomerMenu} />
    </Box>
  );
};

export default UserAvatar;
