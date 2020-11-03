import axios from 'axios';

import { budgetTypes } from './budget.types';
import api from '../../utils/apiInfo';
import history from '../../history';

const getReqOptions = (tk) => ({
  headers: {
    Authorization: `Bearer ${tk}`,
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const createBudget = (data) => ({
  type: budgetTypes.CREATE_BUDGET,
  payload: data,
});

export const getBudget = (budgetId) => (dispatch, getState) => {};

export const selectedBudget = (budgetId) => async (dispatch, getState) => {
  try {
    const budgetData = getState().budget.budgetData;
    const budgetIndex = budgetData.findIndex((el) => el._id === budgetId);

    if (budgetIndex !== -1) {
      dispatch({
        type: budgetTypes.SELECTED_BUDGET,
        payload: budgetData[budgetIndex],
      });
    } else {
      const _tk = getState().user._atk;
      const res = await axios.get(
        `http://127.0.0.1:4000/api/v1/budget/${budgetId}`,
        getReqOptions(_tk)
      );

      //console.log('Selected:', res.data.data.data);

      dispatch({
        type: budgetTypes.SELECTED_BUDGET,
        payload: res.data.data.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllBudgets = (queryParam) => async (dispatch, getState) => {
  const _tk = getState().user._atk;
  try {
    const res = await axios.get(
      `http://127.0.0.1:4000/api/v1/budget?fields=${queryParam}`,
      getReqOptions(_tk)
    );

    //console.log('Data: ', res);

    dispatch({
      type: budgetTypes.GET_ALL_BUDGET,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
  }
};

export const createBudgetRequest = () => async (dispatch, getState) => {
  const { createBudgetData } = getState().budget;
  //console.log('Launch Set', createBudgetData);

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
