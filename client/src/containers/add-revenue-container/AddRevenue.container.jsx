import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import './AddRevenue.styles.scss';
import AddRevenue from '../../components/forms/AddRevenue.component';
import income from '../../assets/images/income.png';
import FormDialog from '../../components/forms/form-dialog/FormDialog.component';
import AddBlock from '../../components/add-block/AddBlock.component';
import { deleteRevenueCategory } from '../../redux/budget/budget.actions';

const AddRevenueContainer = () => {
  const dispatch = useDispatch();

  //Initial Revenue Form Values
  const revenueFormInitialValues = {
    type: 'revenue',
    categoryName: '',
    categoryAmount: '',
    transactionDate: moment().format(),
    payer: '',
    account: '',
  };

  //Add Income Dialog
  const [addIncomeOpen, setAddIncomeOpen] = useState(false);

  //Add Revenue Initial Values
  const [revenueFormInitial, setRevenueFormInitial] = useState(
    revenueFormInitialValues
  );

  //Should Form Update Bool
  const [isFormUpdate, setIsFormUpdate] = useState(false);

  //Default Income Category Data
  const revenueDataArr = useSelector(
    (state) => state.budget.createBudgetData.revenueCategories
  );

  const closeAddIncome = () => {
    setAddIncomeOpen(false);
  };

  const onFormSubmitHandler = () => {
    setAddIncomeOpen(false);
    setRevenueFormInitial(revenueFormInitialValues);
  };

  //Opens Popup with Category Values
  const addBlockHandler = (valuesObj) => {
    setRevenueFormInitial({
      ...valuesObj,
      type: 'revenue',
      transactionDate: !valuesObj.transactionDate
        ? moment().format()
        : valuesObj.transactionDate,
    });

    setIsFormUpdate(true);

    setAddIncomeOpen(true);
  };

  const deleteBlockHandler = (deleteValue) => {
    dispatch(deleteRevenueCategory(deleteValue));
  };

  return (
    <div className="cm-add-revenue-container">
      <div className="cm-col-half">
        <div className="cm-col-header cm-flex-type-1">
          <h3>Add Income</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsFormUpdate(false);
              setAddIncomeOpen(true);
            }}
          >
            Add Income
          </Button>
        </div>

        {/* ADD REVENUE FORM POPUP */}
        <FormDialog
          dialogOpenHandler={addIncomeOpen}
          dialogCloseHandler={closeAddIncome}
          dialogTitle="Add Revenue"
        >
          <AddRevenue
            update={isFormUpdate}
            initialValues={revenueFormInitial}
            onFormSubmitHandler={onFormSubmitHandler}
          />
        </FormDialog>

        <div className="cm-col-body cm-flex-type-1 cm-flex-wrap">
          {revenueDataArr.map((el) => (
            <AddBlock
              key={el.id}
              categObj={el}
              onClickHandler={addBlockHandler}
              onDeleteHandler={deleteBlockHandler}
            />
          ))}
        </div>
      </div>
      <img src={income} alt="Income" />
    </div>
  );
};

export default AddRevenueContainer;
