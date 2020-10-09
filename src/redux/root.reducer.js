import revenueReducer from './revenue/revenue.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expenceReducer from './expense/expense.reducer';
import dateFilterReducer from './app/app.reducer';
import createBudgetReducer from './budget/budget.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['revenue', 'expense', 'budget'],
};

const rootReducer = combineReducers({
  revenue: revenueReducer,
  expense: expenceReducer,
  budget: createBudgetReducer,
  dateFilter: dateFilterReducer,
});

export default persistReducer(persistConfig, rootReducer);
