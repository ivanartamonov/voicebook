import {Chapter} from '../types/types.ts';

export const getChapter = (id: string): Chapter => {
  return {
    id: id,
    book_id: '418757',
    title: 'Глава 1',
    priority: 1,
    duration: 309,
    url: 'https://voicebook.app/play/' + id,
  };
};

export const getChapters = (book_id: string): Array<Chapter> => {
  return [
    {
      id: '1',
      book_id: book_id,
      title: 'Глава 1',
      priority: 1,
      duration: 380,
      url: 'https://voicebook.app/play/1',
    },
    {
      id: '2',
      book_id: book_id,
      title: 'Глава 2',
      priority: 2,
      duration: 328,
      url: 'https://voicebook.app/play/2',
    },
    {
      id: '3',
      book_id: book_id,
      title: 'Глава 3',
      priority: 3,
      duration: 257,
      url: 'https://voicebook.app/play/3',
    },
    {
      id: '4',
      book_id: book_id,
      title: 'Глава 4',
      priority: 4,
      duration: 432,
      url: 'https://voicebook.app/play/4',
    },
    {
      id: '5',
      book_id: book_id,
      title: 'Глава 5',
      priority: 5,
      duration: 368,
      url: 'https://voicebook.app/play/5',
    },
    {
      id: '6',
      book_id: book_id,
      title: 'Глава 6',
      priority: 6,
      duration: 289,
      url: 'https://voicebook.app/play/6',
    },
    {
      id: '7',
      book_id: book_id,
      title: 'Глава 7',
      priority: 7,
      duration: 422,
      url: 'https://voicebook.app/play/7',
    },
    {
      id: '8',
      book_id: book_id,
      title: 'Глава 8',
      priority: 8,
      duration: 511,
      url: 'https://voicebook.app/play/8',
    },
    {
      id: '9',
      book_id: book_id,
      title: 'Глава 9',
      priority: 9,
      duration: 279,
      url: 'https://voicebook.app/play/9',
    },
  ];
};
