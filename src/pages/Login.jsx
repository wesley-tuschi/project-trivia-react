import React from 'react';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { name, email } = this.state;
      const minLenghtName = 2;
      const emailValidation = email.includes('.com') && email.includes('@');
      if (name.length >= minLenghtName && emailValidation) {
        this.setState({
          isButtonDisabled: false,
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/Game');
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            placeholder="Digite seu nome aqui"
            type="text"
            className="input-name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="name"
            value={ name }
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
            onClick={ (event) => this.handleClick(event) }
          >
            Jogar
          </button>

        </form>
      </div>
    );
  }
}

export default Login;
