import { budgetTypes } from './budget.types';
import {
  revenueCatgoriesDefault,
  expenseCatgoriesDefault,
} from '../../assets/dev-data/mainData';
import {
  calcTotal,
  calcTotalExpense,
  chkUniqueCategory,
  deleteCategory,
} from '../reducer.utils';
import { userTypes } from '../user/user.types';

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
  selectedBudget: {},
  budgetSnippetData: [],
  budgetData: [],
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

    case budgetTypes.GET_ALL_BUDGET:
      return {
        ...state,
        budgetSnippetData: action.payload.data,
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

    case budgetTypes.SELECTED_BUDGET:
      return {
        ...state,
        budgetData: chkUniqueCategory(state.budgetData, action.payload, '_id'),
        selectedBudget: {
          ...action.payload,
          revenueTotal: calcTotal(action.payload.revenueData, 'categoryAmount'),
          expenseTotal: calcTotalExpense(action.payload.expenseData),
        },
      };

    case userTypes.LOGOUT:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default createBudgetReducer;
