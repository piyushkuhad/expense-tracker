import { appTypes } from './app.types';
import moment from 'moment';

const INITIAL_STATE = {
  startDate: new Date(moment().startOf('month')).toISOString(),
  endDate: new Date(moment().endOf('month')).toISOString(),
};

const dateFilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case appTypes.DATE_FILTER:
      return {
        ...state,
        startDate: action.payload.startDate.toISOString(),
        endDate: action.payload.endDate.toISOString(),
      };
    default:
      return state;
  }
};

export default dateFilterReducer;
