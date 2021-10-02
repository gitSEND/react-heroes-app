import { heroes } from '../data/heroes';

export const getHeoresByPublisher = (publisher) => {
  const validPublisher = ['DC Comics', 'Marvel Comics'];

  if (!validPublisher.includes(publisher)) {
    throw new Error(`Publisher ${publisher} no es correcto.`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
