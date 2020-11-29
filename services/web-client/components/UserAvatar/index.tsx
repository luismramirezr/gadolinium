import React from 'react';
import { Avatar } from '@material-ui/core';

import useStyles from './styles';

const UserAvatar = () => {
  const classes = useStyles();
  return <Avatar className={classes.avatar}>LR</Avatar>;
};

export default UserAvatar;
