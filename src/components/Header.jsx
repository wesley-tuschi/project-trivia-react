import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';
import triviaLogo from '../trivia.png';

class Header extends React.Component {
  render() {
    const {
      gravatarEmail,
      name,
      score,
    } = this.props;

    const gravatarImageUrl = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;

    return (
      <header>
        <img className="App-logo" src={ triviaLogo } alt="trivia logo" />
        <div>
          <div className="header-content">
            <img src={ gravatarImageUrl } alt="" data-testid="header-profile-picture" />
            <p>
              Score:
              {' '}
              <span data-testid="header-score">{score}</span>
            </p>
            <p data-testid="header-player-name">{name}</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
