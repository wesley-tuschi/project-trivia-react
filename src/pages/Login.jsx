import React from 'react';

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

  handleSubmit = (event) => {
    event.preventDefault();
    // const { history, dispatch } = this.props;
    // const { email } = this.state;
    // dispatch(addUser(email));
    // history.push('/Game');
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
      </div>
    );
  }
}

export default Login;
