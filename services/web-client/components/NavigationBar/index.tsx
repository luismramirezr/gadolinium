import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';

import { ArrowRightAltOutlined } from '@material-ui/icons';

import useStyles from './styles';

const NavigationBar: React.FC = () => {
  const classes = useStyles();
  return (
    <Box position="relative" height={48}>
      <IconButton className={classes.backButton}>
        <ArrowRightAltOutlined color="primary" />
      </IconButton>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h5">Categories</Typography>
      </Box>
    </Box>
  );
};

export default NavigationBar;
