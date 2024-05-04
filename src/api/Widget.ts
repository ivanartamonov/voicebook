import {Widget} from '../types/types.ts';
import config from '../constants/config.ts';

export const getHomeWidgets = (): Promise<Array<Widget>> => {
  return fetch(config.API_URL + '/widget')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data as Array<Widget>);
};
