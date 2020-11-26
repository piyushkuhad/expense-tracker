import { checkDateBetween } from './dateMethods';

export const getTotal = (list) => {
  return list.reduce((acc, el) => {
    let num = +el.amount;
    return acc + num;
  }, 0);
};

export const filteredDateList = (list, startDate, endDate) => {
  const filteredResult = list.filter((el) =>
    checkDateBetween(el.date, startDate, endDate)
  );

  //Sort acc to Date
  const data = filteredResult.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const total = getTotal(list);

  return { data, total };
};
