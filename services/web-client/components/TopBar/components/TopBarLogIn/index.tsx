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
import { yupResolver } from '@hookform/resolvers';

import { useDispatch } from 'react-redux';
import { useRootState } from 'store/util/useRootState';
import { isFetching } from 'store/Authentication/selectors';
import { signIn } from 'store/Authentication/actions';

import Modal from 'components/UI/Modal';
import TextInput from 'components/UI/Form/Field/TextInput';
import PasswordInput from 'components/UI/Form/Field/PasswordInput';
import Checkbox from 'components/UI/Form/Checkbox';
import Button from 'components/UI/Form/Button';

import formSchema, { Form } from './formSchema';

import useStyles from './styles';

const TopBarLogIn: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const state = useRootState();
  const isLoading = isFetching(state);

  const formMethods = useForm<Form>({
    resolver: yupResolver(formSchema()),
  });

  const [openModal, setOpenModal] = React.useState(false);

  const onSubmit = (data: Form) => dispatch(signIn(data));

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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    name="saveSession"
                    label="Components.TopBar.TopBarSignIn.RememberMe"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  isFetching={isLoading}
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
