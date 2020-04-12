import { Tooltip, IconButton } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import React from 'react';

const FilterButton = ({ handleFilter }) => {
  return (
    <Tooltip title="Filter">
      <IconButton onClick={handleFilter}>
        <FilterList />
      </IconButton>
    </Tooltip>
  );
};

export default FilterButton;
