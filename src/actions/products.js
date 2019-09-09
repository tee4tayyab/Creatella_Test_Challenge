import { PRODUCTS, PRODUCTS_SORT } from './types';

export const addProducts = product => {
  return {
    type: PRODUCTS,
    payload: product
  }
}
export const addSortedProducts = product => {
  return {
    type: PRODUCTS_SORT,
    payload: product
  }
}