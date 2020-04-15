import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Loader = ({ classes }) => {
  return (
    <Box className={classes.root}>
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
};

export default withStyles(styles)(Loader);
