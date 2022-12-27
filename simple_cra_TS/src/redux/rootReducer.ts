import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer from './slices/chat';
import categoryReducer from './slices/category';
import bookReducer from './slices/book';
// slices


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
    chat: chatReducer,
    categories:categoryReducer,
    books:bookReducer
});

export { rootPersistConfig, rootReducer };
