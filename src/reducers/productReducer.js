import { PRODUCTS, PRODUCTS_SORT } from '../actions/types';

const initialState = {
  products: []
};

export const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCTS:
      return {
        ...state,
        products: state.products.concat(action.payload)
      };
    default:
      return state;
  }
}
export const productSortReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCTS_SORT:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}

