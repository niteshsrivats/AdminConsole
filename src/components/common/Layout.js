import React from "react";
import "../../styles/layout.css";
import { withStyles } from "@material-ui/core/styles";
import { Header } from "../navigation/Header";
import { Sidebar } from "../navigation/Sidebar";

const styles = (theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  wrapper: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

const Layout = ({ children, classes }) => {

  const [open, setOpen] = React.useState(false);

  const width = "15rem";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header open={open} onClick={handleOpen} shiftWidth={width}/>
      <div className={classes.wrapper}>
        <Sidebar open={open} onClick={handleClose} drawerWidth={width}/>
        <div className={classes.content}>
          <div className={classes.toolbar}/>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Layout);
