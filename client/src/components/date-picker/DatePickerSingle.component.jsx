import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerSingle = (props) => {
  const [startDate, setStartDate] = useState(props.startVal);

  const handleChange = (date) => {
    props.onChange(date);
    setStartDate(date);
  };

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={handleChange}
    />
  );
};

DatePickerSingle.defaultProps = {
  startVal: new Date(),
};

export default DatePickerSingle;
