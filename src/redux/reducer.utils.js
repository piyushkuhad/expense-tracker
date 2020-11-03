export const addToList = (list, itemToAdd) => {
  const existingItem = list.find((el) => el.id === itemToAdd.id);

  if (existingItem) {
    return list.map((el) =>
      el.id === itemToAdd.id ? { ...el, ...itemToAdd } : el
    );
  }

  return [...list, itemToAdd];
};

export const deleteFromList = (list, itemToDeleteId) => {
  return list.filter((el) => el.id !== itemToDeleteId);
};

export const chkUniqueCategory = (arr, data, property) => {
  //let index = arr.findIndex((el) => el.id === data.id);
  let index = arr.findIndex((el) => el[property] === data[property]);

  let resArr = [...arr];

  if (index > -1) {
    resArr[index] = data;
  } else {
    resArr.push(data);
  }

  return resArr;
};

export const deleteCategory = (arr, dataValue) => {
  return arr.filter((el) => el.categoryValue !== dataValue);
};

export const calcTotal = (arr, property) =>
  arr.reduce((acc, el) => (acc = acc + el[property]), 0);
