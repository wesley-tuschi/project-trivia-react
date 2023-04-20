import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
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
            assertions <= { three } ? (
              <p data-testid="feedback-text">
                { message0to3 }
              </p>
            )
              : <p data-testid="feedback-text">{message3OrMore }</p>
          }
        </div>
        <div>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
