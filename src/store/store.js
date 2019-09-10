import { createStore, combineReducers } from 'redux';
import { productReducer, productSortReducer } from '../reducers/productReducer';

// combining all reducers

const rootReducer = combineReducers({
  products: productReducer,
  productsSorted: productSortReducer
});

// configuring root reducer to create store.

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;