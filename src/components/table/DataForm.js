import React, { Component } from 'react';
import { TextField, TableCell, IconButton } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { formatEntry, validateEntries, validEntry } from '../../utils/formUtils';

const styles = makeStyles(theme => ({
  inputLarge: {
    width: '20ch',
    fontSize: theme.typography.fontSize,
  },
  inputMedium: {
    width: '15ch',
    fontSize: theme.typography.fontSize,
  },
  inputSmall: {
    width: '8ch',
    fontSize: theme.typography.fontSize,
  },
}));

const InputField = ({ name, error, data, editable, editForm, size, onChange }) => {
  const classes = styles();
  data = !!data ? data : '';

  if (!editForm) {
    editable = true;
  }

  let inputProps;
  switch (size) {
    case 'large':
      inputProps = { className: classes.inputLarge };
      break;
    case 'medium':
      inputProps = { className: classes.inputMedium };
      break;
    case 'small':
      inputProps = { className: classes.inputSmall };
      break;
    default:
      inputProps = { className: classes.inputLarge };
  }

  return (
    <TextField
      disabled={!editable}
      name={name}
      error={error}
      color={'secondary'}
      size={'small'}
      variant={'outlined'}
      onChange={onChange}
      value={data}
      InputProps={inputProps}
    />
  );
};

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
    if (!!this.props.editData) {
      this.props.headings.forEach(heading => {
        const id = heading.id.toLowerCase();
        if (heading.array) {
          data[id] = this.props.editData[id].join(', ');
        } else {
          data[id] = this.props.editData[id].toString();
        }
        errors[id] = false;
      });
    } else {
      this.props.headings.forEach(heading => {
        data[heading.id.toLowerCase()] = '';
        errors[heading.id.toLowerCase()] = false;
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

  handleSubmit = () => {
    const { valid, errors } = validateEntries(this.state.data);
    this.setState({ disable: true, errors: errors });

    if (valid) {
      if (!!this.props.editData) {
        const { data } = this.state;
        data['documentId'] = this.props.editData.documentId;
        this.props.updateDocument(data);
      } else {
        this.props.addDocument(this.state.data);
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
        {this.props.headings.map(heading => {
          const id = heading.id.toLowerCase();
          return (
            <TableCell align={'center'} key={id}>
              <InputField
                name={id}
                onChange={this.handleUpdate}
                error={this.state.errors[id]}
                editable={heading.edit}
                editForm={!!this.props.editData}
                size={heading.size}
                data={this.state.data[id]}
              />
            </TableCell>
          );
        })}
      </>
    );
  }
}

export default DataForm;
