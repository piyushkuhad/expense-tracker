import React, { useEffect, useState } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';

import CategoryList from '../category-list/CategoryList.component';
import FormDialog from './form-dialog/FormDialog.component';
import { addRevenueCategory } from '../../redux/budget/budget.actions';
import {
  payerData,
  accountData,
  addIncomeCategories,
} from '../../assets/dev-data/mainData';
import './form.styles.scss';
import {
  addIncomeCategory,
  updateIncomeCategory,
} from '../../redux/revenue/revenue.action';
import { toISOFormat } from '../../utils/dateMethods';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const AddRevenue = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { initialValues, update, onFormSubmitHandler, location } = props;
  const [incomeCategoryOpen, setIncomeCategoryOpen] = useState(false);

  const userRevenueCategories = useSelector(
    (state) => state.user.user.revenueCategories
  );

  const closeIncomeCategDialog = () => {
    setIncomeCategoryOpen(false);
  };

  const { handleSubmit, control, errors, reset, setValue } = useForm();
  const initialDate = moment().format();

  const onSubmit = (data) => {
    //console.log('Revenue', data);
    const dataToDispatch = {
      ...data,
      transactionDate: toISOFormat(data.transactionDate),
      type: 'revenue',
      categoryValue: slugify(data.categoryName),
      added: true,
      id: update ? initialValues.id : Date.now(),
    };

    if (location === null) {
      dispatch(addRevenueCategory(dataToDispatch));
    } else if (location === 'home' && !update) {
      dispatch(addIncomeCategory(dataToDispatch));
    } else if (location === 'home' && update) {
      dispatch(
        updateIncomeCategory({
          ...dataToDispatch,
          categoryId: initialValues.categoryId,
        })
      );
    }
    //Close Popup
    onFormSubmitHandler();
  };

  const onListClickHandler = (value) => {
    //console.log('OnClick', value);
    setValue('categoryName', value, {
      shouldDirty: true,
    });
    setIncomeCategoryOpen(false);
  };

  useEffect(() => {
    //console.log('Initial: ', initialValues, update);
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
              label="Income Category"
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
          onClick={() => setIncomeCategoryOpen(true)}
          className="cm-form-dialog-trigger"
        >
          <CategoryIcon />
        </IconButton>
      </div>
      {/* Select Income Category Dialog */}
      <FormDialog
        dialogTitle="Select Income Category"
        dialogOpenHandler={incomeCategoryOpen}
        dialogCloseHandler={closeIncomeCategDialog}
        dialogSize="xs"
      >
        <CategoryList
          onListClickHandler={onListClickHandler}
          listOfCategories={{
            'Your Income Categories': userRevenueCategories,
            'Default Income Categories': addIncomeCategories,
          }}
        />
      </FormDialog>
      <div className="cm-form-field-half">
        <div className="cm-form-field">
          <Controller
            as={
              <TextField
                label="Income Amount"
                type="number"
                error={!!errors.categoryAmount}
                helperText="Ex: Salary"
              />
            }
            name="categoryAmount"
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
          {update ? 'Update' : 'Add'} Income
        </ButtonWrapper>
      </div>
    </form>
  );
};

AddRevenue.defaultProps = {
  update: false,
  location: null,
  onFormSubmitHandler: () => {},
};

export default AddRevenue;
