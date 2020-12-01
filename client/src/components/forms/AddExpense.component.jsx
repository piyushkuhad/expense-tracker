import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';

import ButtonWrapper from '../button/ButtonWrapper.component';
import CategoryList from '../category-list/CategoryList.component';
import FormDialog from './form-dialog/FormDialog.component';
import { addExpenseCategory } from '../../redux/budget/budget.actions';
import { addExpenseCategories } from '../../assets/dev-data/mainData';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const AddExpense = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { initialValues, update, onFormSubmitHandler } = props;
  const [expenseCategoryOpen, setExpenseCategoryOpen] = useState(false);

  const userExpenseCategories = useSelector(
    (state) => state.user.user.expenseCategories
  );

  const closeExpenseCategDialog = () => {
    setExpenseCategoryOpen(false);
  };

  const { handleSubmit, control, errors, reset, setValue } = useForm();

  const onSubmit = (data) => {
    const dataToDispatch = {
      ...data,
      type: 'expense',
      categoryValue: slugify(data.categoryName),
      added: true,
      id: update ? initialValues.id : Date.now(),
    };
    dispatch(addExpenseCategory(dataToDispatch));
    //Close Popup
    onFormSubmitHandler();
  };

  const onListClickHandler = (value) => {
    setValue('categoryName', value, {
      shouldDirty: true,
    });
    setExpenseCategoryOpen(false);
  };

  useEffect(() => {
    reset(initialValues);
    // eslint-disable-next-line
  }, [reset, initialValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes.root} cm-form-container`}
    >
      <div className="cm-form-field cm-form-dialog-trigger-wrapper">
        <Controller
          as={
            <TextField
              label="Expense Category"
              error={!!errors.categoryName}
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
            />
          }
          name="categoryName"
          rules={{ required: true }}
          control={control}
        />
        <IconButton
          aria-label="Select Categories"
          onClick={() => setExpenseCategoryOpen(true)}
          className="cm-form-dialog-trigger"
        >
          <CategoryIcon />
        </IconButton>
      </div>
      {/* Select Expense Category Dialog */}
      <FormDialog
        dialogTitle="Select Expense Category"
        dialogOpenHandler={expenseCategoryOpen}
        dialogCloseHandler={closeExpenseCategDialog}
        dialogSize="xs"
      >
        <CategoryList
          onListClickHandler={onListClickHandler}
          listOfCategories={{
            'Your Expense Categories': userExpenseCategories,
            'Default Expense Categories': addExpenseCategories,
          }}
        />
      </FormDialog>
      <div className="cm-form-field">
        <Controller
          as={
            <TextField
              label="Expense Budget"
              type="number"
              error={!!errors.categoryAmount}
              helperText="Set Budget for your Expense"
            />
          }
          name="categoryAmount"
          rules={{ required: true }}
          control={control}
        />
      </div>
      <div className="cm-form-field">
        <ButtonWrapper
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {update ? 'Update' : 'Add'} Expense Category
        </ButtonWrapper>
      </div>
    </form>
  );
};

AddExpense.defaultProps = {
  update: false,
  onFormSubmitHandler: () => {},
};

export default AddExpense;
