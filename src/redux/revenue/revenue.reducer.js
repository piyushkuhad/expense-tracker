import { revenueTypes } from './revenue.types';
import { addToList, deleteFromList } from './revenue.utils';

const INITIAL_STATE = {
  revenueData: [],
};

const revenueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case revenueTypes.ADD_REVENUE:
      return {
        ...state,
        revenueData: addToList(state.revenueData, action.payload),
      };
    case revenueTypes.DELETE_REVENUE:
      return {
        ...state,
        revenueData: deleteFromList(state.revenueData, action.payload),
      };
    default:
      return state;
  }
};

export default revenueReducer;
