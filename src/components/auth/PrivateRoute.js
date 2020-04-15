import React, { Component } from 'react';
import firebase from 'gatsby-plugin-firebase';
import Loader from '../common/Loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../styles/theme';
import { navigate } from 'gatsby-link';
import DataContextWrapper from '../../contexts/DataContextWrapper';

const PrivateRoute = RouteComponent =>
  class extends Component {
    state = { user: undefined };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    }

    calculateComponent() {
      if (this.state.user === undefined) {
        return <Loader />;
      } else if (!!this.state.user) {
        return (
          <DataContextWrapper>
            <RouteComponent user={this.state.user} />
          </DataContextWrapper>
        );
      } else {
        navigate('/login');
      }
    }

    render() {
      return <MuiThemeProvider theme={theme}>{this.calculateComponent()}</MuiThemeProvider>;
    }
  };

export default PrivateRoute;
