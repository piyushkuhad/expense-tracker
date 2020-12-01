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
  updateBudgetData,
  deleteSubCategory,
  deleteBudget,
  addInFront,
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
        budgetData: action.payload.data,
      };

    case budgetTypes.GET_ALL_BUDGET_PARAM:
      return {
        ...state,
        budgetSnippetData: action.payload.data,
      };

    case budgetTypes.CLEAR_CREATE_BUDGET:
      return {
        ...state,
        createBudgetData: INITIAL_STATE.createBudgetData,
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
      const { _id, budgetName } = action.payload.data;
      return {
        ...state,
        budgetData: addInFront(state.budgetData, action.payload.data),
        budgetSnippetData: addInFront(state.budgetSnippetData, {
          _id,
          budgetName,
        }),
        selectedBudget: action.payload.data,
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

    case budgetTypes.DELETE_BUDGET:
      const updatedBudget = deleteBudget(state.budgetData, action.payload);
      const updatedBudgetSnippet = deleteBudget(
        state.budgetSnippetData,
        action.payload
      );

      return {
        ...state,
        budgetData: updatedBudget,
        budgetSnippetData: updatedBudgetSnippet,
      };

    case budgetTypes.DELETE_EXPENSE_SUB_CATEGORY:
      const updatedSelectedBudgetSubCat = deleteSubCategory(
        state.selectedBudget,
        action.payload.categoryId,
        action.payload._id
      );

      return {
        ...state,
        budgetData: updateBudgetData(
          state.budgetData,
          updatedSelectedBudgetSubCat
        ),
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

      return {
        ...state,
        budgetData: updateBudgetData(
          state.budgetData,
          updatedSelectedBudgetIncome
        ),
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

    case budgetTypes.DELETE_EXPENSE_CATEGORY_API:
      const updatedSelectedBudgetExpense = deleteMainCategory(
        state.selectedBudget,
        'expense',
        action.payload.categoryId
      );

      return {
        ...state,
        budgetData: updateBudgetData(
          state.budgetData,
          updatedSelectedBudgetExpense
        ),
        selectedBudget: {
          ...updatedSelectedBudgetExpense,
          revenueTotal: calcTotal(
            updatedSelectedBudgetExpense.revenueData,
            'categoryAmount'
          ),
          expenseTotal: calcTotalExpense(
            updatedSelectedBudgetExpense.expenseData
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
