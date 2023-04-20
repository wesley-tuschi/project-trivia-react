import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const message0to3 = 'Could be better...';
    const message3OrMore = 'Well Done!';
    const three = 3;
    const { assertions } = this.props;

    return (

      <div>
        <Header />
        {
          assertions <= { three } ? (
            <p data-testid="feedback-text">
              { message0to3 }
            </p>
          )
            : <p data-testid="feedback-text">{message3OrMore }</p>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
