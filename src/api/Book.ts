import {Book, Collection} from '../types/types.ts';
import config from '../constants/config.ts';

export const getBooks = (page: number = 1): Promise<Collection<Book>> => {
  return fetch(config.API_URL + '/books?page=' + page)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data as Collection<Book>);
};
