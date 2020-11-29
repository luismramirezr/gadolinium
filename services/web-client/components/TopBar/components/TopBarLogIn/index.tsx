import React from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import { LockOutlined, MailOutlineOutlined } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

import Modal from 'components/UI/Modal';
import TextInput from 'components/UI/Form/Field/TextInput';
import PasswordInput from 'components/UI/Form/Field/PasswordInput';

import formSchema, { Form } from './formSchema';

import useStyles from './styles';
import { yupResolver } from '@hookform/resolvers';
import Checkbox from 'components/UI/Form/Checkbox';
import Button from 'components/UI/Form/Button';

const TopBarLogIn: React.FC = () => {
  const classes = useStyles();
  const formMethods = useForm<Form>({
    resolver: yupResolver(formSchema()),
  });
  const [openModal, setOpenModal] = React.useState(false);

  const onSubmit = (data: any) => console.log(data);

  return (
    <Box>
      <Avatar className={classes.avatar} onClick={() => setOpenModal(true)} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        prefix="UX.Actions"
        title="LogIn"
        form={{
          formMethods,
          onSubmit,
        }}
        dialogProps={{
          maxWidth: 'xs',
        }}
      >
        <Box margin="auto">
          <Container>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid
                item
                container
                direction="column"
                spacing={2}
                alignItems="stretch"
              >
                <Grid item>
                  <TextInput
                    fullWidth
                    placeholder="UX.Common.Email"
                    name="email"
                    disabled={false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineOutlined color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <PasswordInput
                    fullWidth
                    placeholder="UX.Common.Password"
                    name="password"
                    disabled={false}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item container justify="center">
                  <Checkbox
                    name="rememberMe"
                    label="Components.TopBar.TopBarSignIn.RememberMe"
                    disabled={false}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  isFetching={false}
                  text="UX.Actions.LogIn"
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
};

export default TopBarLogIn;
