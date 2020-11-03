import React from 'react';
import { useSelector } from 'react-redux';
import './ExpenseGroup.styles.scss';
import { calcTotal } from '../../redux/reducer.utils';
import ProgressBar from '../progress-bar/ProgressBar.component';
import { currencyFormat } from '../../utils/utilFn';
import ExpenseCategoryItem from '../expense-category-item/ExpenseCategoryItem.component';

const ExpenseGroup = ({ data }) => {
  const currency = useSelector((state) => state.user.currency.symbol);

  const calcSpentBudget = (arr) => {
    if (arr.length > 0) {
      return calcTotal(arr, 'subCategoryAmount');
    }

    return 0;
  };

  const calcProgress = (totalAmt, spentAmt) => (spentAmt / totalAmt) * 100;

  const subCategElem = (arr) => {
    if (arr.length > 0) {
      return arr.map((el) => (
        <ExpenseCategoryItem
          expenseCategoryData={el}
          currency={currency}
          key={el._id}
        />
      ));
    }

    return <p>No Transactions Available!</p>;
  };

  const spentBudget = calcSpentBudget(data.subcategoryData);

  return (
    <div className="cm-expense-group-container box-shadow-1">
      <div className="cm-expense-header">
        <h4>{data.categoryName}</h4>
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
      </div>
      <div className="cm-expense-list">
        {subCategElem(data.subcategoryData)}
      </div>
    </div>
  );
};

export default ExpenseGroup;
