import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logIn } from '../redux/actions/index';
import { requestToken } from '../services/Api';
import { saveLocalStorage } from '../services/helpers';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    playerName: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { playerName, email } = this.state;
      const minLenghtName = 2;
      const emailValidation = email.includes('.com') && email.includes('@');
      if (playerName.length >= minLenghtName && emailValidation) {
        this.setState({
          isButtonDisabled: false,
        });
      }
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, playerName } = this.state;
    const { history, dispatch } = this.props;
    dispatch(logIn({
      email, playerName,
    }));
    const data = await requestToken();
    saveLocalStorage(data.token);
    history.push('/game');
  };

  hadleClickToConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { playerName, email, isButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            placeholder="Digite seu nome aqui"
            type="text"
            className="input-name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="playerName"
            value={ playerName }
          />

          <input
            placeholder="Digite seu email aqui"
            type="email"
            className="input-email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />

          <button
            className="btn-play"
            disabled={ isButtonDisabled }
            data-testid="btn-play"
            type="submit"
            onClick={ (event) => this.handleSubmit(event) }
          >
            Jogar
          </button>

        </form>
        <button
          data-testid="btn-settings"
          onClick={ this.hadleClickToConfig }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
