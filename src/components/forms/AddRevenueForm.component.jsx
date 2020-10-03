import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import DatePickerSingle from '../date-picker/DatePickerSingle.component';
import { addRevenue } from '../../redux/revenue/revenue.action';

import './form.styles.scss';

const AddRevenueForm = () => {
  const { register, handleSubmit, control } = useForm();

  const dispatch = useDispatch();

  const startDate = new Date();

  const onSubmit = (data) => {
    console.log(data);
    data.revenueDate = data.revenueDate.toISOString();
    const formData = { ...data, id: Date.now() };
    dispatch(addRevenue(formData));
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

export default AddRevenueForm;
