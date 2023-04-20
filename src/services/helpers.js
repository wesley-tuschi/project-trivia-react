export function saveLocalStorage(token) {
  localStorage.setItem('token', token);
}

// {
//   ranking: [
//     { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
//   ],
//   token: token_recebido_pela_API
// }
