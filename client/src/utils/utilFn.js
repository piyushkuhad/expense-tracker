import { loaderActive, loaderInActive } from '../redux/app/app.action';

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

export const greetMsg = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return 'Good Morning';
  } else if (curHr < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

export const loaderStart = (dispatch, loaderType, loaderText) => {
  const loaderObj = {
    status: true,
    type: loaderType ? loaderType : 'default',
    loaderText: loaderText ? loaderText : undefined,
  };
  return dispatch(loaderActive(loaderObj));
};

export const loaderStop = (dispatch) => {
  const loaderObj = {
    status: false,
  };
  return dispatch(loaderInActive(loaderObj));
};
