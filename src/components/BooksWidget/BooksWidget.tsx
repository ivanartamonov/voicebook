import React, {PropsWithChildren} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

type Book = {
  title: string;
  cover: string;
};
type BooksWidgetProps = PropsWithChildren<{
  heading: string;
  books: Array<Book>;
}>;

function BooksWidget({heading, books}: BooksWidgetProps): React.JSX.Element {
  return (
    <View style={styles.booksWidget}>
      <Text style={styles.heading}>{heading}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bookList}>
        {books.map((book, index) => (
          <View key={index} style={styles.bookItem}>
            <Image
              source={{
                uri: book.cover,
              }}
              style={styles.bookCover}
            />
            <Text>{book.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  booksWidget: {
    padding: 10,
  },
  bookList: {
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10,
  },
  bookItem: {
    width: 115,
  },
  bookCover: {
    width: 220 / 2,
    height: 320 / 2,
    borderRadius: 5,
  },
});

export default BooksWidget;
