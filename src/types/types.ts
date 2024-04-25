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
