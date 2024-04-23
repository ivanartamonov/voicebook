import {Tag} from '../types/types.ts';

export const tagsToString = (tags: Array<Tag>): string => {
  return tags.map(tag => tag.name).join(', ');
};
