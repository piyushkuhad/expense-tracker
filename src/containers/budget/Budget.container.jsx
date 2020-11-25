import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Budget.styles.scss';
import BudgetInfo from './budget-info/BudgetInfo.container';
import CategoriesInfo from './categories-info/CategoriesInfo.container';

const BudgetContainer = (props) => {
  const [budgetValues, setBudgetValues] = useState({});

  const selectBudgetId =
    props.selectBudget.length > 0
      ? props.selectBudget.split('?budget=')[1]
      : '';

  const selectedBudgetData = useSelector(
    (state) => state.budget.selectedBudget
  );

  useEffect(() => {
    setBudgetValues(selectedBudgetData);
  }, [selectedBudgetData]);

  // console.log('budgetValues', Object.keys(budgetValues).length);

  return (
    <div className="cm-budget-container cm-col-divider">
      <div className="cm-row-fluid cm-flex-type-1">
        <div className="cm-col cm-col1">
          <BudgetInfo
            budgetValuesData={budgetValues}
            selectBudgetId={selectBudgetId}
          />
        </div>
        <div className="cm-col cm-col2 box-shadow-1">
          <CategoriesInfo data={budgetValues} />
        </div>
      </div>
    </div>
  );
};

export default BudgetContainer;
