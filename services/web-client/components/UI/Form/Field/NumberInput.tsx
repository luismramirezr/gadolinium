import React from 'react';
import { useFormContext } from 'react-hook-form';
import { pick } from 'dot-object';
import { TextField } from '@material-ui/core';

export interface Props {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  decimals?: number;
  disabled?: boolean;
}

const CurrencyInput: React.FC<Props> = ({
  name,
  defaultValue = '',
  label,
  placeholder,
  decimals = 0,
  disabled = false,
}) => {
  const { errors, setValue, register } = useFormContext();
  const error = pick(name, errors);

  const [currentValue, setCurrentValue] = React.useState(
    String(decimals ? Number(defaultValue) / (decimals * 10) : defaultValue)
  );

  const handleChange = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    const parsed = value.replace(/\D/g, '');
    const updated = ['Backspace', 'Delete'].includes(e.key)
      ? parsed.substr(0, parsed.length - 1)
      : `${parsed}${e.key.match(/[0-9]/) ? e.key : ''}`;

    setCurrentValue(
      String(decimals ? Number(updated) / (decimals * 10) : updated)
    );
  };

  React.useEffect(() => {
    setValue(
      name,
      decimals
        ? ((Number(currentValue.replace(/\D/g, '')) / decimals) * 10).toFixed(
            decimals
          )
        : currentValue
    );
  }, [currentValue]);

  React.useEffect(() => {
    register({ name });
    setValue(
      name,
      decimals
        ? ((Number(currentValue.replace(/\D/g, '')) / decimals) * 10).toFixed(
            decimals
          )
        : currentValue
    );
  }, []);

  return (
    <TextField
      name={name}
      disabled={disabled}
      variant="outlined"
      placeholder={placeholder}
      label={label}
      value={currentValue}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          onKeyDown: handleChange,
        },
      }}
      fullWidth
      type="tel"
      margin="normal"
      error={!!error}
      helperText={error ? error.message : ''}
    />
  );
};

export default CurrencyInput;
