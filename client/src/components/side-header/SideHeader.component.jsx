import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
import UserMenu from '../user-menu/UserMenu.component';

const SideHeader = () => {
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
      <UserMenu />
    </div>
  );
};

export default SideHeader;
