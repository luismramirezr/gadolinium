/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import MUICheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import MUIFormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from 'components/UI/Typography';

type Props = CheckboxProps & {
  label: string;
};

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const { register } = useFormContext();

  return (
    <MUIFormControlLabel
      label={<Typography variant="body2" text={label} />}
      control={<MUICheckbox {...props} inputRef={register} />}
    />
  );
};

Checkbox.defaultProps = {
  color: 'primary',
  size: 'small',
};

export default Checkbox;
