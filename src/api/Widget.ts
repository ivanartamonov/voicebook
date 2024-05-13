import {Widget} from '../types/types.ts';
import {apiGet} from './Api.ts';

export const getHomeWidgets = (): Promise<Widget[]> => {
  return apiGet<Widget[]>('/widget');
};
