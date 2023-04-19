import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducers from './reducers';

const store = createStore(rootReducers, composeWithDevTools());

export default store;
