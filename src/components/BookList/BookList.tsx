import React from 'react';
import {Book} from '../../types/types.ts';
import BookListItem from '../BookListItem.tsx';
import {StyleSheet, View} from 'react-native';

type Props = {
  books: Array<Book>;
};

const BookList = ({books}: Props) => {
  return (
    <View style={styles.bookList}>
      {books.map(book => (
        <BookListItem key={book.id} book={book} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bookList: {
    marginTop: 10,
    marginBottom: 20,
    gap: 20,
  },
});

export default BookList;
