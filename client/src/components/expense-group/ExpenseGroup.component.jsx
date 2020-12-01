import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './ExpenseGroup.styles.scss';
import { calcTotal } from '../../redux/reducer.utils';
import ProgressBar from '../progress-bar/ProgressBar.component';
import { currencyFormat } from '../../utils/utilFn';
import ExpenseCategoryItem from '../expense-category-item/ExpenseCategoryItem.component';
import {
  addExpenseSubCategoryDialog,
  deleteExpenseCategoryDialog,
  updateExpenseCategoryDialog,
} from '../../redux/dialog-forms/dialog-form.actions';
import ExpenseCategoryMenu from '../expense-category-menu/ExpenseCategoryMenu.component';

const ExpenseGroup = ({ data }) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.user.currency.symbol);

  const calcSpentBudget = (arr) => {
    if (arr.length > 0) {
      return calcTotal(arr, 'subCategoryAmount');
    }

    return 0;
  };

  const calcProgress = (totalAmt, spentAmt) => (spentAmt / totalAmt) * 100;

  const subCategElem = (arr, categoryId) => {
    if (arr.length > 0) {
      return arr.map((el) => (
        <ExpenseCategoryItem
          expenseCategoryData={el}
          currency={currency}
          key={el._id}
          categoryId={categoryId}
        />
      ));
    }

    return <p>No Transactions Available!</p>;
  };

  const openForm = (dataObj) => {
    dispatch(
      addExpenseSubCategoryDialog({
        data: {
          categoryId: dataObj.categoryId,
          categoryName: dataObj.categoryName,
        },
        formDialogName: 'expenseFormDialog',
      })
    );
  };

  const editFn = () => {
    dispatch(
      updateExpenseCategoryDialog({
        // data: {
        //   _id: data._id,
        //   name: data.categoryName,
        //   categoryId: data._id,
        // },
        data,
        formDialogName: 'expenseCategFormDialog',
      })
    );
  };
  const deleteFn = () => {
    dispatch(
      deleteExpenseCategoryDialog({
        data: {
          _id: data._id,
          name: data.categoryName,
          categoryId: data._id,
        },
        formDialogName: 'deleteFormDialog',
      })
    );
  };

  const spentBudget = calcSpentBudget(data.subcategoryData);

  return (
    <Accordion className="cm-expense-group-container box-shadow-1">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="cm-expense-header"
      >
        <div className="cm-expense-top cm-flex-type-1">
          <div className="cm-col cm-col1">
            <h4>{data.categoryName}</h4>
          </div>
          <div className="cm-col cm-col2">
            <IconButton
              aria-label="Add Category"
              color="primary"
              onClick={() =>
                openForm({
                  categoryId: data._id,
                  categoryName: data.categoryName,
                })
              }
              size="small"
            >
              <AddCircleIcon />
            </IconButton>
            <ExpenseCategoryMenu
              dispatchDelFn={() => deleteFn()}
              dispatchEditFn={() => editFn()}
            />
          </div>
        </div>
        <div className="cm-expense-info cm-flex-type-1">
          <p>
            Budget:{' '}
            <span>{`${currency} ${currencyFormat(data.categoryAmount)}`}</span>
          </p>
          <p>
            Budget Spent:{' '}
            <span>{`${currency} ${currencyFormat(spentBudget)}`}</span>
          </p>
          <p>
            Remaining:{' '}
            <span>{`${currency} ${currencyFormat(
              data.categoryAmount - spentBudget
            )}`}</span>
          </p>
        </div>

        <ProgressBar
          progressValue={calcProgress(data.categoryAmount, spentBudget)}
          showValue={true}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="cm-expense-list">
          {subCategElem(data.subcategoryData, data._id)}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpenseGroup;
