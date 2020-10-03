import { revenueTypes } from './revenue.types';

export const addRevenue = (data) => ({
  type: revenueTypes.ADD_REVENUE,
  payload: data,
});

export const deleteRevenue = (id) => ({
  type: revenueTypes.DELETE_REVENUE,
  payload: id,
});
