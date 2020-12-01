import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import { blue } from '@material-ui/core/colors';
import slugify from 'react-slugify';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
    width: 32,
    height: 32,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  stickyHeader: {
    fontWeight: '700',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const CategoryList = ({ listOfCategories, onListClickHandler }) => {
  const classes = useStyles();

  //console.log('listOfCategories', listOfCategories);

  const handleListItemClick = (value) => {
    onListClickHandler(value);
  };
  //[0, 1, 2, 3, 4]
  return (
    <List className={classes.root} subheader={<li />}>
      {Object.keys(listOfCategories).map((sectionHeading) => {
        return listOfCategories[sectionHeading].length > 0 ? (
          <li
            key={`section-${slugify(sectionHeading)}`}
            className={classes.listSection}
          >
            <ul className={classes.ul}>
              <ListSubheader
                className={classes.stickyHeader}
              >{`${sectionHeading}`}</ListSubheader>
              {listOfCategories[sectionHeading].map((item) => (
                <ListItem
                  button
                  key={`item-${slugify(sectionHeading)}-${slugify(
                    item.categoryName
                  )}`}
                  onClick={() => handleListItemClick(item.categoryName)}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <CategoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${item.categoryName}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ) : null;
      })}
    </List>

    // <List className="cm-category-list-container">
    //   {listOfCategories.map((el) => (
    //     <ListItem
    //       button
    //       onClick={() => handleListItemClick(el.categoryName)}
    //       key={el.id}
    //     >
    //       <ListItemAvatar>
    //         <Avatar className={classes.avatar}>
    //           <CategoryIcon />
    //         </Avatar>
    //       </ListItemAvatar>
    //       <ListItemText primary={el.categoryName} />
    //     </ListItem>
    //   ))}
    // </List>
  );
};

export default CategoryList;
