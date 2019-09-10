import { PRODUCTS, PRODUCTS_SORT } from '../actions/types';

//initial state of REDUX STORE.
const initialState = {
  products: []
};

// REDUCER for products

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS:
      return {
        ...state,
        products: state.products.concat(action.payload)
      };
    default:
      return state;
  }
}

// REDUCER for sorted products

export const productSortReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SORT:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}

