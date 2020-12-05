import * as types from '../constants/ActionTypes';
import callAPI from '../utils/apiCaller';

export const actFetchProductsRequest = () => {
  return (dispatch) => {
    return callAPI('products', 'GET', null).then(res=>{
      dispatch(actFetchProducts(res.data));
    });
  }
}

export const actFetchProducts = (products) => {
  return {
    type: types.FETCH_PRODUCTS,
    products
  }
}

export const actDeleteProductsRequest = (id) => {
  return (dispatch) => {
    return callAPI(`products/${id}`, 'DELETE', null).then(res=>{
      dispatch(actDeleteProducts(id));
    });
  }
}

export const actDeleteProducts = (id) => {
  return {
    type: types.DELETE_PRODUCTS,
    id
  }
}