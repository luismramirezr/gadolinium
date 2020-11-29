/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import InputMask from 'react-input-mask';
import { Controller, useFormContext } from 'react-hook-form';
import { pick } from 'dot-object';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyInput from './CurrencyInput';
import NumberInput from './NumberInput';
import DateInput from './DateInput';
import PasswordField, { Props as PasswordProps } from './PasswordInput';

interface GenericField {
  name: string;
}

interface HiddenField extends GenericField {
  type: 'hidden';
  defaultValue?: string;
}

interface SelectField extends GenericField {
  type: 'select';
  label: string;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
  autoComplete?: boolean;
}

interface RadioField extends GenericField {
  type: 'radio';
  label: string;
  options: Array<{ label: string; value: string }>;
  defaultValue?: string;
}

interface CheckboxField extends GenericField {
  type: 'checkbox';
  label: string;
  defaultChecked?: boolean;
}

interface NormalField extends GenericField {
  type: 'text' | 'tel' | 'email';
  label: string;
  placeholder: string;
  mask?: object;
}

export type Field =
  | NormalField
  | HiddenField
  | SelectField
  | RadioField
  | CheckboxField;

export interface Props {
  name: string;
  type:
    | 'hidden'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'text'
    | 'tel'
    | 'phone'
    | 'email'
    | 'textarea'
    | 'currency'
    | 'password'
    | 'zip'
    | 'date'
    | 'dragndrop'
    | 'list'
    | 'dropzone'
    | 'nested';
  defaultValue?: string;
  currency?: 'USD' | 'BRL';
  label?: string;
  placeholder?: string;
  options?: Array<
    | {
        name: string;
        label: string;
        value: string;
      }
    | {
        label: string;
        value: string;
      }
  >;
  mask?: object;
  defaultChecked?: boolean;
  autoComplete?: boolean;
  draggables?: Array<any>;
  draggableComponent?: React.FC;
  prefix?: string;
  canCreate?: boolean;
  defaultProps?: object;
  isLoading?: boolean;
  disabled?: boolean;
  inputProps?: object;
}

const FieldComponent: React.FC<Props> = ({
  name,
  type,
  defaultValue = '',
  label,
  placeholder,
  options,
  mask,
  defaultChecked = false,
  autoComplete = false,
  isLoading = false,
  currency = 'BRL',
  disabled = false,
}) => {
  if (isLoading) return <CircularProgress color="secondary" />;
  const { errors } = useFormContext();
  const error = pick(name, errors);
  if (type === 'hidden') {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        as={<input name={name} type="hidden" />}
      />
    );
  }
  if (type === 'currency')
    return (
      <CurrencyInput
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        label={label}
        placeholder={placeholder}
        currency={currency}
      />
    );
  if (type === 'date')
    return (
      <DateInput
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        label={label}
        placeholder={placeholder}
      />
    );
  if (type === 'password') {
    const passwordProps: PasswordProps = {
      name,
      defaultValue,
      label,
      size: 'medium',
      margin: 'normal',
    };
    return <PasswordField {...passwordProps} fullWidth />;
  }
  if (type === 'phone') {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        as={
          <TextField
            name={name}
            disabled={disabled}
            variant="outlined"
            placeholder={placeholder}
            label={label}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: InputMask as any,
              inputProps: {
                mask: '(99) 99999-9999',
              },
            }}
            fullWidth
            type="tel"
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        }
      />
    );
  }
  if (type === 'tel') {
    return (
      <NumberInput
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        label={label}
        placeholder={placeholder}
        decimals={0}
      />
    );
  }
  if (type === 'zip') {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        as={
          <TextField
            name={name}
            disabled={disabled}
            variant="outlined"
            placeholder={placeholder}
            label={label}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: InputMask as any,
              inputProps: {
                mask: '99999-999',
              },
            }}
            fullWidth
            type={type}
            margin="normal"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        }
      />
    );
  }
  if (['text', 'textarea', 'email'].includes(type)) {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        as={
          mask ? (
            <TextField
              name={name}
              disabled={disabled}
              variant="outlined"
              placeholder={placeholder}
              label={label}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputComponent: InputMask as any,
                inputProps: mask,
              }}
              fullWidth
              type={type}
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ''}
            />
          ) : (
            <TextField
              name={name}
              disabled={disabled}
              variant="outlined"
              placeholder={placeholder}
              label={label}
              InputLabelProps={{
                shrink: true,
              }}
              multiline={type === 'textarea'}
              rows={4}
              fullWidth
              type={type}
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )
        }
      />
    );
  }
  if (type === 'radio' && options) {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        render={(props) => (
          <RadioGroup name={name} value={props.value}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                onChange={() => props.onChange(option.value)}
                control={<Radio color="primary" disabled={disabled} />}
              />
            ))}
          </RadioGroup>
        )}
      />
    );
  }

  if (type === 'checkbox') {
    return (
      <Controller
        defaultValue={defaultChecked}
        name={name}
        render={(props) => (
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                disabled={disabled}
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            }
            label={label}
          />
        )}
      />
    );
  }

  if (type === 'select' && options) {
    if (autoComplete) {
      return (
        <Controller
          defaultValue={null}
          name={name}
          render={(props) => (
            <Autocomplete
              {...props}
              options={options}
              getOptionLabel={(option: any) => option.label}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  variant="outlined"
                  margin="normal"
                  disabled={disabled}
                />
              )}
              onChange={(_, data) => props.onChange(data)}
            />
          )}
        />
      );
    }
    return (
      <Controller
        defaultValue={options[0].value}
        name={name}
        as={
          <Select fullWidth variant="outlined" disabled={disabled}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        }
      />
    );
  }
  return null;
};

export default FieldComponent;
