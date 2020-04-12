import React from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const styles = makeStyles(theme => ({
  textPadding: {
    padding: theme.spacing(8),
  },
}));

const EmptyRow = ({ colSpan }) => {
  const classes = styles();

  return (
    <TableRow key="empty">
      <TableCell colSpan={colSpan}>
        <Typography className={classes.textPadding} color="textSecondary" align="center">
          No records to display
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default EmptyRow;
