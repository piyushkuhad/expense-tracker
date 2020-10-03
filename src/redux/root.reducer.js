import revenueReducer from './revenue/revenue.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['revenue'],
};

const rootReducer = combineReducers({
  revenue: revenueReducer,
});

export default persistReducer(persistConfig, rootReducer);
