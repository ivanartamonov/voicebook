import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {Book} from '../../types/types.ts';
import {Theme} from '../../constants/theme.ts';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/StackNavigator.tsx';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  book: Book;
};

type StackNavigation = StackNavigationProp<RootStackParamList>;

const BookWidgetItem = ({book}: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <Pressable
      style={styles.bookItem}
      onPress={() =>
        navigation.navigate('BookDetails', {
          book: book,
        })
      }>
      <Image
        source={{
          uri: book.cover,
        }}
        style={styles.bookCover}
      />
      <Text style={styles.title}>{book.title}</Text>
    </Pressable>
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
