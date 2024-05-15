import {Tag} from '../types/types.ts';
import config from '../constants/config.ts';

export const tagsToString = (tags: Array<Tag>): string => {
  return tags.map(tag => tag.name).join(', ');
};

export const buildBookUrl = (bookId: string): string => {
  return `${config.WEB_URL}/book/${bookId}`;
};
