import React from 'react';
import { useDispatch } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import './SideHeader.styles.scss';
import logo from '../../assets/images/Expensum-icon-dark.png';
//import logo from '../../assets/images/Expensum-Logo.png';
// import whiteLogo from '../../assets/images/Expensum-Logo-White.png';
import { logout } from '../../redux/user/user.actions';

const SideHeader = () => {
  //Fetch user from state
  //const currentUser = useSelector((state) => state.user.user);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const dispatch = useDispatch();

  return (
    <div className="cm-side-header-container">
      <div className="cm-logo">
        <img src={logo} alt="Insta" />
      </div>
      <div className="cm-side-menu">
        <ul className="cm-menu-ul">
          <li>
            <Tooltip title="Home" placement="right" arrow>
              <IconButton
                color="default"
                aria-label="Home"
                component={Link}
                to="/"
                variant="contained"
                className="cm-button-link"
                size="small"
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Budgets" placement="right" arrow>
              <IconButton
                color="default"
                aria-label="Budgets"
                component={Link}
                to="/budgets"
                variant="contained"
                className="cm-button-link"
                size="small"
              >
                <AssignmentIcon />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Categories" placement="right" arrow>
              <IconButton
                color="default"
                aria-label="Categories"
                component={Link}
                to="/categories"
                variant="contained"
                className="cm-button-link"
                size="small"
              >
                <CategoryIcon />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Analytics" placement="right" arrow>
              <IconButton
                color="default"
                aria-label="Analytics"
                component={Link}
                to="/analytics"
                variant="contained"
                className="cm-button-link"
                size="small"
              >
                <BarChartIcon />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Settings" placement="right" arrow>
              <IconButton
                color="default"
                aria-label="Settings"
                component={Link}
                to="/settings"
                variant="contained"
                className="cm-button-link"
                size="small"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </div>
      <div className="cm-account-menu">
        <ul className="cm-menu-ul">
          <li>
            <IconButton
              color="default"
              aria-label="User Profile"
              component="span"
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircle />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="right"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={() => dispatch(logout())}>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideHeader;
