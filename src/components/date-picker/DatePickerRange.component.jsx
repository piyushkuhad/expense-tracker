import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerRange = ({ startVal1, startVal2 }) => {
  const [startDate, setStartDate] = useState(startVal1);
  const [endDate, setEndDate] = useState(startVal2);
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
    </>
  );
};

DatePickerRange.defaultProps = {
  startVal1: moment('dd/MM/yyyy'),
  startVal2: moment('dd/MM/yyyy').add(1, 'days'),
};

export default DatePickerRange;
