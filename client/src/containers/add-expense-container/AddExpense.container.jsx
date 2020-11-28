import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';

import './AddExpense.styles.scss';
import AddExpense from '../../components/forms/AddExpense.component';
import expense from '../../assets/images/expense.png';
import FormDialog from '../../components/forms/form-dialog/FormDialog.component';
import AddBlock from '../../components/add-block/AddBlock.component';
import { deleteExpenseCategory } from '../../redux/budget/budget.actions';

const AddExpenseContainer = () => {
  const dispatch = useDispatch();

  //Initial Expense Form Values
  const expenseFormInitialValues = {
    type: 'expense',
    categoryName: '',
    categoryAmount: '',
  };

  //Add Expense Dialog
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);

  //Add Expense Initial Values
  const [expenseFormInitial, setExpenseFormInitial] = useState(
    expenseFormInitialValues
  );

  //Should Form Update Bool
  const [isFormUpdate, setIsFormUpdate] = useState(false);

  //Default Expense Category Data
  const expenseDataArr = useSelector(
    (state) => state.budget.createBudgetData.expenseCategories
  );

  const closeAddExpense = () => {
    setAddExpenseOpen(false);
  };

  const onFormSubmitHandler = () => {
    setAddExpenseOpen(false);
    setExpenseFormInitial(expenseFormInitialValues);
  };

  //Opens Popup with Catgory Values
  const addBlockHandler = (valuesObj) => {
    setExpenseFormInitial({
      ...valuesObj,
      type: 'expense',
    });

    setIsFormUpdate(true);

    setAddExpenseOpen(true);
  };

  const deleteBlockHandler = (deleteValue) => {
    //console.log('Received', deleteValue);
    dispatch(deleteExpenseCategory(deleteValue));
  };

  return (
    <div className="cm-add-expense-container">
      <div className="cm-col-half">
        <div className="cm-col-header cm-flex-type-1">
          <h3>Add Expense Category</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsFormUpdate(false);
              setAddExpenseOpen(true);
            }}
          >
            Add Expense
          </Button>
        </div>

        {/* ADD EXPENSE FORM POPUP */}
        <FormDialog
          dialogOpenHandler={addExpenseOpen}
          dialogCloseHandler={closeAddExpense}
          dialogTitle="Add Expense Category"
        >
          <AddExpense
            update={isFormUpdate}
            initialValues={expenseFormInitial}
            onFormSubmitHandler={onFormSubmitHandler}
          />
        </FormDialog>

        <div className="cm-col-body cm-flex-type-1 cm-flex-wrap">
          {expenseDataArr.map((el) => (
            <AddBlock
              key={el.id}
              categObj={el}
              onClickHandler={addBlockHandler}
              onDeleteHandler={deleteBlockHandler}
            />
          ))}
        </div>
      </div>
      <img src={expense} alt="Expense" />
    </div>
  );
};

export default AddExpenseContainer;
