import React from 'react';
import { Avatar, Box } from '@material-ui/core';

import Modal from 'components/UI/Modal';

import useStyles from './styles';

const TopBarLogIn: React.FC = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(true);

  return (
    <Box>
      <Avatar className={classes.avatar} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Log In"
      />
    </Box>
  );
};

export default TopBarLogIn;
