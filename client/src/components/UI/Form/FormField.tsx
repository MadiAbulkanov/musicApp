import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { ChangeEventHandler } from 'react';

type Options = {
  id: string | number;
  title?: string;
  name?: string;
};

interface Props {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  select?: boolean;
  options?: Options[];
}

function FormField({
  label,
  error,
  name,
  onChange,
  value,
  required,
  select,
  options,
  fullWidth = true,
  ...restProps
}: Props & Omit<TextFieldProps, keyof Props>) {
  return (
    <TextField
      {...restProps}
      fullWidth={fullWidth}
      required={required}
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      select={select}
      >
        {select && options 
          ? options.map((option) => (
            <MenuItem  key={option.id} value={option.id}>
              {!option.title ? option.name : option.title}
            </MenuItem>
          ))
          : null}
    </TextField>
  );
}

export default FormField;