import React from 'react';
import { connect } from 'react-redux';
import '../styles/Config.css';
import { PropTypes } from 'prop-types';
import { updateConfigs } from '../redux/actions/index';

class Config extends React.Component {
  state = {
    categories: [],
    categoryIdSelected: '',
    dificultySelected: 'easy',
  };

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories = async () => {
    const URL_API = 'https://opentdb.com/api_category.php';
    const response = await fetch(URL_API);
    const data = await response.json();
    this.setState({
      categories: data.trivia_categories,
      categoryIdSelected: data.trivia_categories[0].id,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    const { dispatch, history } = this.props;
    const { categoryIdSelected, dificultySelected } = this.state;
    event.preventDefault();
    dispatch(updateConfigs(categoryIdSelected, dificultySelected));
    history.push('/');
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="container-config">

        <form className="form-login">
          <h2 data-testid="settings-title">Configurações</h2>
          <select
            onChange={ this.handleChange }
            name="categoryIdSelected"
          >
            {categories.map((categorie) => (
              <option
                key={ categorie.name }
                value={ categorie.id }
              >
                { categorie.name }
              </option>
            ))}

          </select>

          <select
            onChange={ this.handleChange }
            name="dificultySelected"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            onClick={ (event) => this.handleClick(event) }
          >
            Home
          </button>
        </form>

      </div>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Config);
