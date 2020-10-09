import { budgetTypes } from './budget.types';
import {
  revenueCatgoriesDefault,
  expenseCatgoriesDefault,
} from '../../assets/dev-data/mainData';
import { chkUniqueCategory, deleteCategory } from '../reducer.utils';

const INITIAL_STATE = {
  createBudgetData: {
    budgetData: {
      // budgetName: '',
      // budgetStartDate: undefined,
      // budgetEndDate: undefined,
    },
    revenueCategories: [...revenueCatgoriesDefault],
    expenseCategories: [...expenseCatgoriesDefault],
  },
  selectedBudget: null,
};

const createBudgetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case budgetTypes.CREATE_BUDGET:
      return {
        ...state,
        createBudgetData: {
          ...state.createBudgetData,
          budgetData: action.payload,
        },
      };

    case budgetTypes.ADD_REVENUE_CATEGORY:
      return {
        ...state,
        createBudgetData: {
          ...state.createBudgetData,
          revenueCategories: chkUniqueCategory(
            state.createBudgetData.revenueCategories,
            action.payload,
            'categoryValue'
          ),
        },
      };

    case budgetTypes.DELETE_REVENUE_CATEGORY:
      return {
        ...state,
        createBudgetData: {
          ...state.createBudgetData,
          revenueCategories: deleteCategory(
            state.createBudgetData.revenueCategories,
            action.payload
          ),
        },
      };

    case budgetTypes.ADD_EXPENSE_CATEGORY:
      return {
        ...state,
        createBudgetData: {
          ...state.createBudgetData,
          expenseCategories: chkUniqueCategory(
            state.createBudgetData.expenseCategories,
            action.payload,
            'categoryValue'
          ),
        },
      };

    case budgetTypes.DELETE_EXPENSE_CATEGORY:
      return {
        ...state,
        createBudgetData: {
          ...state.createBudgetData,
          expenseCategories: deleteCategory(
            state.createBudgetData.expenseCategories,
            action.payload
          ),
        },
      };

    case budgetTypes.CREATE_BUDGET_REQUEST:
      return {
        ...state,
        selectedBudget: { ...action.payload },
      };

    default:
      return state;
  }
};

export default createBudgetReducer;
