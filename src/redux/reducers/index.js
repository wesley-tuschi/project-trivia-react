import { combineReducers } from 'redux';
import player from './playerReducer';

const rootReducers = combineReducers({ player });

export default rootReducers;
