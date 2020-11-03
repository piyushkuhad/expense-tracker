import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import './ExpenseCategoryItem.styles.scss';
import { currencyFormat } from '../../utils/utilFn';
import expense from '../../assets/images/expense.svg';

const ExpenseCategoryItem = ({ expenseCategoryData, currency }) => {
  //const data = useSelector((state) => state.budget.selectedBudget.revenueData);

  console.log(expenseCategoryData);

  return (
    <div className="cm-expense-category-item-container cm-sub-categ-item cm-flex-type-2">
      <Avatar alt="Expense" src={expense} />
      <div className="cm-sub-categ-data cm-flex-type-1">
        <div className="cm-col cm-col1">
          <p>{expenseCategoryData.subCategoryName}</p>
          <p className="cm-sub-categ-date">
            {moment(expenseCategoryData.transactionDate).format(
              'ddd, Do MMM YY'
            )}
          </p>
        </div>
        <div className="cm-col cm-col2 cm-flex-type-1">
          <p className="cm-sub-categ-amt">{`${currency} ${currencyFormat(
            expenseCategoryData.subCategoryAmount
          )}`}</p>
          <IconButton aria-label="delete" className="cm-edit-expense-btn">
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryItem;
