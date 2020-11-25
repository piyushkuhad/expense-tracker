import { dialogFormTypes } from './dialog-form.types';

export const deleteBudgetDialog = (data) => ({
  type: dialogFormTypes.DELETE_BUDGET_DIALOG,
  payload: data,
});

export const updateExpenseCategoryDialog = (data) => ({
  type: dialogFormTypes.UPDATE_EXPENSE_CATEGORY_DIALOG,
  payload: data,
});

export const deleteExpenseCategoryDialog = (data) => ({
  type: dialogFormTypes.DELETE_EXPENSE_CATEGORY_DIALOG,
  payload: data,
});

export const addExpenseSubCategoryDialog = (data) => ({
  type: dialogFormTypes.ADD_EXPENSE_SUB_CATEGORY_DIALOG,
  payload: data,
});

export const updateExpenseSubCategoryDialog = (data) => ({
  type: dialogFormTypes.UPDATE_EXPENSE_SUB_CATEGORY_DIALOG,
  payload: data,
});

export const deleteExpenseSubCategoryDialog = (data) => ({
  type: dialogFormTypes.DELETE_EXPENSE_SUB_CATEGORY_DIALOG,
  payload: data,
});

export const updateIncomeCategoryDialog = (data) => ({
  type: dialogFormTypes.UPDATE_INCOME_CATEGORY_DIALOG,
  payload: data,
});

export const deleteIncomeCategoryDialog = (data) => ({
  type: dialogFormTypes.DELETE_INCOME_CATEGORY_DIALOG,
  payload: data,
});

export const closeDialog = () => ({
  type: dialogFormTypes.CLOSE_DIALOG,
});
