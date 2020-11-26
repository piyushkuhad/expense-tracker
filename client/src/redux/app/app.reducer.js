import { appTypes } from './app.types';
import moment from 'moment';
import { userTypes } from '../user/user.types';

const INITIAL_STATE = {
  dateFilter: {
    startDate: new Date(moment().startOf('month')).toISOString(),
    endDate: new Date(moment().endOf('month')).toISOString(),
  },
  info: {
    message: null,
    infoType: null,
  },
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case appTypes.DATE_FILTER:
      return {
        ...state,
        dateFilter: {
          startDate: action.payload.startDate.toISOString(),
          endDate: action.payload.endDate.toISOString(),
        },
      };

    case appTypes.INFO_SUCCESS:
      return {
        ...state,
        info: {
          message: action.payload,
          infoType: 'success',
        },
      };

    case appTypes.INFO_ERROR:
      return {
        ...state,
        info: {
          message: action.payload,
          infoType: 'error',
        },
      };

    case appTypes.INFO_RESET:
      return {
        ...state,
        info: {
          message: null,
          infoType: null,
        },
      };

    case userTypes.LOGOUT:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default appReducer;
