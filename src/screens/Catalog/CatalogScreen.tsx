import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import SearchInput from '../../components/SearchInput.tsx';
import {getBooks} from '../../api/Book.ts';
import {Book, Collection} from '../../types/types.ts';
import BookListItem from '../../components/BookList/BookListItem.tsx';

type CatalogProps = ScreenProps<'Catalog'>;

function CatalogScreen({}: CatalogProps): React.JSX.Element {
  const [books, setBooks] = useState<Collection<Book>>({data: [], meta: {}});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then(fetchedBooks => {
        setBooks(fetchedBooks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch books:', error);
        setLoading(false);
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    getBooks()
      .then(fetchedBooks => {
        setBooks(fetchedBooks);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Failed to fetch books:', error);
        setRefreshing(false);
      });
  };

  const onEndReached = () => {
    getBooks(page + 1)
      .then(fetchedBooks => {
        setBooks({
          data: [...books.data, ...fetchedBooks.data],
          meta: fetchedBooks.meta,
        });
        setPage(page + 1);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Failed to fetch books:', error);
        setRefreshing(false);
      });
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={books.data}
        renderItem={item => <BookListItem book={item.item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<SearchInput />}
        ListHeaderComponentStyle={styles.header}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CatalogScreen;
