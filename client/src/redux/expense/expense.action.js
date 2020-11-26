import axios from 'axios';

import { api_url, getReqOptions } from '../../utils/apiInfo';
import { loaderStop } from '../../utils/utilFn';
import { budgetTypes } from '../budget/budget.types';

// export const addExpense = (data) => ({
//   type: expenseTypes.ADD_EXPENSE,
//   payload: data,
// });

// export const deleteExpense = (id) => ({
//   type: expenseTypes.DELETE_EXPENSE,
//   payload: id,
// });

export const addExpenseCategory = (data) => async (dispatch, getState) => {
  try {
    //console.log('addExpenseCategory Data', data);
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const dataToSend = { categoryData: data };

    const idString = `${budgetId}/category/expense`;

    const res = await axios.post(
      `${api_url}/api/v1/budget/${idString}`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('addExpenseCategory Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
    loaderStop(dispatch);
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const deleteExpenseCategory = (data) => async (dispatch, getState) => {
  try {
    console.log('deleteExpenseCategory', data);
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const idString = `${budgetId}/category/expense/${categoryId}`;

    const res = await axios.delete(
      `${api_url}/api/v1/budget/${idString}`,
      getReqOptions(_tk)
    );

    console.log('deleteExpenseCategory Response', res);

    if (res.data.data.data === null && res.data.data.status === 'success') {
      loaderStop(dispatch);
      dispatch({
        type: budgetTypes.DELETE_EXPENSE_CATEGORY_API,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const updateExpenseCategory = (data) => async (dispatch, getState) => {
  try {
    //console.log(data);
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const dataToSend = { categoryData: data };

    const idString = `${budgetId}/category/expense/${categoryId}`;

    const res = await axios.patch(
      `${api_url}/api/v1/budget/${idString}`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('updateExpenseCategory Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
    loaderStop(dispatch);
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const updateExpenseSubCategory = (data) => async (
  dispatch,
  getState
) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    let idString = `${budgetId}/subcategory/${categoryId}`;

    if (data.id) {
      idString = `${budgetId}/subcategory/${categoryId}/${data.id}`;
    }
    console.log('idString', idString);

    const res = await axios.patch(
      `${api_url}/api/v1/budget/${idString}`,
      data,
      getReqOptions(_tk)
    );

    console.log('Sub Category Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
    loaderStop(dispatch);
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const addExpenseSubCategory = (data) => async (dispatch, getState) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const idString = `${budgetId}/subcategory/${categoryId}`;

    const dataToSend = { categoryData: [data] };
    console.log('addExpenseSubCategory', dataToSend, idString);

    const res = await axios.post(
      `${api_url}/api/v1/budget/${idString}`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('Sub Category Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
    loaderStop(dispatch);
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};

export const deleteExpenseSubCategory = (data) => async (
  dispatch,
  getState
) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const subCategoryId = data._id;
    const idString = `${budgetId}/subcategory/${categoryId}/${subCategoryId}`;

    //console.log('deleteExpenseSubCategory', data, idString);

    const res = await axios.delete(
      `${api_url}/api/v1/budget/${idString}`,
      getReqOptions(_tk)
    );

    console.log('Response deleteExpenseSubCategory', res);

    if (res.data.data.data === null && res.data.data.status === 'success') {
      dispatch({
        type: budgetTypes.DELETE_EXPENSE_SUB_CATEGORY,
        payload: data,
      });
      loaderStop(dispatch);
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    loaderStop(dispatch);
  }
};
