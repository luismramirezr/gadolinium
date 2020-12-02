import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import { withPrefix } from 'components/UI/Typography';
import menu from 'config/menu';
import { useRouter } from 'next/router';
import React from 'react';

import useSyles from './styles';

interface Props {
  open: boolean;
  onClose(): void;
  onOpen(): void;
}

const Drawer: React.FC<Props> = ({ open, onClose, onOpen }) => {
  const classes = useSyles();
  const { push } = useRouter();

  const Typography = withPrefix('Navigation');

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      classes={{
        paper: classes.paper,
      }}
    >
      <Box py={2} px={2}>
        <Box className={classes.logo} />
        <Box py={2}>
          <List>
            {menu.map((item) => (
              <ListItem button key={item.i18n} onClick={() => push(item.href)}>
                <ListItemIcon className={classes.icon}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText>
                  <Typography text={item.i18n} />
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;
