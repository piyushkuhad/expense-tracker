import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const CategoryList = ({ listOfCategories, onListClickHandler }) => {
  const classes = useStyles();

  const handleListItemClick = (value) => {
    onListClickHandler(value);
  };

  return (
    <List className="cm-category-list-container">
      {listOfCategories.map((el) => (
        <ListItem
          button
          onClick={() => handleListItemClick(el.categoryName)}
          key={el.id}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <CategoryIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={el.categoryName} />
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
