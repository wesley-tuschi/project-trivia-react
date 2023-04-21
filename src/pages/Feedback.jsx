import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { saveRankingLocalStorage } from '../services/helpers';
import { resetStore } from '../redux/actions/index';

class Feedback extends Component {
  // componentDidMount() {
  //   const { name, score, gravatarEmail } = this.props;
  //   saveRankingLocalStorage({ name, score, gravatarEmail });
  // }

  hadleClickToLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(resetStore());
    history.push('/');
  };

  hadleClickToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const message0to3 = 'Could be better...';
    const message3OrMore = 'Well Done!';
    const three = 3;
    const { assertions, score } = this.props;

    return (
      <>
        <Header />
        <div>
          {
            assertions < three ? (
              <p data-testid="feedback-text">
                { message0to3 }
              </p>
            )
              : <p data-testid="feedback-text">{ message3OrMore }</p>
          }
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <button
          className="btn-play-again"
          data-testid="btn-play-again"
          onClick={ this.hadleClickToLogin }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.hadleClickToRanking }
        >
          Ir para o Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
