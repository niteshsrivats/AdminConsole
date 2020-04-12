import React from 'react';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const styles = makeStyles(theme => ({
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
}));

const SearchBar = ({ searchText, value, onChange, onKeyDown }) => {
  const classes = styles();

  return (
    <TextField
      fullWidth
      placeholder={'Search by ' + searchText}
      color={'secondary'}
      InputProps={{
        className: classes.searchInput,
      }}
      name="search"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default SearchBar;
