import { createStore, combineReducers } from 'redux';
import {productReducer,productSortReducer} from '../reducers/productReducer';

const rootReducer = combineReducers({
  products: productReducer,
  productsSorted: productSortReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;