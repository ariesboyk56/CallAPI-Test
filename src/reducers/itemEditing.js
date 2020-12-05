import * as types from '../constants/ActionTypes';
var initialState ={};

const itemEditing = (state=initialState, action) => {
  switch(action.type){
    case types.EDIT_PRODUCTS:
      console.log('bước 1',action.product)
      return action.product;
    default: return state;
  }
}

export default itemEditing;