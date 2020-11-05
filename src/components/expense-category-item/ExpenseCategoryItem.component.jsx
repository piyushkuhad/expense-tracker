import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import './ExpenseCategoryItem.styles.scss';
import { currencyFormat } from '../../utils/utilFn';
import expense from '../../assets/images/expense.svg';
import { useDispatch } from 'react-redux';
import { updateExpenseSubCategoryDialog } from '../../redux/dialog-forms/dialog-form.actions';

const ExpenseCategoryItem = ({ expenseCategoryData, currency, categoryId }) => {
  //console.log(expenseCategoryData);
  const dispatch = useDispatch();

  const openForm = () => {
    dispatch(
      updateExpenseSubCategoryDialog({
        data: { ...expenseCategoryData, categoryId },
        formDialogName: 'expenseFormDialog',
      })
    );
  };

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
          <IconButton
            aria-label="delete"
            className="cm-edit-expense-btn"
            onClick={openForm}
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryItem;
