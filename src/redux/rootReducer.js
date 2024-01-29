/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import branchReducer from './slices/branch';
import diningCategoryReducer from './slices/diningCategory';
import tableReducer from './slices/table';
import menuReducer from './slices/menu';
import categoryReducer from './slices/category';
import RoleReducer from './slices/role';
import OrderReducer from './slices/order';
import userReducer from './slices/user';
import addOnReducer from './slices/addOns';
import permission from './slices/permission';
import subscription from './slices/subscription';
import notifications from './slices/notification';
import invoices from './slices/invoices';
import cartReducer from './slices/takeOrderCart';
import countryCode from './slices/countryCode';
import KitchenReducer from './slices/kitchen';
import ReportReducer from './slices/report';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['cart'],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout', 'cart'],
};

const rootReducer = combineReducers({
  branch: branchReducer,
  diningCategory: diningCategoryReducer,
  table: tableReducer,
  menu: menuReducer,
  category: categoryReducer,
  role: RoleReducer,
  order: OrderReducer,
  user: userReducer,
  addOn: addOnReducer,
  Permission: permission,
  invoices,
  cart: cartReducer,
  subscription,
  notifications,
  countryCode,
  Kitchen: KitchenReducer,
  report:ReportReducer,
  // mail: mailReducer,
  // chat: chatReducer,
  // calendar: calendarReducer,
  // kanban: kanbanReducer,
  // product: persistReducer(productPersistConfig, productReducer),
  // product: persistReducer(productPersistConfig, menuReducer),
});

export default rootReducer;
