import revenueReducer from './revenue/revenue.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expenceReducer from './expense/expense.reducer';
import appReducer from './app/app.reducer';
import createBudgetReducer from './budget/budget.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['revenue', 'expense', 'budget', 'user'],
};

const rootReducer = combineReducers({
  revenue: revenueReducer,
  expense: expenceReducer,
  budget: createBudgetReducer,
  app: appReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
