import { appTypes } from './app.types';

export const dateFilter = (dateObj) => ({
  type: appTypes.DATE_FILTER,
  payload: dateObj,
});
