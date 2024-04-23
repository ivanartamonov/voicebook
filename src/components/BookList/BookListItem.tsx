import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Book} from '../../types/types.ts';
import {Theme} from '../../constants/theme.ts';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/StackNavigator.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {tagsToString} from '../../utils/BookHelper.ts';

type Props = {
  book: Book;
};

type StackNavigation = StackNavigationProp<RootStackParamList>;

const BookListItem = ({book}: Props) => {
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
      <View style={styles.rightSide}>
        <Text style={styles.author}>{book.author.name}</Text>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.genre}>{book.genre}</Text>
        <Text style={styles.tags}>{tagsToString(book.tags)}</Text>
        <View style={styles.counters}>
          <View style={styles.counter}>
            <Icon name="heart-o" size={16} color={theme.textSoft} />
            <Text style={styles.counterLabel}>{book.likes}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    bookItem: {
      flexDirection: 'row',
      gap: 10,
      flex: 1,
    },
    bookCover: {
      width: 200 / 2,
      height: 300 / 2,
      borderRadius: 5,
    },
    rightSide: {
      flexShrink: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 3,
    },
    author: {
      color: theme.textSoft,
    },
    genre: {
      color: theme.textSoft,
      fontWeight: '600',
    },
    tags: {
      marginTop: 5,
      color: theme.textSoft,
      fontWeight: '300',
    },
    counters: {
      flexDirection: 'row',
      gap: 20,
      marginBottom: 5,
      flexGrow: 1,
      alignItems: 'flex-end',
    },
    counter: {
      flexDirection: 'row',
      gap: 5,
      minWidth: 50,
    },
    counterLabel: {
      color: theme.textSoft,
    },
  });

export default BookListItem;
