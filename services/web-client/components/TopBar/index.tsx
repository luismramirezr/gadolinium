import React from 'react';
import { Box, Grid } from '@material-ui/core';
import UserAvatar from 'components/UserAvatar';
import Menu from 'components/Menu';
import CartMenu from 'components/CartMenu';

import { useRootState } from 'store/util/useRootState';
import { isAuth } from 'store/Authentication/selectors';
import TopBarLogIn from './components/TopBarLogIn';

const TopBar: React.FC = () => {
  const state = useRootState();
  const isAuthenticated = isAuth(state);
  return (
    <Box py={2}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>{isAuthenticated ? <UserAvatar /> : <TopBarLogIn />}</Grid>
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
