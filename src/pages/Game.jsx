import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    questions: [],
    currIndex: 0,
  };

  componentDidMount() {
    this.requestQuestionsAndAnswers();
  }

  logOut = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    return history.push('/');
  };

  requestQuestionsAndAnswers = async () => {
    const NUM_QUESTIONS = 5;
    const token = JSON.parse(localStorage.getItem('token'));
    // const token = '47b7fa4723d34b62c2bf1260199adb43d33bed76d5e09d705831d839fb9f5567';
    const URL_API = `https://opentdb.com/api.php?amount=${NUM_QUESTIONS}&token=${token}`;
    const response = await fetch(URL_API);
    const data = await response.json();
    const ERROR_CODE = 3;
    if (data.response_code === ERROR_CODE) {
      this.logOut();
    }
    this.setState({
      questions: data.results,
    });
  };

  render() {
    const {
      questions,
      currIndex,
    } = this.state;
    const currQuestion = questions[currIndex];
    if (!currQuestion) {
      return <h2>Carregando...</h2>;
    }
    const answers = [{
      text: currQuestion.correct_answer,
      isCorrect: true,
    }, ...currQuestion.incorrect_answers.map((answer) => ({
      text: answer,
      isCorrect: false,
    }))];
    const randomAnswers = answers.sort(() => (
      (Math.random() > Number('0.5')) ? 1 : Number('-1')
    ));
    let index = 0;

    return (
      <>
        <Header />
        <h1>Game</h1>
        <p data-testid="question-category">{ currQuestion.category }</p>
        <p data-testid="question-text">{ currQuestion.question }</p>
        <div data-testid="answer-options">
          {randomAnswers.map(({ text, isCorrect }) => {
            if (!isCorrect) {
              index += 1;
            }
            return (
              <button
                key={ text }
                data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${index - 1}` }
              >
                { text }
              </button>
            );
          })}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
