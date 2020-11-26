import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

import { DateTimePicker } from '@material-ui/pickers';
import { toISOFormat } from '../../utils/dateMethods';

const NewDatePickerRange = (props) => {
  const { startVal, endVal } = props.showDates;

  const [selectedDate1, setSelectedDate1] = useState(startVal);
  const [selectedDate2, setSelectedDate2] = useState(endVal);

  const handleDateChange1 = (date) => {
    props.dateChangeHandler.onChange({
      startVal: toISOFormat(date),
      endVal: toISOFormat(selectedDate2),
    });
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    props.dateChangeHandler.onChange({
      startVal: toISOFormat(selectedDate1),
      endVal: toISOFormat(date),
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="cm-form-field">
        <DateTimePicker
          allowKeyboardControl={false}
          value={selectedDate1}
          onChange={handleDateChange1}
          label={props.startLabel}
          format="dd MMMM, yyyy hh:mm a"
        />
      </div>
      <div className="cm-form-field">
        <DateTimePicker
          allowKeyboardControl={false}
          value={selectedDate2}
          onChange={handleDateChange2}
          label={props.endLabel}
          minDate={moment(selectedDate1).add(1, 'days')}
          format="dd MMMM, yyyy hh:mm a"
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

NewDatePickerRange.defaultProps = {
  showDates: {
    startVal: moment().format(),
    endVal: moment().add(1, 'days').format(),
  },
  startLabel: 'Start Date',
  endLabel: 'End Date',
};

export default NewDatePickerRange;
