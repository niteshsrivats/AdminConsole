import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

const DataRow = ({ headings, row, selected, onClick }) => {
  return (
    <TableRow
      hover
      onClick={() => onClick(row.id)}
      role="checkbox"
      key={row.id}
      selected={selected}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={selected} />
      </TableCell>
      {headings.map(heading => {
        const id = heading.id.toLowerCase();
        const value = heading.array ? row[id].join(', ') : row[id];
        return (
          <TableCell
            align={'center'}
            padding={heading.disablePadding ? 'none' : 'default'}
            key={value}
          >
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DataRow;
