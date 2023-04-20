import { LOG_IN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_INFO':
    return state;
  case LOG_IN:
    return {
      ...state,
      name: action.payload.playerName,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};

export default playerReducer;
