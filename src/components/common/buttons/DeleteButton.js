import { Tooltip, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

const DeleteButton = ({ handleDelete }) => {
  return (
    <Tooltip title="Delete">
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
