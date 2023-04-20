import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Página de Feedback', () => {
  const initialState = {
      player: {
        name: 'Nome de teste',
        assertions: 3,
        score: 10,
        gravatarEmail: ''
    }
  };

  test('Testa se ao renderizar as informações de score, imagem e name são renderizadas', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const imgElementImg = screen.getByTestId('header-profile-picture');
    const nameElement = screen.getByText(/nome de teste/i);
    const scoreElement = screen.getAllByText(/10/i);
   
    expect(imgElementImg).toBeInTheDocument;
    expect(nameElement).toBeInTheDocument;
    expect(scoreElement).toHaveLength(2);
    // screen.debug()
  });

  test('Testa se ao clicar no botão de Play Again a página é redirecionada para a rota de Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    
    const buttonPlayAgain = screen.getByRole('button', {  name: /play again/i});
    userEvent.click(buttonPlayAgain);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  test('Testa se ao clicar no botão de Play Again a página é redirecionada para a rota de Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    
    const buttonRanking = screen.getByRole('button', {  name: /ir para o ranking/i});
    userEvent.click(buttonRanking);
    await waitFor(() => expect(history.location.pathname).toBe('/ranking'));
  });

  test('Testa se a mensagem /Could be better.../ é renderizada com até 3 acertos', async () => {
    const initialState = {
      player: {
        name: 'Nome de teste',
        assertions: 2,
        score: 10,
        gravatarEmail: ''
    }
  };    
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const phraseElement = screen.getByText(/could be better\.\.\./i);
   
    expect(phraseElement).toBeInTheDocument;
  });

});