import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Book} from '../../types/types.ts';

type Props = {
  book: Book;
};

const BookWidgetItem = ({book}: Props) => {
  return (
    <View style={styles.bookItem}>
      <Image
        source={{
          uri: book.cover,
        }}
        style={styles.bookCover}
      />
      <Text>{book.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    width: 115,
  },
  bookCover: {
    width: 220 / 2,
    height: 320 / 2,
    borderRadius: 5,
  },
});

export default BookWidgetItem;
