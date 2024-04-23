import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import SearchInput from '../../components/SearchInput.tsx';
import {findBooks} from '../../api/Book.ts';
import BookList from '../../components/BookList/BookList.tsx';

type CatalogProps = ScreenProps<'Catalog'>;

function CatalogScreen({}: CatalogProps): React.JSX.Element {
  const books = findBooks();

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <SearchInput />
        <BookList books={books} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CatalogScreen;
