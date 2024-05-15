import {Chapter} from '../types/types.ts';
import {apiGet} from './Api.ts';

export const getFirstBookChapter = (book_id: string): Promise<Chapter> => {
  return apiGet<Chapter>(`/book/${book_id}/first-chapter`);
};

export const getChapters = (book_id: string): Promise<Chapter[]> => {
  return apiGet<Chapter[]>(`/book/${book_id}/chapters`);
};
