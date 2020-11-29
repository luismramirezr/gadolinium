/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import MUITextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';

import { t } from 'utils/i18n';

interface HelperTextProps {
  helperText?: string;
  error?: string;
  maxCharacters?: number;
  characters?: number;
}

const HelperText: React.FC<HelperTextProps> = ({
  helperText,
  error,
  maxCharacters,
  characters,
}) => {
  if (!error && !maxCharacters && !helperText) return null;
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography
        color={error ? 'error' : 'inherit'}
        align="left"
        variant="caption"
      >
        {error || helperText}
      </Typography>
      {maxCharacters && (
        <Typography
          align="right"
          variant="caption"
          color={
            (characters || 0) >= (maxCharacters || 0) ? 'error' : 'inherit'
          }
        >
          {characters || 0}/{maxCharacters}
        </Typography>
      )}
    </Box>
  );
};

export type Props = Partial<TextFieldProps> & {
  maxLength?: number;
  name: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
};

const TextInput: React.FC<Props> = ({
  variant = 'outlined',
  size = 'small',
  label,
  placeholder,
  ...props
}) => {
  const { register, errors, watch } = useFormContext();
  const hasError = !!errors[props.name];
  const message = hasError ? errors[props.name].message : null;
  const { helperText } = props;

  const value = props.maxLength ? watch(props.name) : undefined;

  return (
    <MUITextField
      {...props}
      variant={variant}
      size={size}
      inputRef={register}
      error={hasError}
      placeholder={placeholder ? t(placeholder) : ''}
      label={label ? t(label) : ''}
      FormHelperTextProps={{
        // @ts-ignore
        component: 'div',
      }}
      inputProps={{
        ...props.inputProps,
        maxLength: props.maxLength,
      }}
      helperText={
        <HelperText
          error={message}
          helperText={helperText}
          maxCharacters={props.maxLength}
          characters={value?.length}
        />
      }
    />
  );
};

export default TextInput;
