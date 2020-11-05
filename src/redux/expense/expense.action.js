import axios from 'axios';
import { getReqOptions } from '../../utils/apiInfo';
//import { expenseTypes } from './expense.types';
import { budgetTypes } from '../budget/budget.types';

// export const addExpense = (data) => ({
//   type: expenseTypes.ADD_EXPENSE,
//   payload: data,
// });

// export const deleteExpense = (id) => ({
//   type: expenseTypes.DELETE_EXPENSE,
//   payload: id,
// });

export const updateExpenseSubCategory = (data) => async (
  dispatch,
  getState
) => {
  try {
    console.log(data);
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    let idString = `${budgetId}/subcategory/${categoryId}`;

    if (data.id) {
      idString = `${budgetId}/subcategory/${categoryId}/${data.id}`;
    }
    console.log('idString', idString);

    const res = await axios.patch(
      `http://127.0.0.1:4000/api/v1/budget/${idString}`,
      data,
      getReqOptions(_tk)
    );

    console.log('Sub Category Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
  }
};

export const addExpenseSubCategory = (data) => async (dispatch, getState) => {
  try {
    const _tk = getState().user._atk;
    const budgetId = getState().budget.selectedBudget._id;
    const categoryId = data.categoryId;
    const idString = `${budgetId}/subcategory/${categoryId}`;

    const dataToSend = { categoryData: [data] };
    // console.log('addExpenseSubCategory', dataToSend, idString);

    const res = await axios.post(
      `http://127.0.0.1:4000/api/v1/budget/${idString}`,
      dataToSend,
      getReqOptions(_tk)
    );

    console.log('Sub Category Response', res);

    dispatch({
      type: budgetTypes.SELECTED_BUDGET,
      payload: res.data.data.data,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
  }
};
