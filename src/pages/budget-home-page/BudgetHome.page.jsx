import React from 'react';
import { useSelector } from 'react-redux';

import './BudgetHome.styles.scss';

const BudgetHome = () => {
  const response = useSelector((state) => state.budget.selectedBudget);

  return (
    <div className="cm-main-container cm-budget-home-container">
      <p>Response from server: {response ? response.status : 'Failed'}</p>
    </div>
  );
};

export default BudgetHome;
