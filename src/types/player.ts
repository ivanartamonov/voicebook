import {Book, Chapter} from './types.ts';

export enum PlayerWindowState {
  Closed = 'closed',
  Normal = 'maximized',
  Minimized = 'minimized',
}

export type PlayTask = {
  book: Book;
  chapter: Chapter;
};
