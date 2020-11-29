import React from 'react';
import { useFormContext } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { parseDate } from 'utils/string';

export interface Props {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CurrencyInput: React.FC<Props> = ({
  name,
  defaultValue = '',
  label,
  disabled,
}) => {
  const { setValue, register } = useFormContext();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    parseDate(defaultValue)
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    setValue(name, selectedDate);
  }, [selectedDate]);

  React.useEffect(() => {
    register({ name });
    setValue(name, selectedDate);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disabled={disabled}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CurrencyInput;
