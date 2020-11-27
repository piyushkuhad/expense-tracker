import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import './AppBarMenu.styles.scss';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolBar: {
    minHeight: 48,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: '#03A9F4 !important',
  },
}));

const AppBarMenu = () => {
  const classes = useStyles();

  return (
    <div className="cm-app-bar-container">
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton> */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Home"
            component={Link}
            to="/"
            variant="contained"
            className="cm-button-link"
            size="small"
          >
            <HomeIcon />
            <span>Home</span>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Budgets"
            component={Link}
            to="/budgets"
            variant="contained"
            className="cm-button-link"
            size="small"
          >
            <AssignmentIcon />
            <span>Budgets</span>
          </IconButton>
          <Fab
            color="secondary"
            className={`${classes.fabButton} cm-button-link`}
            aria-label="Create new Budget"
            component={Link}
            to="/create-budget"
          >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton
            color="inherit"
            aria-label="Analytics"
            component={Link}
            to="/analytics"
            variant="contained"
            className="cm-button-link"
            size="small"
          >
            <BarChartIcon />
            <span>Analytics</span>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Settings"
            component={Link}
            to="/settings"
            variant="contained"
            className="cm-button-link"
            size="small"
            edge="end"
          >
            <SettingsIcon />
            <span>Settings</span>
          </IconButton>
          {/* <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarMenu;
