import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

import './Header.styles.scss';
import logo from '../../assets/images/Expensum-Logo.png';
import whiteLogo from '../../assets/images/Expensum-Logo-White.png';
import { logout } from '../../redux/user/user.actions';

const Header = ({ logoType }) => {
  //Fetch user from state
  const currentUser = useSelector((state) => state.user.user);

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
    <div className={`cm-header-container cm-flex-type-2 ${logoType}`}>
      <div className="cm-header-center cm-flex-type-1">
        <div className="cm-header-logo">
          <img src={logoType === 'white' ? whiteLogo : logo} alt="Expensum" />
        </div>
        <div className="cm-header-menu-container">
          <ul className="cm-menu-ul cm-flex-type-1">
            {currentUser._id ? (
              <>
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
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
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
                              <MenuItem onClick={handleClose}>
                                Settings
                              </MenuItem>
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
              </>
            ) : (
              <>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li>
                  <Link to="/">Feedback</Link>
                </li>
                <li>
                  <Button
                    component={Link}
                    to="/auth"
                    variant="contained"
                    color="primary"
                    className="cm-button-link"
                  >
                    Login
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  logoType: 'dark',
};

export default Header;
