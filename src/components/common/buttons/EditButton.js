import { Tooltip, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';

const EditButton = ({ handleEdit }) => {
  return (
    <Tooltip title="Edit">
      <IconButton onClick={handleEdit}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
