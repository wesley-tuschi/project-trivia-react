import { combineReducers } from 'redux';
import player from './playerReducer';
import triviaReducer from './triviaReducer';

const rootReducers = combineReducers({ player, triviaReducer });

export default rootReducers;
