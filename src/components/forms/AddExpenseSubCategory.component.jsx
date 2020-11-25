import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import ButtonWrapper from '../button/ButtonWrapper.component';
import { makeStyles } from '@material-ui/core/styles';
import NewDatePicker from '../date-picker/NewDatePicker.component';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';

import './form.styles.scss';
import { payerData, accountData } from '../../assets/dev-data/mainData';
import {
  addExpenseSubCategory,
  updateExpenseSubCategory,
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

const AddExpenseSubCategory = (props) => {
  const classes = useStyles();

  const { handleSubmit, control, errors, reset } = useForm();

  //const { initialValues, update, onFormSubmitHandler } = props;
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.forms);

  const initialValues = formValues.formData;
  const update = formValues.update;

  const initialDate = moment().format();

  const onSubmit = (data) => {
    // console.log(data);
    if (update) {
      data.id = initialValues._id;
    }

    const dataToDispatch = {
      ...data,
      subCategoryValue: slugify(data.subCategoryName),
      categoryId: initialValues.categoryId,
    };

    update
      ? loaderStart(dispatch, 'default', 'Updating Expense Sub Category')
      : loaderStart(dispatch, 'default', 'Adding Expense Sub Category');

    console.log('Go');

    update
      ? dispatch(updateExpenseSubCategory(dataToDispatch))
      : dispatch(addExpenseSubCategory(dataToDispatch));

    dispatch(closeDialog());
  };

  useEffect(() => {
    if (update) {
      reset(initialValues);
    }
  }, [reset, initialValues, update]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes.root} cm-form-container`}
    >
      <div className="cm-form-field">
        <Controller
          as={
            <TextField
              label="Expense Name"
              error={!!errors.subCategoryName}
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              disabled={update}
            />
          }
          name="subCategoryName"
          rules={{ required: true }}
          control={control}
        />
      </div>
      <div className="cm-form-field-half">
        <div className="cm-form-field">
          <Controller
            as={
              <TextField
                label="Expense Amount"
                type="number"
                error={!!errors.subCategoryAmount}
                helperText="Enter Expense Amount"
              />
            }
            name="subCategoryAmount"
            rules={{ required: true }}
            control={control}
          />
        </div>
        <Controller
          defaultValue={update ? initialValues.transactionDate : initialDate}
          render={(dateChangeHandler, onBlur, value) => (
            <NewDatePicker
              dateChangeHandler={dateChangeHandler}
              onBlur={onBlur}
              startVal={update ? initialValues.transactionDate : initialDate}
              selected={value}
              label="Transaction Date"
            />
          )}
          name="transactionDate"
          control={control}
        />
      </div>
      <div className="cm-form-field-half">
        <div className="cm-form-field">
          <InputLabel id="demo-simple-select-label">
            Payer (optional)
          </InputLabel>
          <Controller
            as={
              <Select fullWidth={true}>
                {payerData.map((el) => (
                  <MenuItem value={el.value} key={el.value}>
                    {el.categoryName}
                  </MenuItem>
                ))}
              </Select>
            }
            name="payer"
            defaultValue={update ? initialValues.payer : ''}
            control={control}
          />
          <FormHelperText>
            A person or organization that gave you money
          </FormHelperText>
        </div>
        <div className="cm-form-field">
          <InputLabel id="demo-simple-select-label">
            Account (optional)
          </InputLabel>
          <Controller
            as={
              <Select fullWidth={true}>
                {accountData.map((el) => (
                  <MenuItem value={el.value} key={el.value}>
                    {el.categoryName}
                  </MenuItem>
                ))}
              </Select>
            }
            name="account"
            defaultValue={update ? initialValues.account : ''}
            control={control}
          />
          <FormHelperText>
            Choose account type. Ex: Cash, Bank, Cheque
          </FormHelperText>
        </div>
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

AddExpenseSubCategory.defaultProps = {
  update: false,
  onFormSubmitHandler: () => {},
};

export default AddExpenseSubCategory;
