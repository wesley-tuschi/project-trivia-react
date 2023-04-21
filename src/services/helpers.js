import md5 from 'crypto-js/md5';

export function saveLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function saveRankingLocalStorage({ name, score, gravatarEmail }) {
  const isRankingTrue = localStorage.getItem('ranking');
  const reverse = -1;
  if (isRankingTrue) {
    const oldRankingArray = JSON.parse(isRankingTrue);
    oldRankingArray.push({
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
    });
    const newRankingArray = oldRankingArray.sort((a, b) => {
      if (a.score > b.score) {
        return reverse;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem('ranking', JSON.stringify(newRankingArray));
  } else {
    localStorage.setItem('ranking', JSON.stringify([{
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
    }]));
  }
}

// {
//   ranking: [
//     { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
//   ],
//   token: token_recebido_pela_API
// }
