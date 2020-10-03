import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DatePickerSingle from '../date-picker/DatePickerSingle.component';
import { addRevenue } from '../../redux/revenue/revenue.action';

import './form.styles.scss';
import history from '../../history';
import CategAndSubCateg from '../categ-and-subcateg/CategAndSubCateg.component';
import { revenueCategory } from '../../assets/dev-data/revenueCategory';

const AddRevenueForm = (props) => {
  let { update } = props;

  const updateId = props.match.params.id;

  const { register, handleSubmit, control, reset } = useForm();

  const revenueData = useSelector((state) => state.revenue.revenueData);

  const formDefaultValue =
    updateId !== undefined
      ? revenueData.filter((el) => el.id === +updateId)[0]
      : {};

  update = formDefaultValue.revenueCategory ? true : false;

  useEffect(() => {
    reset(formDefaultValue);
  }, [reset]);

  const dispatch = useDispatch();

  const startDate = new Date();

  const onSubmit = (data) => {
    if (!update) {
      data.revenueDate = data.revenueDate.toISOString();
    }

    const id = update ? +updateId : Date.now();
    const formData = { ...data, id };
    dispatch(addRevenue(formData));

    history.push('/');
  };

  return (
    <form
      className="cm-main-form-container cm-add-revenue-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="cm-form-field">
        <label>Revenue Name</label>
        <input type="text" name="revenueName" ref={register} />
      </div>
      <div className="cm-form-field">
        <label>Amount</label>
        <input type="number" name="revenueAmt" ref={register} />
      </div>
      <div className="cm-form-field">
        <label>Category</label>
        <Controller
          control={control}
          name="revenueCategory"
          defaultValue={update ? formDefaultValue.revenueCategory : null}
          render={({ onChange, onBlur, value }) => (
            <CategAndSubCateg
              selectData={revenueCategory}
              onChange={onChange}
              onBlur={onBlur}
              selected={update ? formDefaultValue.revenueCategory : value}
              update={update}
            />
          )}
        />
      </div>
      <div className="cm-form-field">
        <label>Date</label>
        <Controller
          control={control}
          name="revenueDate"
          defaultValue={startDate}
          render={({ onChange, onBlur, value }) => (
            <DatePickerSingle
              onChange={onChange}
              onBlur={onBlur}
              startVal={startDate}
              selected={value}
            />
          )}
        />
      </div>
      <div className="cm-form-field">
        <label>Note (Optional)</label>
        <textarea name="revenueNote" ref={register} />
      </div>
      <div className="cm-form-field">
        <input type="submit" className="cm-btn-primary" />
      </div>
    </form>
  );
};

AddRevenueForm.defaultProps = {
  update: false,
};

export default AddRevenueForm;
