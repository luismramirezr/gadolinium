import React from 'react';
import { Avatar } from '@material-ui/core';

import { useRootState } from 'store/util/useRootState';

import useStyles from './styles';
import { getCustomer } from 'store/Authentication/selectors';

const UserAvatar = () => {
  const state = useRootState();
  const customer = getCustomer(state);

  if (!customer) return null;

  const { avatar, name, surname } = customer;

  const initials = `${name[0]}${surname[0]}`;

  const classes = useStyles();
  return (
    <Avatar className={classes.avatar} src={avatar}>
      {initials}
    </Avatar>
  );
};

export default UserAvatar;
