import { REQUEST_TOKEN, REQUEST_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  token: '',
  responseCode: 0,
  questions: [],
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
      responseCode: action.responseCode,
    };
  case REQUEST_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default triviaReducer;
