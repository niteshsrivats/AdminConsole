import React, { Component } from "react";
import firebase from "gatsby-plugin-firebase";
import Loader from "../common/Loader";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../styles/theme";
import { navigate } from "gatsby-link";
import { DepartmentsProvider } from "../../contexts/DepartmentContext";

const PrivateRoute = (WrappedComponent) => class extends Component {

  state = { user: undefined };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  calculateComponent() {
    if (this.state.user === undefined) {
      return <Loader/>;
    } else if (!!this.state.user) {
      return (
        <DepartmentsProvider>
          <WrappedComponent user={this.state.user}/>
        </DepartmentsProvider>
      );
    } else {
      navigate("/login");
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.calculateComponent()}
      </MuiThemeProvider>
    );
  }
};

export default PrivateRoute;
