import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';

import './form.styles.scss';
import ButtonWrapper from '../button/ButtonWrapper.component';
import NewDatePicker from '../date-picker/NewDatePicker.component';
import CategoryList from '../category-list/CategoryList.component';
import { payerData, accountData } from '../../assets/dev-data/mainData';
import {
  addExpenseSubCategory,
  updateExpenseSubCategory,
} from '../../redux/expense/expense.action';
import { closeDialog } from '../../redux/dialog-forms/dialog-form.actions';
import { loaderStart } from '../../utils/utilFn';
import FormDialog from './form-dialog/FormDialog.component';

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

  const { handleSubmit, control, errors, setValue, reset } = useForm();

  //const { initialValues, update, onFormSubmitHandler } = props;
  const [expenseCategoryOpen, setExpenseCategoryOpen] = useState(false);

  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.forms);

  const userExpenseCategories = useSelector(
    (state) => state.user.user.expenseCategories
  );

  //const userSubCategoryList = {};
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [userSubCategoryList, setUserSubCategoryList] = useState({});

  //Arrange Array with Subcategory
  useEffect(() => {
    const resultSubCat = {};

    //Filter sub categories of selected expense
    const filtered = userExpenseCategories.filter(
      (el) => el.categoryName === formValues.formData.categoryName
    );

    //creating object for CategoryList component
    if (filtered.length > 0) {
      resultSubCat[
        formValues.formData.categoryName
      ] = filtered[0].subCategory.map((subItem) => ({
        categoryName: subItem.subCategoryName,
        categoryValue: subItem.subCategoryValue,
        _id: subItem._id,
      }));
    }

    //console.log('filtered', resultSubCat);

    setUserSubCategoryList(resultSubCat);

    // userExpenseCategories.forEach((el) => {
    //   if (el.subCategory.length > 0) {
    //     //Changing subCategoryName key to categoryName in sub category array
    //     resultSubCat[el.categoryName] = el.subCategory.map((subItem) => ({
    //       categoryName: subItem.subCategoryName,
    //       categoryValue: subItem.subCategoryValue,
    //       _id: subItem._id,
    //     }));
    //   }
    //   setUserSubCategoryList(resultSubCat);
    // });

    // eslint-disable-next-line
  }, [userExpenseCategories]);

  //Show/Hide category list dropdown based on availability of Sub Categories
  useEffect(() => {
    (!userSubCategoryList || userSubCategoryList !== {}) &&
    !!userSubCategoryList[formValues.formData.categoryName]
      ? setShowSubCategory(true)
      : setShowSubCategory(false);
  }, [userSubCategoryList]);

  const closeExpenseCategDialog = () => {
    setExpenseCategoryOpen(false);
  };

  const onListClickHandler = (value) => {
    //console.log('OnClick', value);
    setValue('subCategoryName', value, {
      shouldDirty: true,
    });
    setExpenseCategoryOpen(false);
  };

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
      <div className="cm-form-field cm-form-dialog-trigger-wrapper">
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
        {showSubCategory ? (
          <IconButton
            aria-label="Select Sub Categories"
            onClick={() => setExpenseCategoryOpen(true)}
            className="cm-form-dialog-trigger"
          >
            <CategoryIcon />
          </IconButton>
        ) : null}
      </div>
      {/* Select Expense Category Dialog */}
      {showSubCategory ? (
        <FormDialog
          dialogTitle="Select Expense Sub Category"
          dialogOpenHandler={expenseCategoryOpen}
          dialogCloseHandler={closeExpenseCategDialog}
          dialogSize="xs"
        >
          <CategoryList
            onListClickHandler={onListClickHandler}
            listOfCategories={{
              [formValues.formData.categoryName]:
                userSubCategoryList[formValues.formData.categoryName],
              //...userSubCategoryList,
            }}
          />
        </FormDialog>
      ) : null}
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
