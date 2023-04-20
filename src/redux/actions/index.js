import { requestToken, requestQuestions } from '../../services/Api';
import { saveLocalStorage } from '../../services/helpers';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const getTokenToState = (data) => ({
  type: REQUEST_TOKEN,
  token: data.token,
  responseCode: data.response_code,
});

export const requestTokenFromApi = () => async (dispatch) => {
  const dataToken = await requestToken();
  dispatch(getTokenToState(dataToken));
  saveLocalStorage(dataToken.token);
};

export const getQuestionsToState = (data) => ({
  type: REQUEST_QUESTIONS,
  questions: data.results,
});

export const requestQuestionsFromApi = (token) => async (dispatch) => {
  const dataQuestions = await requestQuestions(token);
  dispatch(getQuestionsToState(dataQuestions));
};
