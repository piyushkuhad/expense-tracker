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
  deleteMainCategory,
  deleteSubCategory,
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

    case budgetTypes.DELETE_EXPENSE_SUB_CATEGORY:
      const updatedSelectedBudgetSubCat = deleteSubCategory(
        state.selectedBudget,
        action.payload.categoryId,
        action.payload._id
      );

      //console.log('updatedSelectedBudgetSubCat', updatedSelectedBudgetSubCat);

      return {
        ...state,
        selectedBudget: {
          ...updatedSelectedBudgetSubCat,
          revenueTotal: calcTotal(
            updatedSelectedBudgetSubCat.revenueData,
            'categoryAmount'
          ),
          expenseTotal: calcTotalExpense(
            updatedSelectedBudgetSubCat.expenseData
          ),
        },
      };

    case budgetTypes.DELETE_INCOME_CATEGORY:
      const updatedSelectedBudgetIncome = deleteMainCategory(
        state.selectedBudget,
        'revenue',
        action.payload.categoryId
      );

      console.log('updatedSelectedBudgetIncome', updatedSelectedBudgetIncome);

      return {
        ...state,
        selectedBudget: {
          ...updatedSelectedBudgetIncome,
          revenueTotal: calcTotal(
            updatedSelectedBudgetIncome.revenueData,
            'categoryAmount'
          ),
          expenseTotal: calcTotalExpense(
            updatedSelectedBudgetIncome.expenseData
          ),
        },
      };

    case userTypes.LOGOUT:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default createBudgetReducer;
