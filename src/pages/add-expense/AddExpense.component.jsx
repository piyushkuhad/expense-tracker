import React from 'react';
import AddExpenseForm from '../../components/forms/AddExpenseForm.component';

import './AddExpense.styles.scss';

const AddExpense = (props) => {
  return (
    <div className="cm-page-container">
      <AddExpenseForm {...props} />
    </div>
  );
};

export default AddExpense;
