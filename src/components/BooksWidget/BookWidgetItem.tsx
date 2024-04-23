import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Book} from '../../types/types.ts';
import {Theme} from '../../constants/theme.ts';
import {useTheme} from '../../contexts/ThemeContext.tsx';

type Props = {
  book: Book;
};

const BookWidgetItem = ({book}: Props) => {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <View style={styles.bookItem}>
      <Image
        source={{
          uri: book.cover,
        }}
        style={styles.bookCover}
      />
      <Text style={styles.title}>{book.title}</Text>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    bookItem: {
      width: 115,
    },
    bookCover: {
      width: 220 / 2,
      height: 320 / 2,
      borderRadius: 5,
    },
    title: {
      color: theme.text,
    },
  });

export default BookWidgetItem;
