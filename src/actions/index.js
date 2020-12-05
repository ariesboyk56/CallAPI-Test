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
export const actAddProductsRequest = (product) => {
  return (dispatch) => {
    return callAPI('products', 'POST', product).then(res => {
      dispatch(actAddProducts(res.data))
    });
  }
}
export const actAddProducts = (product) =>{
  return{
    type: types.ADD_PRODUCTS,
    product
  }
}