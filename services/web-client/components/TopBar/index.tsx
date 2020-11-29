import React from 'react';
import { Box, Grid } from '@material-ui/core';
import UserAvatar from 'components/UserAvatar';
import Menu from 'components/Menu';
import CartMenu from 'components/CartMenu';

const TopBar: React.FC = () => {
  return (
    <Box py={2}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <UserAvatar />
        </Grid>
        <Grid item>
          <Grid item container>
            <Grid item>
              <Menu />
            </Grid>
            <Grid item>
              <CartMenu />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBar;
