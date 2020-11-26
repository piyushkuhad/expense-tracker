import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import './AddBlock.styles.scss';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AddBlock = (props) => {
  const classes = useStyles();

  const { onClickHandler, onDeleteHandler, categObj } = props;

  //console.log('Props', props.categObj);

  const { id, categoryAmount, categoryName, type, added } = categObj;

  //const [showAdd, setShowAdd] = useState(true);

  const handleClick = () => {
    //setShowAdd((previousState) => !previousState);
    onClickHandler(categObj);
  };

  const handleDelete = () => {
    onDeleteHandler(categObj.categoryValue);
  };

  return (
    <div
      className="cm-add-blocks-item box-shadow-2 cm-flex-type-1"
      data-id={id}
    >
      <div className="cm-col cm-col1">
        <IconButton
          aria-label="Add or Edit Category"
          color="primary"
          className={classes.button}
          onClick={handleClick}
          size="small"
        >
          {added ? <EditIcon /> : <AddCircleIcon />}
        </IconButton>
      </div>
      <div className="cm-col cm-col2">
        <h4>{categoryName}</h4>
        <h5>
          {type === 'revenue' ? 'Amount:' : 'Budget:'}
          <span>{(+categoryAmount).toFixed(2)}</span>
        </h5>
      </div>
      <div className="cm-col cm-col3">
        {/*Show Delete Icon Else show Category Type*/}
        {added ? (
          <IconButton
            aria-label="Remove Category"
            color="secondary"
            className={classes.button}
            onClick={handleDelete}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <p className={type}>{type === 'revenue' ? 'Income' : 'Expense'}</p>
        )}
      </div>
    </div>
  );
};

AddBlock.defaultProps = {
  type: 'revenue', //revenue or expense
  title: '',
  amount: 0,
  value: '',
  onDeleteHandler: () => {},
};

export default AddBlock;
