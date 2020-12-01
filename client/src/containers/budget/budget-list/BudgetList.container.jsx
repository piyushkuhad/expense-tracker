import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './BudgetList.styles.scss';
import {
  createBudgetRequest,
  deleteBudget,
  getAllBudgets,
  selectedBudget,
} from '../../../redux/budget/budget.actions';
import { calcTotal, calcTotalExpense } from '../../../redux/reducer.utils';
import BudgetListItem from '../../../components/budget-list-item/BudgetListItem.component';
import history from '../../../history';
import { loaderStart } from '../../../utils/utilFn';
import {
  closeDialog,
  copyBudgetDialog,
  deleteBudgetDialog,
} from '../../../redux/dialog-forms/dialog-form.actions';
import ContentDialog from '../../../components/content-dialog/ContentDialog.component';
import FormDialog from '../../../components/forms/form-dialog/FormDialog.component';
import CreateBudget from '../../../components/forms/CreateBudget.component';

const BudgetList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBudgets());
    loaderStart(dispatch);
  }, [dispatch]);

  const [copyDialog, setCopyDialog] = React.useState(false);
  const [budgetDataObj, setBudgetDataObj] = React.useState({});
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const createBudgetFormValues = {
    budgetName: '',
    budgetDateRange: {
      startVal: moment().format(),
      endVal: moment().add(1, 'months').format(),
    },
  };

  const budgetData = useSelector((state) => state.budget.budgetData);
  const currency = useSelector((state) => state.user.currency.symbol);
  const formValues = useSelector((state) => state.forms);

  //Copy Budget Dialog
  useEffect(() => {
    if (
      formValues &&
      Object.keys(formValues.formData).length > 0 &&
      formValues.formDialogName === 'copyBudgetFormDialog'
    ) {
      setCopyDialog(true);
    } else {
      setCopyDialog(false);
    }
  }, [formValues, setCopyDialog]);

  //Close Copy Budget Diaog
  const closeCopyDialog = () => {
    setCopyDialog(false);
    //Return Dialog Values to its initial state
    setTimeout(() => dispatch(closeDialog()), 500);
  };

  //Creates obj according to data required for creating budget
  const createCategoryObj = (dataArr) => {
    //Deep Clone
    const resultArr = JSON.parse(JSON.stringify(dataArr));
    resultArr.forEach((el) => {
      el['type'] = el.transactionType;

      if (el.transactionType === 'expense') delete el.subcategoryData;

      delete el._id;
      delete el.transactionType;
    });

    return resultArr;
  };

  //When Copy button is clicked
  const copyClickHandler = (data) => {
    //console.log('copyClickHandler', data);

    setBudgetDataObj((prevState) => ({
      ...prevState,
      revenueCategories: createCategoryObj(data.revenueData),
      expenseCategories: createCategoryObj(data.expenseData),
    }));

    dispatch(
      copyBudgetDialog({
        data: {
          _id: data._id,
          name: data.budgetName,
        },
        formDialogName: 'copyBudgetFormDialog',
      })
    );
  };

  //Delete Budget Dialog
  useEffect(() => {
    if (
      formValues &&
      Object.keys(formValues.formData).length > 0 &&
      formValues.formDialogName === 'deleteFormDialog'
    ) {
      setDeleteDialog(true);
    } else {
      setDeleteDialog(false);
    }
  }, [formValues, setDeleteDialog]);

  //When Delete Icon is Clicked
  const handleDeleteIconClick = (data) => {
    dispatch(
      deleteBudgetDialog({
        data: {
          _id: data._id,
          name: data.budgetName,
        },
        formDialogName: 'deleteFormDialog',
      })
    );
  };

  //When Delete button inside content dialog is clicked
  const handleDeleteClick = () => {
    setTimeout(() => dispatch(closeDialog()), 500);

    loaderStart(dispatch, 'default', 'Deleting Budget');
    dispatch(deleteBudget(formValues.formData._id));
  };

  //Close Delete Dialog
  const closeDeleteDialog = () => {
    setDeleteDialog(false);

    //Return Dialog Values to its initial state
    setTimeout(() => dispatch(closeDialog()), 500);
  };

  //When Copy Budget Dialog Form is submitted
  const createBudgetSubmitHandler = (formData) => {
    //console.log('createBudgetSubmitHandler', formData);

    const dataToDispatch = {
      ...budgetDataObj,
      budgetData: {
        budgetName: formData.budgetName,
        budgetStartDate: formData.budgetDateRange.startVal,
        budgetEndDate: formData.budgetDateRange.endVal,
      },
    };

    //console.log('Dispatch', dataToDispatch);
    setTimeout(() => dispatch(closeDialog()), 500);

    loaderStart(dispatch, 'default', 'Creating your Budget');
    dispatch(createBudgetRequest(dataToDispatch, true));
  };

  //Handles when Budget Link is clicked
  const linkClickHandler = (data) => {
    console.log('linkClickHandler', data.budgetName);
    history.push(`/?budget=${data._id}`);
    dispatch(selectedBudget(data._id));
  };

  //Calculates total revenue and expense
  const computeBudgetRow = (arr) => {
    console.log('Arr', arr);
    return arr.map((el) => {
      el['revenueTotal'] =
        el.revenueData.length > 0
          ? calcTotal(el.revenueData, 'categoryAmount')
          : 0;

      el['expenseTotal'] =
        el.expenseData.length > 0 ? calcTotalExpense(el.expenseData) : 0;

      return el;
    });
  };

  //Memoize Budget Array
  const rowData = useMemo(() => computeBudgetRow(budgetData), [budgetData]);

  return (
    <div className="cm-budget-list-wrapper">
      {/* COPY BUDGET DIALOG */}
      <FormDialog
        dialogTitle={`Copy Budget`}
        dialogOpenHandler={copyDialog}
        dialogCloseHandler={closeCopyDialog}
        dialogSize="sm"
      >
        <CreateBudget
          initialValues={createBudgetFormValues}
          onSubmit={createBudgetSubmitHandler}
          buttonText="Copy Budget"
          update={true}
        />
      </FormDialog>
      {/* Delete Budget Dialog */}
      <ContentDialog
        dialogTitle="Delete Budget"
        dialogOpenHandler={deleteDialog}
        dialogCloseHandler={closeDeleteDialog}
        handleButtonClick={handleDeleteClick}
        dialogSize="sm"
        cancelButtonColor="primary"
        buttonTitle="Delete"
        buttonColor="secondary"
      >
        <p className="cm-dialog-info-content">
          Are you sure you want to delete{' '}
          {formValues.formDialogName === 'deleteFormDialog' ? (
            <strong>{formValues.formData.name}</strong>
          ) : null}{' '}
          ?
        </p>
      </ContentDialog>
      <div className="cm-budget-list-header cm-flex-type-1">
        <h2>Your Budgets</h2>
        <div className="cm-add-budget-btn">
          <Tooltip title="Create new Budget" placement="right">
            <Fab
              color="primary"
              aria-label="Create new Budget"
              component={Link}
              to="/create-budget"
              variant="round"
              className="cm-button-link"
              size="small"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      </div>
      <div className="cm-data-table-wrapper box-shadow-2">
        <div className="cm-data-table-header cm-flex-type-1">
          <p className="cm-db-row cm-db-row-1">#</p>
          <p className="cm-db-row cm-db-row-2">Budget Name</p>
          <p className="cm-db-row cm-db-row-3">Start Date</p>
          <p className="cm-db-row cm-db-row-4">End Date</p>
          <p className="cm-db-row cm-db-row-5">Total Income</p>
          <p className="cm-db-row cm-db-row-6">Total Expense</p>
          <p className="cm-db-row cm-db-row-7">Created At</p>
          <p className="cm-db-row cm-db-row-8">Actions?</p>
        </div>
        <div className="cm-data-table-body">
          {rowData.map((el, index) => (
            <BudgetListItem
              data={{ ...el, index: index + 1 }}
              key={el._id}
              currency={currency}
              clickHandler={linkClickHandler}
              deleteHandler={handleDeleteIconClick}
              copyHandler={copyClickHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
