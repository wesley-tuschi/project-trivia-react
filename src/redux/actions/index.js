export const LOG_IN = 'LOG_IN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const logIn = ({ email, playerName }) => ({
  type: LOG_IN,
  payload: {
    email,
    playerName,
  },
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: {
    score,
  },
});
