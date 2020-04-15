import React from 'react';
import clsx from 'clsx';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Inbox } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { navigate } from 'gatsby-link';

export const Sidebar = ({ drawerWidth, open, onClick }) => {
  const classes = makeStyles(theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      background: theme.palette.primary.main,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(6),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8),
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }))();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClick}>
          {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Students', 'Teachers', 'Admins'].map(text => (
          <ListItem button key={text} onClick={() => navigate(`/${text.toLowerCase()}`)}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Student', 'Teacher', 'Admin'].map(text => (
          <ListItem button key={text} onClick={() => navigate(`/${text.toLowerCase()}`)}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
