import {Chapter} from '../types/types.ts';
import config from '../constants/config.ts';

export const getFirstBookChapter = (book_id: string): Promise<Chapter> => {
  return fetch(config.API_URL + `/book/${book_id}/first-chapter`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data as Chapter);
};

export const getChapters = (book_id: string): Promise<Chapter[]> => {
  return fetch(config.API_URL + `/book/${book_id}/chapters`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data as Chapter[]);
};
