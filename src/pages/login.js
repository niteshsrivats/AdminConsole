import React, { Component } from "react";
import { Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AlertDialog from "../components/common/AlertDialog";
import Firebase from "../services/Firebase";
import { theme } from "../styles/theme";
import { navigate } from "gatsby-link";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
});

class Login extends Component {
  state = { username: ``, password: ``, show: false, message: "" };

  handleUpdate = event => {
    if (/^[a-zA-Z0-9.!@#$%^&*()]*$/.test(event.target.value)) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    await Firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => navigate("/"))
      .catch((e) => {
        if (e.code === "auth/invalid-email") {
          this.setState({ show: true, message: "Invalid Email ID." });
        } else {
          this.setState({ show: true, message: "Invalid Credentials." });
        }
      });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <AlertDialog show={this.state.show} title="Error" content={this.state.message}
                     handleClose={this.handleClose}/>
        <Container maxWidth={"xs"}>
          <Paper elevation={8} className={classes.paper}>
            <form onSubmit={this.handleSubmit} method="post">
              <Grid container direction={"column"} justify={"center"} alignItems={"center"} spacing={4}>
                <Grid item>
                  <Typography variant="h2" align="center" color={"primary"}>Login</Typography>
                </Grid>
                <Grid item>
                  <TextField name="username" required={true} id="username" label="Username"
                             color={"secondary"}
                             onChange={this.handleUpdate} value={this.state.username}/>
                </Grid>
                <Grid item>
                  <TextField name="password" required={true} id="password" label="Password"
                             type="password"
                             autoComplete="current-password" color={"secondary"} onChange={this.handleUpdate}
                             value={this.state.password}/>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">Login</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Login);
