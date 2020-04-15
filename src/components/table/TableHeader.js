import React from 'react';
import { TableRow, TableCell, Checkbox, TableSortLabel } from '@material-ui/core';

const TableHeader = ({
  selectedLength,
  dataLength,
  checkBoxHandler,
  headings,
  orderBy,
  order,
  headingClickHandler,
}) => {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={selectedLength > 0 && selectedLength < dataLength}
          checked={dataLength > 0 && selectedLength === dataLength}
          onChange={checkBoxHandler}
        />
      </TableCell>
      {Object.keys(headings).map(id => {
        if (!!headings[id].show) {
          return (
            <TableCell
              key={id}
              align={'center'}
              padding={!!headings[id].padding ? 'none' : 'default'}
            >
              {!!headings[id].sort ? (
                <TableSortLabel
                  active={orderBy === id}
                  direction={order}
                  onClick={() => headingClickHandler(id)}
                >
                  {headings[id].name}
                </TableSortLabel>
              ) : (
                headings[id].name
              )}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
};

export default TableHeader;
