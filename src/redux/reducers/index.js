import { combineReducers } from 'redux';
import playerReducer from './playerReducer';

const rootReducers = combineReducers({ player: (state = {}, action) => state });

export default rootReducers;
