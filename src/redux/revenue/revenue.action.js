import { revenueTypes } from './revenue.types';

export const addRevenue = (data) => ({
  type: revenueTypes.ADD_REVENUE,
  payload: data,
});
