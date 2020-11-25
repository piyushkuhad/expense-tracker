import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './BudgetListItem.styles.scss';
import { currencyFormat } from '../../utils/utilFn';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const BudgetListItem = ({ data, currency, clickHandler, deleteHandler }) => {
  const classes = useStyles();
  //console.log(data);

  return (
    <div className="cm-budget-list-item cm-flex-type-1">
      <p className="cm-db-row cm-db-row-1">{data.index}</p>
      <p className="cm-db-row cm-db-row-2" onClick={() => clickHandler(data)}>
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
      <div className="cm-db-row cm-budget-list-actions cm-flex-type-2 cm-db-row-8">
        <IconButton
          aria-label="Delete Budget"
          color="primary"
          className={classes.button}
          onClick={() => deleteHandler(data)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default BudgetListItem;
