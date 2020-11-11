import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';

import './ExpenseCategoryMenu.styles.scss';

const ExpenseCategoryMenu = ({ dispatchDelFn, dispatchEditFn }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch(dispatchEditFn);

    setAnchorEl(null);
  };

  const handleDelete = () => {
    //console.log('Delete');

    //Dispatch action to Open Delete Dialog
    dispatch(dispatchDelFn);

    //Close Menu List
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="Menu"
        className="cm-delete-menu"
        onClick={handleMenuClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ExpenseCategoryMenu;
