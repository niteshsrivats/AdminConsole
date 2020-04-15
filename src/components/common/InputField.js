import { TextField } from '@material-ui/core';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  inputLarge: {
    width: '20ch',
    fontSize: theme.typography.fontSize,
  },
  inputMedium: {
    width: '15ch',
    fontSize: theme.typography.fontSize,
  },
  inputSmall: {
    width: '8ch',
    fontSize: theme.typography.fontSize,
  },
});

const InputField = ({ label, name, error, value, disabled, variant, size, onChange, classes }) => {
  value = !!value ? value : '';

  let inputProps;
  switch (size) {
    case 'large':
      inputProps = { className: classes.inputLarge };
      break;
    case 'medium':
      inputProps = { className: classes.inputMedium };
      break;
    case 'small':
      inputProps = { className: classes.inputSmall };
      break;
    default:
      inputProps = { className: classes.inputLarge };
  }

  return (
    <TextField
      label={label}
      disabled={disabled}
      name={name}
      error={error}
      color={'secondary'}
      variant={variant}
      onChange={onChange}
      value={value}
      InputProps={inputProps}
    />
  );
};

export default withStyles(styles)(InputField);
