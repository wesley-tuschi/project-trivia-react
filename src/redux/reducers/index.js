import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import triviaReducer from './triviaReducer';

const rootReducers = combineReducers({ playerReducer, triviaReducer });

export default rootReducers;
