import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

const DataRow = ({ headings, row, selected, onClick }) => {
  return (
    <TableRow
      hover
      onClick={() => onClick(row.documentId)}
      role="checkbox"
      key={row.documentId}
      selected={selected}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={selected} />
      </TableCell>
      {Object.keys(headings).map(id => {
        if (!!headings[id].show) {
          const value = headings[id].array ? row[id].join(', ') : row[id];
          return (
            <TableCell align="center" padding="default" key={value}>
              {value}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
};

export default DataRow;
