import { Box } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const AuthLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>{children}</Box>
    </Box>
  );
};

export default AuthLayout;
