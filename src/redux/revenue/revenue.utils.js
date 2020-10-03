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
