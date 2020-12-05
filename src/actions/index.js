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
export const actGetProductRequest = id => {
  return dispatch => {
    return callAPI(`products/${id}`, 'GET', null).then(res => {
      dispatch(actGetProduct(res.data))
    });
  }
}
export const actGetProduct = product => {
  return{
    type: types.EDIT_PRODUCTS,
    product
  }
}
export const actUpdateProductRequest = product => {
  return dispatch => {
    return callAPI(`products/${product.id}`, 'PUT', product).then(res=>{
      dispatch(actUpdateProduct(res.data))
    });
  }
}
export const actUpdateProduct = product => {
  return{
    type: types.UPDATE_PRODUCTS,
    product
  }
}