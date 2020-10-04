import { expenseTypes } from './expense.types';

export const addExpense = (data) => ({
  type: expenseTypes.ADD_EXPENSE,
  payload: data,
});

export const deleteExpense = (id) => ({
  type: expenseTypes.DELETE_EXPENSE,
  payload: id,
});
