import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(10),
  },
}));

const LoaderRow = ({ colSpan }) => {
  const classes = styles();

  return (
    <TableRow key="empty">
      <TableCell colSpan={colSpan}>
        <Box className={classes.root}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default LoaderRow;
