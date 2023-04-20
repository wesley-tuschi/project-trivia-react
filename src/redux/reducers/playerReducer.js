import { LOG_IN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN:
    return {
      ...state,
      name: action.payload.playerName,
      gravatarEmail: action.payload.email,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
