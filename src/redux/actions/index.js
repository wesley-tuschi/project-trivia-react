export const LOG_IN = 'LOG_IN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const UPDATE_CONFIGS = 'UPDATE_CONFIGS';

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

export const resetStore = () => ({
  type: RESET_SCORE,
});

export const updateConfigs = (categoryIdSelected, dificultySelected) => ({
  type: UPDATE_CONFIGS,
  payload: {
    categoryIdSelected,
    dificultySelected,
  },
});
