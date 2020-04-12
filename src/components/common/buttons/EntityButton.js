import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const EntityButton = ({ text, onClick }) => {
  const classes = styles();

  return (
    <Button variant="contained" color="secondary" className={classes.button} onClick={onClick}>
      {text}
    </Button>
  );
};

export default EntityButton;
