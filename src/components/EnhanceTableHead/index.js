import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';




export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort ,headCells } = props;
  const createSortHandler = id => event => {
    onRequestSort(event, id);
  };

  return (
    <TableHead >
      <TableRow className={classes.tableHeadRow}>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='justify'
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.any.isRequired,
};
