import { expenseTypes } from './expense.types';
import { addToList, deleteFromList } from '../reducer.utils';

const INITIAL_STATE = {
  expenseData: [],
};

const expenceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case expenseTypes.ADD_EXPENSE:
      return {
        ...state,
        expenseData: addToList(state.expenseData, action.payload),
      };

    case expenseTypes.DELETE_EXPENSE:
      return {
        ...state,
        expenseData: deleteFromList(state.expenseData, action.payload),
      };

    default:
      return state;
  }
};

export default expenceReducer;
