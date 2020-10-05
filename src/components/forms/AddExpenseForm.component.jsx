import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DatePickerSingle from '../date-picker/DatePickerSingle.component';
import { addExpense } from '../../redux/expense/expense.action';

import './form.styles.scss';
import history from '../../history';
import CategAndSubCateg from '../categ-and-subcateg/CategAndSubCateg.component';
import { expenseCategory } from '../../assets/dev-data/expenseCategory';

const AddExpenseForm = (props) => {
  let { update } = props;

  const updateId = props.match.params.id;

  const { register, handleSubmit, control, reset } = useForm();

  const expenseData = useSelector((state) => state.expense.expenseData);

  const formDefaultValue =
    updateId !== undefined
      ? expenseData.filter((el) => el.id === +updateId)[0]
      : {};

  update = formDefaultValue.category ? true : false;

  useEffect(() => {
    reset(formDefaultValue);
    // eslint-disable-next-line
  }, [reset]);

  const dispatch = useDispatch();

  const startDate = new Date();

  const onSubmit = (data) => {
    if (!update) {
      data.date = data.date.toISOString();
    }

    const id = update ? +updateId : Date.now();
    const formData = { ...data, id, type: 'expense' };
    dispatch(addExpense(formData));

    history.push('/');
  };

  return (
    <form
      className="cm-main-form-container cm-add-expense-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="cm-form-field">
        <label>Expense Name</label>
        <input type="text" name="name" ref={register} />
      </div>
      <div className="cm-form-field">
        <label>Amount</label>
        <input type="number" name="amount" ref={register} />
      </div>
      <div className="cm-form-field">
        <label>Category</label>
        <Controller
          control={control}
          name="category"
          defaultValue={update ? formDefaultValue.category : null}
          render={({ onChange, onBlur, value }) => (
            <CategAndSubCateg
              selectData={expenseCategory}
              onChange={onChange}
              onBlur={onBlur}
              selected={update ? formDefaultValue.category : value}
              update={update}
            />
          )}
        />
      </div>
      <div className="cm-form-field">
        <label>Date</label>
        <Controller
          control={control}
          name="date"
          defaultValue={update ? new Date(formDefaultValue.date) : startDate}
          render={({ onChange, onBlur, value }) => (
            <DatePickerSingle
              onChange={onChange}
              onBlur={onBlur}
              startVal={update ? new Date(formDefaultValue.date) : startDate}
              selected={value}
            />
          )}
        />
      </div>
      <div className="cm-form-field">
        <label>Note (Optional)</label>
        <textarea name="note" ref={register} />
      </div>
      <div className="cm-form-field">
        <input type="submit" className="cm-btn-primary" />
      </div>
    </form>
  );
};

AddExpenseForm.defaultProps = {
  update: false,
};

export default AddExpenseForm;
