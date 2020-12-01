import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import budgetIcon from '../../assets/images/budget.svg';
import incomeIcon from '../../assets/images/income.svg';
import expenseIcon from '../../assets/images/expense.svg';

import './BudgetListItem.styles.scss';
import { currencyFormat } from '../../utils/utilFn';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const BudgetListItem = ({
  data,
  currency,
  clickHandler,
  deleteHandler,
  copyHandler,
}) => {
  const classes = useStyles();
  //console.log(data);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    //Dispatch action to Open Delete Dialog
    //dispatch(dispatchFn);
    copyHandler(data);

    //Close Menu List
    setAnchorEl(null);
  };

  const handleDelete = () => {
    //Dispatch action to Open Delete Dialog
    //dispatch(dispatchFn);
    deleteHandler(data);

    //Close Menu List
    setAnchorEl(null);
  };

  return (
    <div className="cm-budget-list-item cm-flex-type-1">
      {window.innerWidth > 1024 ? (
        <>
          <p className="cm-db-row cm-db-row-1">{data.index}</p>
          <p
            className="cm-db-row cm-db-row-2"
            onClick={() => clickHandler(data)}
          >
            {data.budgetName}
          </p>
          <p className="cm-db-row cm-db-row-3">
            {moment(data.budgetStartDate).format('DD MMM YYYY')}
          </p>
          <p className="cm-db-row cm-db-row-4">
            {moment(data.budgetEndDate).format('DD MMM YYYY')}
          </p>
          <p className="cm-db-row cm-db-row-5">
            <span className="cm-currency-symbol">{currency}</span>{' '}
            {currencyFormat(data.revenueTotal)}
          </p>
          <p className="cm-db-row cm-db-row-6">
            <span className="cm-currency-symbol">{currency}</span>{' '}
            {currencyFormat(data.expenseTotal)}
          </p>
          <p className="cm-db-row cm-db-row-7">
            {moment(data.createdAt).format('DD MMM YYYY')}
          </p>
        </>
      ) : (
        <div
          className="cm-mob-budget-list cm-flex-type-1"
          onClick={() => clickHandler(data)}
        >
          <div className="cm-icon-holder">
            <img src={budgetIcon} alt="budget" />
          </div>
          <div className="cm-content-row cm-flex-type-1">
            <div className="cm-col cm-left-col">
              <p className="cm-mob-budget-name">{data.budgetName}</p>
              <p className="cm-mob-budget-date">
                {moment(data.budgetStartDate).format('DD MMM YYYY')} -{' '}
                {moment(data.budgetEndDate).format('DD MMM YYYY')}
              </p>
            </div>
            <div className="cm-col cm-right-col">
              <p className="cm-mob-rev-total">
                <img src={incomeIcon} alt="Income" />
                <span className="cm-currency-symbol">{currency}</span>{' '}
                {currencyFormat(data.revenueTotal)}
              </p>
              <p className="cm-mob-exp-total">
                <img src={expenseIcon} alt="Expense" />
                <span className="cm-currency-symbol">{currency}</span>{' '}
                {currencyFormat(data.expenseTotal)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="cm-db-row cm-budget-list-actions cm-flex-type-2 cm-db-row-8">
        <IconButton
          aria-label="Menu"
          color="primary"
          className={classes.button}
          //onClick={() => deleteHandler(data)}
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
          <MenuItem onClick={handleCopy}>Copy budget</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default BudgetListItem;
