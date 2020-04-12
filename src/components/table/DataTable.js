import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { formatEntry, validEntry } from '../../utils/formUtils';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import DataForm from './DataForm';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  DeleteButton,
  EditButton,
  EntityButton,
  FilterButton,
  ReloadButton,
} from '../common/buttons';
import EmptyRow from './EmptyRow';
import DataRow from './DataRow';
import SearchBar from './SearchBar';
import TableHeader from './TableHeader';

const styles = {
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchBox: {
    marginRight: 'auto',
  },
  block: {
    display: 'block',
  },
  table: {
    minWidth: 620,
    overflow: 'hidden',
  },
};

class DataTable extends Component {
  state = {
    headings: this.props.headings,
    data: [],
    query: '',
    showForm: false,
    editData: null,
    selected: [],
    page: 0,
    rowsPerPage: 5,
    count: -1,
    orderBy: 'name',
    order: 'asc',
    fetchEnabled: true,
    previousSearch: {},
  };

  handleEntry = event => {
    const name = this.state.orderBy;
    const value = event.target.value;

    if (validEntry(name, value)) {
      this.setState({ query: formatEntry(name, value) });
    }
  };

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.updateRows();
    }
  };

  handleAddClick = () => {
    this.setState({ editData: null, showForm: true });
  };

  handleCloseClick = () => {
    this.setState({ showForm: false });
  };

  handleReload = () => {
    this.componentDidMount();
  };

  handleFilter = () => {};

  handleEdit = () => {
    if (!this.state.showForm) {
      const selectedId = this.state.selected[0];
      for (let i = 0; i < this.state.data.length; i++) {
        if (selectedId === this.state.data[i].id) {
          this.setState({ editData: this.state.data[i], showForm: true });
          break;
        }
      }
    }
  };

  handleDelete = () => {
    // const selected = this.state.data.filter(row => this.state.selected.includes(row.id));
    // const remaining = this.state.data.filter(row => !this.state.selected.includes(row.id));
    // console.log(selected);
    console.log('Delete');
  };

  updateRows = async () => {
    const results = await this.fetchData();
    if (results !== null) {
      this.setState({ data: results });
    }
  };

  fetchData = () => {
    const { query, rowsPerPage, order, orderBy, fetchEnabled, previousSearch } = this.state;
    const searchParams = { query: query, order: order, orderBy: orderBy };
    if (fetchEnabled && JSON.stringify(previousSearch) !== JSON.stringify(searchParams)) {
      this.setState({ fetchEnabled: false, previousSearch: searchParams });
      return this.props
        .fetchDocuments(query, rowsPerPage, order, orderBy)
        .then(response => {
          return response.docs.map(doc => doc.data());
        })
        .catch(error => {
          console.log(error);
          return [];
        })
        .finally(() => {
          this.setState({ fetchEnabled: true });
        });
    }
    return null;
  };

  handleSelectAll = event => {
    if (event.target.checked) {
      const selected = this.state.data.map(row => row.id);
      this.setState({ selected: selected });
    } else {
      this.setState({ selected: [] });
    }
  };

  handleSelect = id => {
    const selected = this.state.selected.filter(row => row !== id);
    if (selected.length === this.state.selected.length) {
      selected.push(id);
    }
    this.setState({ selected });
  };

  handleSort = id => {
    if (this.state.orderBy === id) {
      const order = this.state.order === 'asc' ? 'desc' : 'asc';
      this.setState({ order: order });
    } else {
      this.setState({ order: 'asc', orderBy: id, query: '' });
    }
  };

  handleChangePage = newPage => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  RenderButtons = () => {
    return (
      <>
        {this.state.showForm ? (
          <EntityButton text="Close" onClick={this.handleCloseClick} />
        ) : (
          <EntityButton text={this.props.buttonText} onClick={this.handleAddClick} />
        )}
        <ReloadButton handleReload={this.handleReload} />
        <FilterButton handleFilter={this.handleFilter} />
        {this.state.selected.length === 1 ? <EditButton handleEdit={this.handleEdit} /> : <></>}
        {this.state.selected.length > 0 ? <DeleteButton handleDelete={this.handleDelete} /> : <></>}
      </>
    );
  };

  render() {
    return (
      <>
        <AppBar
          className={this.props.classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item onClick={this.updateRows}>
                <SearchIcon className={this.props.classes.block} color="inherit" />
              </Grid>
              <Grid item className={this.props.classes.searchBox}>
                <SearchBar
                  searchText={this.state.orderBy}
                  value={this.state.query}
                  onChange={this.handleEntry}
                  onKeyDown={this.handleEnter}
                />
              </Grid>
              <Grid item>{this.RenderButtons()}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <>
          <TableContainer>
            <Table className={this.props.classes.table} size={'medium'}>
              <TableHead>
                <TableHeader
                  selectedLength={this.state.selected.length}
                  dataLength={this.state.data.length}
                  checkBoxHandler={this.handleSelectAll}
                  headings={this.props.headings}
                  orderBy={this.state.orderBy}
                  order={this.state.order}
                  headingClickHandler={this.handleSort}
                />
              </TableHead>

              <TableBody>
                {this.state.showForm ? (
                  <TableRow hover>
                    <DataForm
                      headings={this.props.headings}
                      editData={this.state.editData}
                      addDocument={this.props.addDocument}
                      updateDocument={this.props.updateDocument}
                    />
                  </TableRow>
                ) : (
                  <></>
                )}

                {this.state.data.length === 0 ? (
                  <EmptyRow colSpan={this.props.headings.length + 1} />
                ) : (
                  <>
                    {this.state.data
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        (this.state.page + 1) * this.state.rowsPerPage
                      )
                      .map((row, index) => {
                        const selected = this.state.selected.includes(row.id);
                        return (
                          <DataRow
                            headings={this.props.headings}
                            row={row}
                            selected={selected}
                            onClick={this.handleSelect}
                            key={index}
                          />
                        );
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {this.state.data.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.state.count}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          ) : (
            <></>
          )}
        </>
      </>
    );
  }
}

export default withStyles(styles)(DataTable);
