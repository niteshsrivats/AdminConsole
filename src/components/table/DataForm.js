import React, { Component } from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { formatEntry, validateEntries, validEntry } from '../../utils/formUtils';
import InputField from '../common/InputField';

class DataForm extends Component {
  classes = this.props.classes;

  state = {
    data: {},
    errors: [],
    disable: false,
    error: false,
  };

  componentDidMount() {
    let data = {};
    const errors = {};
    const { headings } = this.props;
    if (!!this.props.editData) {
      Object.keys(headings).map(id => {
        if (!!headings[id].array) {
          data[id] = this.props.editData[id].join(', ');
        } else {
          data[id] = this.props.editData[id].toString();
        }
        errors[id] = false;
      });
    } else {
      Object.keys(headings).forEach(id => {
        data[id] = '';
        errors[id] = false;
      });
    }
    this.setState({ data: data, errors: errors });
  }

  handleUpdate = event => {
    const name = event.target.name;
    const value = event.target.value;
    if (validEntry(name, value)) {
      this.setState({ data: { ...this.state.data, [name]: formatEntry(name, value) } });
    }
  };

  handleSubmit = async () => {
    const { valid, errors } = validateEntries(this.state.data);
    this.setState({ disable: true, errors: errors });

    if (valid) {
      let success;
      if (!!this.props.editData) {
        const { data } = this.state;
        data['documentId'] = this.props.editData.documentId;
        success = await this.props.updateDocument(data);
      } else {
        success = await this.props.addDocument(this.state.data);
      }
      if (!success) {
        this.setState({ disable: false });
      }
    } else {
      this.setState({ disable: false });
    }
  };

  render() {
    return (
      <>
        <TableCell padding="none" key="select-all">
          <IconButton
            style={{ padding: 'auto' }}
            disabled={this.state.disable}
            onClick={this.handleSubmit}
          >
            <Done color="secondary" />
          </IconButton>
        </TableCell>
        {Object.keys(this.props.headings).map(id => {
          if (this.props.headings[id].show) {
            return (
              <TableCell align={'center'} key={id}>
                <InputField
                  name={id}
                  error={this.state.errors[id]}
                  value={this.state.data[id]}
                  disabled={!!this.props.editData ? !!!this.props.headings[id].edit : false}
                  variant="outlined"
                  size={this.props.headings[id].size}
                  onChange={this.handleUpdate}
                />
              </TableCell>
            );
          }
        })}
      </>
    );
  }
}

export default DataForm;
