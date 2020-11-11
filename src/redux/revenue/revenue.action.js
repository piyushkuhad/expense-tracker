import axios from 'axios';

import { getReqOptions } from '../../utils/apiInfo';
import { budgetTypes } from '../budget/budget.types';
import { revenueTypes } from './revenue.types';

export const addRevenue = (data) => ({
  type: revenueTypes.ADD_REVENUE,
  payload: data,
});

// export const deleteRevenue = (id) => ({
//   type: revenueTypes.DELETE_REVENUE,
//   payload: id,
// });

export const addIncomeCategory = (data) => async (dispatch, getState) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const dataToSend = { categoryData: data };

    const idString = `${budgetId}/category/revenue`;

    const res = await axios.post(
      `http://127.0.0.1:4000/api/v1/budget/${idString}`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('addIncomeCategory Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
  }
};

export const updateIncomeCategory = (data) => async (dispatch, getState) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const dataToSend = { categoryData: data };

    const idString = `${budgetId}/category/revenue/${categoryId}`;

    const res = await axios.patch(
      `http://127.0.0.1:4000/api/v1/budget/${idString}`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('updateIncomeCategory Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
  }
};

export const deleteIncomeCategory = (data) => async (
  dispatch,
  getState
) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const idString = `${budgetId}/category/revenue/${categoryId}`;

    const res = await axios.delete(
      `http://127.0.0.1:4000/api/v1/budget/${idString}`,
      getReqOptions(_tk)
    );

    console.log('Response deleteIncomeCategory', res);

    if (res.data.data.data === null && res.data.data.status === 'success') {
      dispatch({
        type: budgetTypes.DELETE_INCOME_CATEGORY,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
  }
};
