import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { daysBetween } from '../../utils/dateMethods';
import 'react-datepicker/dist/react-datepicker.css';
import Snackbar from '../snackbar/Snackbar.component';
import { dateFilter } from '../../redux/app/app.action';

const DatePickerRange = ({ startVal1, startVal2 }) => {
  const [startDate, setStartDate] = useState(startVal1);
  const [endDate, setEndDate] = useState(startVal2);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const daysDiff = daysBetween(startDate, endDate);
    if (daysDiff > 60) {
      setError(true);
    } else {
      dispatch(dateFilter({ startDate, endDate }));
    }

    return () => {
      setTimeout(() => {
        setError(false);
      }, 3000);
    };
  }, [startDate, endDate]);

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      {error ? (
        <Snackbar
          type="error"
          message="Date Range should not be more than 60 days."
        />
      ) : null}
    </>
  );
};

DatePickerRange.defaultProps = {
  startVal1: new Date(moment()),
  startVal2: new Date(moment().add(1, 'days')), //moment('dd/MM/yyyy').add(1, 'days')
};

export default DatePickerRange;
