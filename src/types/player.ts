import {Book, Chapter} from './types.ts';

export enum PlayerWindowState {
  Closed = 'closed',
  Normal = 'maximized',
  Minimized = 'minimized',
}

export type Bookmark = {
  bookId: string;
  chapterId: string;
  timeCode: number;
};

export type PlayTask = {
  book: Book;
  chapters: Chapter[];
  bookmark?: Bookmark;
};
