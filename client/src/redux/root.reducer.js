import revenueReducer from './revenue/revenue.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expenceReducer from './expense/expense.reducer';
import appReducer from './app/app.reducer';
import createBudgetReducer from './budget/budget.reducer';
import userReducer from './user/user.reducer';
import dialogFormReducer from './dialog-forms/dialog-form.reducer';
import { appTypes } from './app/app.types';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['revenue', 'expense', 'budget', 'user'],
};

const loaderReducer = (
  state = { status: false, type: 'default', loaderText: undefined },
  action
) => {
  switch (action.type) {
    case appTypes.LOADER_START:
      return action.payload;

    case appTypes.LOADER_STOP:
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  revenue: revenueReducer,
  expense: expenceReducer,
  budget: createBudgetReducer,
  app: appReducer,
  user: userReducer,
  forms: dialogFormReducer,
  loader: loaderReducer,
});

export default persistReducer(persistConfig, rootReducer);
