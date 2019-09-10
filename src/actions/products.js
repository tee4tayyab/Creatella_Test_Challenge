import { PRODUCTS, PRODUCTS_SORT } from './types';
// dispatch method for products
export const addProducts = product => {
  return {
    type: PRODUCTS,
    payload: product
  }
}
// dispatch method for sorted products
export const addSortedProducts = product => {
  return {
    type: PRODUCTS_SORT,
    payload: product
  }
}