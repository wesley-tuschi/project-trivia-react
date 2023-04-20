const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';
// const REQUEST_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

export const requestToken = async () => {
  const response = await fetch(REQUEST_TOKEN);
  const data = await response.json();
  return data;
};

export const requestQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return data;
};
