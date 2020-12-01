import axios from 'axios';

import { budgetTypes } from './budget.types';
import { api_url, getReqOptions } from '../../utils/apiInfo';
import history from '../../history';
import { loaderStop } from '../../utils/utilFn';
import { appTypes } from '../app/app.types';
import { userTypes } from '../user/user.types';

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
        `${api_url}/api/v1/budget/${budgetId}`,
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
  const query = queryParam === undefined ? '' : `?fields=${queryParam}`;
  try {
    const res = await axios.get(
      `${api_url}/api/v1/budget${query}`,
      getReqOptions(_tk)
    );

    console.log('Data: ', res);

    //Check if no budget then push to create-budget
    if (res.data.data.data.length === 0) {
      history.push('/create-budget');
    }

    loaderStop(dispatch);

    if (queryParam) {
      dispatch({
        type: budgetTypes.GET_ALL_BUDGET_PARAM,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: budgetTypes.GET_ALL_BUDGET,
        payload: res.data.data,
      });
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    if (err.response.data.message === 'The user no longer exists') {
      dispatch({
        type: appTypes.INFO_ERROR,
        payload: err.response.data.message,
      });

      setTimeout(
        () =>
          dispatch({
            type: userTypes.LOGOUT,
          }),
        5000
      );
      loaderStop(dispatch);
    }
  }
};

export const createBudgetRequest = (budgetData, isCopy) => async (
  dispatch,
  getState
) => {
  try {
    const _tk = getState().user._atk;

    let dataToSend = {};

    if (!budgetData && !isCopy) {
      const { createBudgetData } = getState().budget;

      const filterCategory = (data) => {
        const filteredData = data.filter((el) => el.added === true);
        return filteredData === undefined ? [] : filteredData;
      };

      dataToSend = {
        ...createBudgetData,
        revenueCategories: filterCategory(createBudgetData.revenueCategories),
        expenseCategories: filterCategory(createBudgetData.expenseCategories),
      };
    } else if (budgetData && isCopy) {
      dataToSend = {
        ...budgetData,
      };
    } else {
      loaderStop(dispatch);
      throw new Error('Invalid data. Unable to the create budget');
    }

    const res = await axios.post(
      `${api_url}/api/v1/budget`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('createBudgetRequest Response', res);

    dispatch({
      type: budgetTypes.CREATE_BUDGET_REQUEST,
      payload: res.data.data,
    });

    if (res.data.data.status === 'success') {
      loaderStop(dispatch);
      history.push('/');
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const deleteBudget = (budgetId) => async (dispatch, getState) => {
  try {
    const _tk = getState().user._atk;
    const res = await axios.delete(
      `${api_url}/api/v1/budget/${budgetId}`,
      getReqOptions(_tk)
    );

    console.log('deleteBudget Response', res);

    if (res.data.data.data === null && res.data.data.status === 'success') {
      loaderStop(dispatch);
      dispatch({
        type: budgetTypes.DELETE_BUDGET,
        payload: budgetId,
      });
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const clearCreateBudget = () => ({
  type: budgetTypes.CLEAR_CREATE_BUDGET,
});

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
