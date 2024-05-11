import {Book, Collection} from '../types/types.ts';
import {apiGet} from './Api.ts';

export const getBooks = (page: number = 1): Promise<Collection<Book>> => {
  return apiGet<Collection<Book>>('/book?page=' + page);
};
