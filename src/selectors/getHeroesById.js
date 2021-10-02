import { heroes } from '../data/heroes';

export const getHeoresById = (heroId) => {
  return heroes.find((hero) => hero.id === heroId);
};
