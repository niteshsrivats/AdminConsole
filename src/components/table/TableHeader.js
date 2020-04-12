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
      {headings.map(heading => (
        <TableCell
          key={heading.id.toLowerCase()}
          align={'center'}
          padding={heading.padding ? 'none' : 'default'}
        >
          {heading.sort ? (
            <TableSortLabel
              active={orderBy === heading.id.toLowerCase()}
              direction={order}
              onClick={() => headingClickHandler(heading.id.toLowerCase())}
            >
              {heading.id}
            </TableSortLabel>
          ) : (
            heading.id
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableHeader;
