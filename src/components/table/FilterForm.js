import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Backdrop, Fade, Modal, Paper, Typography } from '@material-ui/core';
import { formatEntry, validateEntries, validEntry } from '../../utils/formUtils';
import { EntityButton } from '../common/buttons';
import Box from '@material-ui/core/Box';
import InputField from '../common/InputField';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: theme.spacing(1, 0),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 16),
  },
  button: { margin: theme.spacing(2, 0) },
  heading: { margin: theme.spacing(2, 0) },
});

class FilterForm extends Component {
  constructor(props) {
    super(props);
    const headings = {};
    const errors = {};
    for (const id in props.headings) {
      if (!!props.headings[id].filter) {
        errors[id] = false;
        headings[id] = props.headings[id];
      }
    }
    this.state = {
      headings: headings,
      errors: errors,
      filters: { ...props.filters },
    };
  }

  handleUpdate = event => {
    const name = event.target.name;
    const value = event.target.value;
    if (validEntry(name, value)) {
      const { filters, headings } = this.state;
      Object.keys(headings).forEach(id => {
        if (name !== id && !headings[name].filterCombinations.includes(id)) {
          filters[id] = '';
        }
      });
      filters[name] = formatEntry(name, value);
      this.setState({ filters: filters });
    }
  };

  handleClose = () => {
    const { valid, errors } = validateEntries(this.state.filters, true);
    if (valid) {
      this.props.onClose(this.state.filters);
    } else {
      this.setState({ errors: errors });
    }
  };

  RenderFields = () => {
    return Object.keys(this.state.headings).map(id => (
      <Box className={this.props.classes.input} key={id}>
        <InputField
          label={this.props.headings[id].name}
          name={id}
          error={this.state.errors[id]}
          value={this.state.filters[id]}
          disabled={false}
          variant="standard"
          size="medium"
          onChange={this.handleUpdate}
        />
      </Box>
    ));
  };

  render() {
    return (
      <Modal
        className={this.props.classes.modal}
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Paper className={this.props.classes.paper}>
            <Typography
              variant="h4"
              color="primary"
              align="center"
              className={this.props.classes.heading}
            >
              Filters
            </Typography>
            {this.RenderFields()}
            <Box className={this.props.classes.button}>
              <EntityButton text="Apply" onClick={this.handleClose} />
            </Box>
          </Paper>
        </Fade>
      </Modal>
    );
  }
}

export default withStyles(styles)(FilterForm);
