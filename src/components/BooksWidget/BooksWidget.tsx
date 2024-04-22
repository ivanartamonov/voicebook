import React, {PropsWithChildren} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import BookWidgetItem from './BookWidgetItem.tsx';

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
      <FlatList
        horizontal
        data={books}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bookList}
        renderItem={({item}) => <BookWidgetItem book={item} />}
        keyExtractor={item => item.title}
      />
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
});

export default BooksWidget;
