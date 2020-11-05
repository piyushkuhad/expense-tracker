import { dialogFormTypes } from './dialog-form.types';

export const updateExpenseSubCategoryDialog = (data) => {
  //console.log('Data', data);
  return {
    type: dialogFormTypes.UPDATE_EXPENSE_SUB_CATEGORY_DIALOG,
    payload: data,
  };
};

export const addExpenseSubCategoryDialog = (data) => {
  return {
    type: dialogFormTypes.ADD_EXPENSE_SUB_CATEGORY_DIALOG,
    payload: data,
  };
};

export const closeDialog = () => ({
  type: dialogFormTypes.CLOSE_DIALOG,
});
