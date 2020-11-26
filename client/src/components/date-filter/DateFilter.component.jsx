import React from 'react';
import moment from 'moment';

import DatePickerRange from '../date-picker/DatePickerRange.component';

const DateFilter = () => {
  const startOfMonth = new Date(moment().startOf('month'));
  const endOfMonth = new Date(moment().endOf('month'));

  return (
    <div className="cm-date-filter-container">
      <DatePickerRange startVal1={startOfMonth} startVal2={endOfMonth} />
    </div>
  );
};

export default DateFilter;
