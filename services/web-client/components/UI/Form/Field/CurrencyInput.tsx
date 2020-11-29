import React from 'react';
import { useFormContext } from 'react-hook-form';
import { pick } from 'dot-object';
import { TextField } from '@material-ui/core';
import { toCurrency } from 'utils/number';

export interface Props {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  currency: 'USD' | 'BRL';
  disabled: boolean;
}

const CurrencyInput: React.FC<Props> = ({
  name,
  defaultValue = '',
  label,
  placeholder,
  currency,
  disabled = false,
}) => {
  const { errors, setValue, register } = useFormContext();
  const error = pick(name, errors);

  const [currentValue, setCurrentValue] = React.useState(
    toCurrency(Number(defaultValue), currency)
  );

  const handleChange = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    const parsed = value.replace(/\D/g, '');
    const updated = ['Backspace', 'Delete'].includes(e.key)
      ? parsed.substr(0, parsed.length - 1)
      : `${parsed}${e.key.match(/[0-9]/) ? e.key : ''}`;

    const number = Number(updated) / 100;
    const withCurrency = toCurrency(number, currency);
    setCurrentValue(withCurrency);
  };

  React.useEffect(() => {
    setValue(name, (Number(currentValue.replace(/\D/g, '')) / 100).toFixed(4));
  }, [currentValue]);

  React.useEffect(() => {
    register({ name });
    setValue(name, (Number(currentValue.replace(/\D/g, '')) / 100).toFixed(4));
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
