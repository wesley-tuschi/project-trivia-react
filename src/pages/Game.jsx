import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateScore } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    currIndex: 0,
    showAnswersColor: false,
    counter: 30,
    currQuestion: null,
    answersIsDisabled: false,
  };

  componentDidMount() {
    this.initGame();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.counter === 1) {
      this.pickAnswerFinish();
    }
  }

  pickAnswerFinish = (isCorrect) => {
    this.setState({
      answersIsDisabled: true,
      showAnswersColor: true,
      counter: 0,
    });

    const { counter, currQuestion: {
      difficulty,
    } } = this.state;

    const { dispatch } = this.props;

    const ANSWER_SCORE = 10;

    const difficultyNumber = (() => {
      switch (difficulty) {
      case 'hard':
        return Number('3');
      case 'medium':
        return 2;
      case 'easy':
        return 1;
      default:
        return 1;
      }
    })();

    if (isCorrect) {
      const score = ANSWER_SCORE + (counter * difficultyNumber);

      dispatch(updateScore(score));
    }
  };

  initGame = async () => {
    await this.requestQuestionsAndAnswers();
    const THOUSAND_MILLISECONDS = 1000;
    setInterval(() => {
      const { counter } = this.state;
      if (counter !== 0) {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }));
      }
    }, THOUSAND_MILLISECONDS);
  };

  updateCurrentQuestion = (question) => {
    const answers = [{
      text: question.correct_answer,
      isCorrect: true,
    }, ...question.incorrect_answers.map((answer) => ({
      text: answer,
      isCorrect: false,
    }))];
    const randomAnswers = answers.sort(() => (
      (Math.random() > Number('0.5')) ? 1 : Number('-1')
    ));
    this.setState({
      currQuestion: {
        ...question,
        randomAnswers,
      },
      counter: 30,
      answersIsDisabled: false,
      showAnswersColor: false,
    });
  };

  logOut = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    return history.push('/');
  };

  requestQuestionsAndAnswers = async () => {
    const NUM_QUESTIONS = 5;
    const token = localStorage.getItem('token');
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
    }, () => {
      const { questions, currIndex } = this.state;
      this.updateCurrentQuestion(questions[currIndex]);
    });
  };

  nextQuestion = () => {
    this.setState(
      (prevState) => ({ currIndex: prevState.currIndex + 1 }),
      () => {
        const { questions, currIndex } = this.state;
        this.updateCurrentQuestion(questions[currIndex]);
      },
    );
  };

  render() {
    const {
      showAnswersColor,
      counter,
      currQuestion,
      answersIsDisabled,
    } = this.state;
    if (!currQuestion) {
      return <h2>Carregando...</h2>;
    }

    let index = 0;

    return (
      <>
        <Header />
        <h1>Game</h1>
        <p>{ counter }</p>
        <p data-testid="question-category">{ currQuestion.category }</p>
        <p data-testid="question-text">{ currQuestion.question }</p>
        <div data-testid="answer-options">
          {currQuestion.randomAnswers.map(({ text, isCorrect }) => {
            const style = {
              border: '3px solid ',
            };
            if (showAnswersColor) {
              style.border += isCorrect ? 'rgb(6, 240, 15)' : 'red';
            }
            if (!isCorrect) {
              index += 1;
            }
            return (
              <button
                key={ text }
                data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${index - 1}` }
                onClick={ () => this.pickAnswerFinish(isCorrect) }
                style={ style }
                disabled={ answersIsDisabled }
              >
                { text }
              </button>
            );
          })}
        </div>
        {
          answersIsDisabled && (
            <button data-testid="btn-next" onClick={ this.nextQuestion }>Next</button>
          )
        }
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
