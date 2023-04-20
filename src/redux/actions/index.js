export const LOG_IN = 'LOG_IN';

export const logIn = ({ email, playerName }) => ({
  type: LOG_IN,
  payload: {
    email,
    playerName,
  },
});
