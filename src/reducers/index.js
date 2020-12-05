import {combineReducers} from 'redux';
import products from './products';
import itemEditing from './itemEditing';

const myReducers = combineReducers({
  products,
  itemEditing
});
export default myReducers;