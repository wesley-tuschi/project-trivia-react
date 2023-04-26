import { combineReducers } from 'redux';
import player from './playerReducer';
import config from './configReducer';

const rootReducers = combineReducers({ player, config });

export default rootReducers;
