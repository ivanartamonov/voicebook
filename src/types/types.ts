export interface Book {
  id: string;
  title: string;
  cover: string;
  author: Author;
  abstract: string;
  genre: string;
  tags: Array<Tag>;
  likes: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Chapter {
  id: string;
  book_id: string;
  title: string;
  priority: number;
  duration: number;
  url: string;
}

export interface Bookmark {
  id: number;
  book_id: string;
  chapter_id: string;
  time_code: number;
  created_at: number;
  updated_at: number;
}
