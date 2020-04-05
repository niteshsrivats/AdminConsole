import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../styles/theme";
import "typeface-roboto";
import Dashboard from "../auth_pages/Dashboard";

export default () => (
  <MuiThemeProvider theme={theme}>
    <Dashboard/>
  </MuiThemeProvider>
)
