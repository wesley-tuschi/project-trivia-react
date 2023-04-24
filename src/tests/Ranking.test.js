import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Página de Ranking', () => {
  const initialState = {
      player: {
        name: 'Nome de teste',
        assertions: 3,
        score: 10,
        gravatarEmail: ''
    }
  };

  test('Testa se ao renderizar a página de ranking as informações de score, imagem e name são renderizadas', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const buttonRanking = screen.getByRole('button', {  name: /ir para o ranking/i});
    userEvent.click(buttonRanking);
    await waitFor(() => {
      const imgElementImg = screen.getByAltText(/nome de teste/i);
      const nameElement = screen.getByText(/nome de teste/i);
      const scoreElement = screen.getByText(/10/i);
      expect (imgElementImg.src).toContain('https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e')
      expect(nameElement).toBeInTheDocument;
      expect(scoreElement).toBeInTheDocument;
    })

  });

  test('Testa se ao renderizar a página de ranking as informações de score, imagem e name são renderizadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const buttonRanking = screen.getByRole('button', {  name: /ir para o ranking/i});
    userEvent.click(buttonRanking);
    await waitFor(() => {
      const buttonToHome = screen.getByRole('button', {  name: /home/i})
      userEvent.click(buttonToHome);
    })
    expect(history.location.pathname).toBe('/')

  });

});

describe('Página de Ranking', () => {
  const initialState = {
      player: {
        name: 'Nome de teste',
        assertions: 3,
        score: 10,
        gravatarEmail: ''
    }
  };  
  
  renderWithRouterAndRedux(<App />, initialState, '/ranking');
  const messageEmptyRanking = screen.getByText(/nenhuma pontuação cadastrada/i)
  expect(messageEmptyRanking).toBeInTheDocument;
});