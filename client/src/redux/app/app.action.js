import { appTypes } from './app.types';

export const dateFilter = (dateObj) => ({
  type: appTypes.DATE_FILTER,
  payload: dateObj,
});

export const loaderActive = (status) => ({
  type: appTypes.LOADER_START,
  payload: status,
});

export const loaderInActive = (status) => ({
  type: appTypes.LOADER_STOP,
  payload: status,
});

export const showError = (data) => ({
  type: appTypes.INFO_ERROR,
  payload: data,
});

export const showSuccess = (data) => ({
  type: appTypes.INFO_SUCCESS,
  payload: data,
});

export const infoReset = (data) => ({
  type: appTypes.INFO_RESET,
  payload: data,
});
