import { combineReducers } from 'redux';
import playerReducer from './playerReducer';

const rootReducers = combineReducers(playerReducer);

export default rootReducers;
