import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  DialogProps,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { UseFormMethods, FormProvider } from 'react-hook-form';

import useStyles from './styles';

export interface Props<T = any> {
  dialogProps?: Partial<DialogProps>;
  title: string;
  open: boolean;
  onClose(): void;
  actions?: Array<React.ReactNode>;
  form?: { formMethods: UseFormMethods<T>; onSubmit(data: any): void };
}

const Modal: React.FC<Props> = ({
  dialogProps,
  title,
  open,
  onClose,
  actions,
  children,
  form,
}) => {
  const classes = useStyles();
  // const withPrefix = usePrefix(prefix);

  const renderContent = () => (
    <>
      <DialogTitle disableTypography className={classes.title}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" color="primary">
            {title}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
      {!!actions?.length && (
        <DialogActions className={classes.actions}>
          <Grid container spacing={1} justify="flex-end">
            {actions.map((action, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={`action_${i}`} item>
                {action}
              </Grid>
            ))}
          </Grid>
        </DialogActions>
      )}
    </>
  );

  return (
    <Dialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dialogProps}
      open={open}
      scroll={dialogProps?.scroll || 'paper'}
      maxWidth={dialogProps?.maxWidth || 'md'}
      disableBackdropClick={dialogProps?.disableBackdropClick || true}
      fullWidth={dialogProps?.fullWidth || true}
      onClose={onClose}
      PaperProps={{
        className: classes.dialog,
      }}
    >
      {form ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...form.formMethods}>
          <form onSubmit={form.formMethods.handleSubmit(form.onSubmit)}>
            {renderContent()}
          </form>
        </FormProvider>
      ) : (
        renderContent()
      )}
    </Dialog>
  );
};

export default Modal;
