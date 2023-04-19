import { combineReducers } from 'redux';

const rootReducers = combineReducers({ player: (state = {}, action) => state });

export default rootReducers;
