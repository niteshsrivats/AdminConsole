import React, { Component } from 'react';
import {
  AppBar,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { formatEntry, validEntry } from '../../utils/formUtils';
import DataForm from './DataForm';
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
import LoaderRow from './LoaderRow';
import FilterForm from './FilterForm';

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
  constructor(props) {
    super(props);
    this.filters = {};
    let visibleHeadings = 1;
    for (const id in props.headings) {
      if (props.renderFilter && !!props.headings[id].filter) {
        this.filters[id] = '';
      }
      if (!!props.headings[id].show) {
        visibleHeadings += 1;
      }
    }

    this.state = {
      query: '',
      showForm: false,
      editData: null,
      selected: [],
      page: 0,
      rowsPerPage: 5,
      count: -1,
      orderBy: 'name',
      order: 'asc',
      showFilter: false,
      visibleHeadings: visibleHeadings,
    };
  }

  addDocument = async data => {
    const success = await this.props.addDocument(data);
    if (success) {
      this.setState({ showForm: false });
      return true;
    } else {
      return false;
    }
  };

  updateDocument = async data => {
    const success = await this.props.updateDocument(data);
    if (success) {
      this.setState({ showForm: false, editData: null });
      return true;
    } else {
      return false;
    }
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
    this.props.setData({ fetchEnabled: true, records: [], previousSearch: {} });
    for (const id in this.filters) {
      this.filters[id] = '';
    }
    this.setState({
      query: '',
      showForm: false,
      editData: null,
      selected: [],
      page: 0,
      rowsPerPage: 5,
      count: -1,
      orderBy: 'name',
      order: 'asc',
      showFilter: false,
    });
    this.props.setData({ records: [], previousSearch: {}, fetchEnabled: true });
  };

  handleFilterClick = () => {
    this.setState({ showFilter: true });
  };

  handleFilterSubmit = filters => {
    if (JSON.stringify(filters) !== JSON.stringify(this.filters)) {
      this.filters = filters;
      this.updateRows();
    }
    this.setState({ showFilter: false });
  };

  handleEdit = () => {
    if (!this.state.showForm) {
      const selectedId = this.state.selected[0];
      for (let i = 0; i < this.props.data.records.length; i++) {
        if (selectedId === this.props.data.records[i].documentId) {
          this.setState({ editData: this.props.data.records[i], showForm: true });
          break;
        }
      }
    }
  };

  handleDelete = () => {
    const { records } = this.props.data;
    const selected = records.filter(row => this.state.selected.includes(row.documentId));
    const remaining = records.filter(row => !this.state.selected.includes(row.documentId));
    selected.map(async record => {
      this.props.deleteDocument(record);
    });
    this.setState({
      selected: [],
      count: this.state.count === -1 ? -1 : remaining.length,
      page: 0,
    });
    this.props.setData({ ...this.props.data, records: remaining });
  };

  updateRows = async () => {
    this.setState({ page: 0, rowsPerPage: 5 });
    const results = await this.fetchData(5);
    if (results !== null) {
      if (results.length < this.state.rowsPerPage) {
        this.setState({ count: results.length });
      } else if (this.state.count !== -1) {
        this.setState({ count: -1 });
      }
      this.props.setData({ ...this.props.data, records: results });
    }
  };

  appendRows = async requiredRows => {
    const dataLength = this.props.data.records.length;

    if (this.state.count === -1 && requiredRows > dataLength) {
      const results = await this.fetchData(
        requiredRows - dataLength,
        this.props.data.records[dataLength - 1]
      );
      if (dataLength + results.length < requiredRows) {
        const newPage = this.state.page === 0 ? 0 : this.state.page - 1;
        this.setState({ count: dataLength + results.length, page: newPage });
      }
      this.props.setData({ ...this.props.data, records: this.props.data.records.concat(results) });
    }
  };

  fetchData = (numRecords, startAt) => {
    const { query, page, rowsPerPage, order, orderBy } = this.state;
    const { fetchEnabled, previousSearch } = this.props.data;
    const filters = this.filters;
    const searchParams = {
      query,
      order,
      page,
      rowsPerPage,
      orderBy,
      startAt: !!startAt ? startAt.documentId : null,
      filters,
    };

    if (fetchEnabled && JSON.stringify(previousSearch) !== JSON.stringify(searchParams)) {
      this.props.setData({ ...this.props.data, previousSearch: searchParams, fetchEnabled: false });
      return this.props
        .fetchDocuments(query, numRecords, order, orderBy, startAt, filters)
        .then(response => {
          return response.docs.map(doc => doc.data());
        })
        .catch(error => {
          console.log(error);
          return [];
        })
        .finally(() => {
          this.props.setData({ ...this.props.data, fetchEnabled: true });
        });
    }
    return null;
  };

  handleSelectAll = event => {
    if (event.target.checked) {
      const selected = this.props.data.records.map(row => row.documentId);
      this.setState({ selected: selected });
    } else {
      this.setState({ selected: [] });
    }
  };

  handleSelect = documentId => {
    const selected = this.state.selected.filter(row => row !== documentId);
    if (selected.length === this.state.selected.length) {
      selected.push(documentId);
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

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    this.appendRows((newPage + 1) * this.state.rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage = parseInt(event.target.value);
    this.setState({ page: 0, rowsPerPage: rowsPerPage });
    this.appendRows(rowsPerPage);
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
        {this.props.renderFilter ? <FilterButton handleFilter={this.handleFilterClick} /> : <></>}
        {this.state.selected.length === 1 ? <EditButton handleEdit={this.handleEdit} /> : <></>}
        {this.state.selected.length > 0 ? <DeleteButton handleDelete={this.handleDelete} /> : <></>}
      </>
    );
  };

  RenderRows = () => {
    const { page, rowsPerPage } = this.state;
    const records = this.props.data.records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    if (records.length === 0) {
      return <LoaderRow colSpan={this.state.visibleHeadings} />;
    } else {
      return records.map((row, index) => {
        const selected = this.state.selected.includes(row.documentId);
        return (
          <DataRow
            headings={this.props.headings}
            row={row}
            selected={selected}
            onClick={this.handleSelect}
            key={index}
          />
        );
      });
    }
  };

  render() {
    return (
      <>
        {this.state.showFilter ? (
          <FilterForm
            headings={this.props.headings}
            filters={this.filters}
            onClose={this.handleFilterSubmit}
          />
        ) : (
          <></>
        )}
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
                  dataLength={this.props.data.records.length}
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
                      addDocument={this.addDocument}
                      updateDocument={this.updateDocument}
                    />
                  </TableRow>
                ) : (
                  <></>
                )}

                {this.props.data.records.length === 0 ? (
                  <EmptyRow colSpan={this.state.visibleHeadings} />
                ) : (
                  this.RenderRows()
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {this.props.data.records.length > 0 ? (
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
