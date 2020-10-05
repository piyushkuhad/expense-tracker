import { revenueTypes } from './revenue.types';
import { addToList, deleteFromList } from '../reducer.utils';
//import { filteredDateList } from '../../utils/dateMethods';

const INITIAL_STATE = {
  revenueData: [],
  // renderedRevenue: [],
  // totalRevenue: 0,
};

const revenueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case revenueTypes.ADD_REVENUE:
      return {
        ...state,
        revenueData: addToList(state.revenueData, action.payload),
        // renderedRevenue: filteredDateList(
        //   state.revenueData,
        //   action.payload.startDate,
        //   action.payload.endDate
        // ),
        // totalRevenue: getTotal(state.renderedRevenue),
      };
    case revenueTypes.DELETE_REVENUE:
      return {
        ...state,
        revenueData: deleteFromList(state.revenueData, action.payload),
        // renderedRevenue: filteredDateList(
        //   state.revenueData,
        //   action.payload.startDate,
        //   action.payload.endDate
        // ),
        // totalRevenue: getTotal(state.renderedRevenue),
      };
    default:
      return state;
  }
};

export default revenueReducer;
