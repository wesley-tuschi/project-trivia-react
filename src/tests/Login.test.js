import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {
  test('Testa se ao clicar no botão de jogar é redirecionado para a rota "game"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputElName = screen.getByTestId("input-player-name");
    userEvent.type(inputElName, 'Nome da Pessoa');
    const inputElEmail = screen.getByTestId("input-gravatar-email");
    userEvent.type(inputElEmail, 'exemplo@mail.com');
    const btnEl = screen.getByRole('button', { name: /jogar/i });
    userEvent.click(btnEl);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });
  test('Testa se ao clicar no botão de configurações é redirecionado para a rota de "configurações"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnEl = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(btnEl);
    expect(history.location.pathname).toBe('/config');
  });
});