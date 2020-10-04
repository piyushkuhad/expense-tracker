import moment from 'moment';

export const daysBetween = (startDate, endDate) => {
  let a = moment(endDate);
  let b = moment(startDate);

  return a.diff(b, 'days');
};

export const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const checkDateBetween = (date, startDate, endDate) => {
  //const range = moment().range(startDate, endDate);
  date = moment(date);
  startDate = moment(startDate);
  endDate = moment(endDate);

  return date.isBetween(startDate, endDate);
};

export const filteredDateList = (list, startDate, endDate) => {
  return list.filter((el) => checkDateBetween(el.date, startDate, endDate));
};
