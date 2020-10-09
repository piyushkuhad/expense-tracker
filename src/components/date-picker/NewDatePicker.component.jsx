import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { DateTimePicker } from '@material-ui/pickers';
import { toISOFormat } from '../../utils/dateMethods';

const NewDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.startVal);

  //console.log(props.dateChangeHandler);

  const handleDateChange = (date) => {
    //console.log(toISOFormat(date));
    props.dateChangeHandler.onChange(toISOFormat(date));
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="cm-form-field">
        <DateTimePicker
          allowKeyboardControl={false}
          value={selectedDate}
          onChange={handleDateChange}
          label={props.label}
          format="dd MMMM, yyyy hh:mm a"
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

NewDatePicker.defaultProps = {
  startVal: new Date(),
};

export default NewDatePicker;
