export const dialogToggle = (currentState, stateSetter) => {
  return stateSetter(!currentState);
};

export const currencyFormat = (num) => {
  return isNaN(num) ? 0 : new Intl.NumberFormat('en-IN', {}).format(num);
};

export const grpCategByDate = (arr) => {
  const groups = arr.reduce((groups, category) => {
    const date = category.transactionDate.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(category);
    return groups;
  }, {});

  //add it in the array format
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      categories: groups[date],
    };
  });

  return groupArrays;
};
