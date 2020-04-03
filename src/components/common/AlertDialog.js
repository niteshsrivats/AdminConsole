import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const AlertDialog = ({ show, handleClose, title, content }) => {
  const styles = makeStyles({
    paper: {
      textAlign: "center",
      minWidth: "200px"
    }
  }, { name: "MuiDialog" });

  const classes = styles();

  return (
    <>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
