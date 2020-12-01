export const addToList = (list, itemToAdd) => {
  const existingItem = list.find((el) => el.id === itemToAdd.id);

  if (existingItem) {
    return list.map((el) =>
      el.id === itemToAdd.id ? { ...el, ...itemToAdd } : el
    );
  }

  return [...list, itemToAdd];
};

export const addInFront = (data, item) => {
  data.unshift(item);
  return data;
};

export const deleteFromList = (list, itemToDeleteId) => {
  return list.filter((el) => el.id !== itemToDeleteId);
};

export const chkUniqueCategory = (arr, data, property) => {
  let index = arr.findIndex((el) => el[property] === data[property]);

  let resArr = [...arr];

  if (index > -1) {
    resArr[index] = data;
  } else {
    resArr.push(data);
  }

  return resArr;
};

export const deleteBudget = (data, budgetId) =>
  data.filter((el) => el._id !== budgetId);

export const deleteCategory = (arr, dataValue) => {
  return arr.filter((el) => el.categoryValue !== dataValue);
};

export const calcTotal = (arr, property) => {
  return arr.reduce((acc, el) => (acc = acc + el[property]), 0);
};

export const calcTotalExpense = (arr) => {
  return arr.reduce((acc, el) => {
    let subCatSum = 0;
    if (el.subcategoryData.length > 0) {
      subCatSum = el.subcategoryData.reduce(
        (accum, elem) => (accum = elem.subCategoryAmount + accum),
        0
      );
    }

    return (acc = acc + subCatSum);
  }, 0);
};

export const updateBudgetData = (budgetData, updatedBudgetItem) => {
  const budgetIndex = budgetData.findIndex(
    (el) => el._id === updatedBudgetItem._id
  );

  if (budgetIndex >= 0) {
    budgetData[budgetIndex] = updatedBudgetItem;
  }

  return budgetData;
};

export const deleteMainCategory = (data, catType, catId) => {
  const categoryType = catType === 'revenue' ? 'revenueData' : 'expenseData';

  const filteredArr = data[categoryType].filter((el) => el._id !== catId);

  data[categoryType] = filteredArr;

  return data;
};

export const deleteSubCategory = (data, catId, subCatId) => {
  let catIndex = data.expenseData.findIndex((el) => el._id === catId);

  let subCatItem = data.expenseData[catIndex].subcategoryData.filter(
    (el) => el._id !== subCatId
  );

  data.expenseData[catIndex].subcategoryData = subCatItem;

  return data;
};
