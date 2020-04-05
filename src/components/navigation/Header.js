import React from "react";
import clsx from "clsx";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

export const Header = ({ shiftWidth, open, onClick }) => {

  const classes = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: shiftWidth,
      width: `calc(100% - ${shiftWidth})`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(4),
    },
    hide: {
      display: "none"
    }
  }))();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}
        >
          <Menu/>
        </IconButton>
        <Typography variant="h4" noWrap>
          Console
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
