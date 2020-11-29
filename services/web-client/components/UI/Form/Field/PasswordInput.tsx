/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import TextField, {
  Props as TextFieldProps,
} from 'components/UI/Form/Field/TextInput';
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';

export type Props = TextFieldProps & {
  canShow?: boolean;
};

const PasswordField: React.FC<Props> = ({ canShow = true, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputProps = {
    ...props.InputProps,
    endAdornment: canShow ? (
      <IconButton
        size="small"
        onClick={() => setShowPassword((p) => !p)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <VisibilityOutlined color="action" />
        ) : (
          <VisibilityOffOutlined color="action" />
        )}
      </IconButton>
    ) : null,
  };

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{ ...inputProps }}
    />
  );
};

export default PasswordField;
