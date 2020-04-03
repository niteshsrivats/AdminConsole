import React from "react";
import { Router } from "@reach/router";
import { AuthProvider } from "../providers/AuthProvider";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../styles/theme";
import "typeface-roboto";
import PrivateRoute from "../components/auth/PrivateRoute";
import Dashboard from "../auth_pages/Dashboard";

export default () => (
  <MuiThemeProvider theme={theme}>
    <AuthProvider>
      <Router >
        <PrivateRoute path="/" component={Dashboard}/>
        <PrivateRoute path="/dashboard" component={Dashboard}/>
      </Router>
    </AuthProvider>
  </MuiThemeProvider>
)
