import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import ButtonWrapper from '../button/ButtonWrapper.component';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';

import './form.styles.scss';
import {
  addExpenseCategory,
  updateExpenseCategory,
} from '../../redux/expense/expense.action';
import { closeDialog } from '../../redux/dialog-forms/dialog-form.actions';
import { loaderStart } from '../../utils/utilFn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const AddExpenseCategory = (props) => {
  const classes = useStyles();

  const { handleSubmit, control, errors, reset } = useForm();

  //const { initialValues, update } = props;
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.forms);

  const initialValues = formValues.formData;
  const update = formValues.update;

  const onSubmit = (data) => {
    // console.log(data);
    if (update) {
      data.id = initialValues._id;
    }

    const dataToDispatch = {
      ...data,
      categoryValue: slugify(data.categoryName),
      categoryId: initialValues._id,
    };

    update ? loaderStart(dispatch, 'default', 'Updating Expense Category'): loaderStart(dispatch, 'default', 'Adding Expense Category');

    update
      ? dispatch(updateExpenseCategory(dataToDispatch))
      : dispatch(addExpenseCategory(dataToDispatch));
    dispatch(closeDialog());
  };

  useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes.root} cm-form-container`}
    >
      <div className="cm-form-field">
        <Controller
          as={
            <TextField
              label="Expense Category Name"
              error={!!errors.categoryName}
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              disabled={update}
            />
          }
          name="categoryName"
          rules={{ required: true }}
          control={control}
        />
      </div>
      <div className="cm-form-field">
        <Controller
          as={
            <TextField
              label="Expense Budget"
              type="number"
              error={!!errors.categoryAmount}
              helperText="Enter Expense Budget"
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
          {update ? 'Update' : 'Add'} Expense
        </ButtonWrapper>
      </div>
    </form>
  );
};

AddExpenseCategory.defaultProps = {
  update: false,
  //onFormSubmitHandler: () => {},
};

export default AddExpenseCategory;
