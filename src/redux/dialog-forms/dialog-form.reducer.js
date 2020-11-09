import { dialogFormTypes } from './dialog-form.types';

const INITIAL_STATE = {
  update: false,
  formData: {},
  formDialogName: null,
};

const dialogFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dialogFormTypes.UPDATE_EXPENSE_SUB_CATEGORY_DIALOG:
      return {
        update: true,
        formData: action.payload.data,
        formDialogName: action.payload.formDialogName,
      };

    case dialogFormTypes.ADD_EXPENSE_SUB_CATEGORY_DIALOG:
      return {
        update: false,
        formData: action.payload.data,
        formDialogName: action.payload.formDialogName,
      };

    case dialogFormTypes.DELETE_EXPENSE_SUB_CATEGORY_DIALOG:
      return {
        update: false,
        formData: action.payload.data,
        formDialogName: action.payload.formDialogName,
      };

    case dialogFormTypes.CLOSE_DIALOG:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default dialogFormReducer;
