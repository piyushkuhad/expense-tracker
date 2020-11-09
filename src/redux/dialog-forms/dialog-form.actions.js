import { dialogFormTypes } from './dialog-form.types';

export const updateExpenseSubCategoryDialog = (data) => ({
  type: dialogFormTypes.UPDATE_EXPENSE_SUB_CATEGORY_DIALOG,
  payload: data,
});

export const addExpenseSubCategoryDialog = (data) => ({
  type: dialogFormTypes.ADD_EXPENSE_SUB_CATEGORY_DIALOG,
  payload: data,
});

export const deleteExpenseSubCategoryDialog = (data) => ({
  type: dialogFormTypes.DELETE_EXPENSE_SUB_CATEGORY_DIALOG,
  payload: data,
});

export const closeDialog = () => ({
  type: dialogFormTypes.CLOSE_DIALOG,
});
