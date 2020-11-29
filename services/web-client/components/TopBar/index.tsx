import React from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import UserAvatar from 'components/UserAvatar';
import Menu from 'components/Menu';
import CartMenu from 'components/CartMenu';

import { useRootState } from 'store/util/useRootState';
import { isAuth } from 'store/Authentication/selectors';
import * as AuthenticationSelectors from 'store/Authentication/selectors';

import TopBarLogIn from './components/TopBarLogIn';

const TopBar: React.FC = () => {
  const state = useRootState();
  const isAuthenticated = isAuth(state);
  const isSessionChecked = AuthenticationSelectors.isSessionChecked(state);

  const avatar = React.useMemo(() => {
    if (!isSessionChecked)
      return <CircularProgress size={24} color="primary" />;
    return isAuthenticated ? <UserAvatar /> : <TopBarLogIn />;
  }, [isAuthenticated, isSessionChecked]);

  return (
    <Box py={2}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>{avatar}</Grid>
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
