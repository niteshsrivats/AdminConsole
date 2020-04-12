import { IconButton, Tooltip } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import React from 'react';

const ReloadButton = ({ handleReload }) => {
  return (
    <Tooltip title="Reload">
      <IconButton onClick={handleReload}>
        <Refresh color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default ReloadButton;
