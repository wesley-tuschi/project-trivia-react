import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import he from 'he';
import Header from '../components/Header';
import { updateScore } from '../redux/actions';
import '../styles/Game.css';

const NUM_QUESTIONS = 5;

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

    const { counter } = this.state;

    const { dispatch, dificultySelected } = this.props;

    const ANSWER_SCORE = 10;

    const difficultyNumber = (() => {
      switch (dificultySelected) {
      case 'hard':
        return Number('3');
      case 'medium':
        return 2;
      case 'easy':
        return 1;
      default:
        return 1;
      }
    });

    if (isCorrect) {
      const score = ANSWER_SCORE + (counter * difficultyNumber());
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
    const { categoryIdSelected, dificultySelected } = this.props;
    const token = localStorage.getItem('token');
    let URL_API = `https://opentdb.com/api.php?amount=${NUM_QUESTIONS}&token=${token}`;
    if (categoryIdSelected !== 0) {
      URL_API = `https://opentdb.com/api.php?amount=5&category=${categoryIdSelected}&difficulty=${dificultySelected}&token=${token}`;
    }
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
    this.setState((prevState) => ({
      currIndex: prevState.currIndex + 1,
    }), () => {
      const { questions, currIndex } = this.state;
      const { history } = this.props;
      // console.log(currIndex);
      // console.log(NUM_QUESTIONS);
      const isLastQuestion = currIndex === NUM_QUESTIONS;
      if (isLastQuestion) {
        return history.push('/feedback');
      }
      this.updateCurrentQuestion(questions[currIndex]);
    });
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
    const timeForRed = 6;

    return (
      <>
        <Header />
        <main>
          <div className="game-contain">
            <p className={ counter < timeForRed ? 'red' : null }>{ counter }</p>
            <p data-testid="question-category">{ currQuestion.category }</p>
            <p data-testid="question-text">{ he.decode(currQuestion.question) }</p>
            <div
              className="answer-options"
              data-testid="answer-options"
            >
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
                    data-testid={ isCorrect
                      ? 'correct-answer' : `wrong-answer-${index - 1}` }
                    onClick={ () => this.pickAnswerFinish(isCorrect) }
                    style={ style }
                    disabled={ answersIsDisabled }
                  >
                    { he.decode(text) }
                  </button>
                );
              })}
            </div>
            {
              answersIsDisabled && (
                <button
                  className="btn-next"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                >
                  Next
                </button>
              )
            }
          </div>
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  categoryIdSelected: PropTypes.number.isRequired,
  dificultySelected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  categoryIdSelected: state.config.categoryIdSelected,
  dificultySelected: state.config.dificultySelected,
});

export default connect(mapStateToProps)(Game);
