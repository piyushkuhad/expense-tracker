import { budgetTypes } from './budget.types';
import api from '../../utils/apiInfo';
import history from '../../history';

export const createBudget = (data) => ({
  type: budgetTypes.CREATE_BUDGET,
  payload: data,
});

export const createBudgetRequest = () => async (dispatch, getState) => {
  const { createBudgetData } = getState().budget;
  console.log('Launch Set', createBudgetData);

  //const response = await api.post('/api/v1/budget', createBudgetData);

  const response = await fetch('http://127.0.0.1:4000/api/v1/budget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(createBudgetData),
  });

  const result = await response.json();

  dispatch({
    type: budgetTypes.CREATE_BUDGET_REQUEST,
    payload: result.data,
  });

  history.push('/budget');
};

export const addRevenueCategory = (data) => ({
  type: budgetTypes.ADD_REVENUE_CATEGORY,
  payload: data,
});

export const deleteRevenueCategory = (dataValue) => ({
  type: budgetTypes.DELETE_REVENUE_CATEGORY,
  payload: dataValue,
});

export const addExpenseCategory = (data) => ({
  type: budgetTypes.ADD_EXPENSE_CATEGORY,
  payload: data,
});

export const deleteExpenseCategory = (dataValue) => ({
  type: budgetTypes.DELETE_EXPENSE_CATEGORY,
  payload: dataValue,
});
