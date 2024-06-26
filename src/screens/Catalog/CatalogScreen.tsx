import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import SearchInput from '../../components/SearchInput.tsx';
import {getBooks} from '../../api/Book.ts';
import {Book, Collection, CollectionMeta} from '../../types/types.ts';
import BookListItem from '../../components/BookList/BookListItem.tsx';
import {useInfiniteQuery} from '@tanstack/react-query';
import type {DefaultError, InfiniteData, QueryKey} from '@tanstack/query-core';

type CatalogProps = ScreenProps<'Catalog'>;

function CatalogScreen({}: CatalogProps): React.JSX.Element {
  const queryBooks = useInfiniteQuery<
    Collection<Book>,
    DefaultError,
    InfiniteData<Collection<Book>>,
    QueryKey,
    CollectionMeta
  >({
    queryKey: ['books'],
    queryFn: ({pageParam}: {pageParam: CollectionMeta}) => {
      console.log('fetch page: ', pageParam.current_page);
      return getBooks(pageParam.current_page);
    },
    initialPageParam: {current_page: 1} as CollectionMeta,
    getNextPageParam: lastPage => {
      return lastPage.meta.current_page < lastPage.meta.last_page
        ? {...lastPage.meta, current_page: lastPage.meta.current_page + 1}
        : undefined;
    },
  });

  const onRefresh = useCallback(() => {
    queryBooks.refetch();
  }, [queryBooks]);

  const onEndReached = useCallback(() => {
    queryBooks.fetchNextPage();
  }, [queryBooks]);

  if (queryBooks.isLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={
          queryBooks.data?.pages.flatMap(collection => collection.data) || []
        }
        renderItem={item => <BookListItem book={item.item} />}
        initialNumToRender={5}
        keyExtractor={item => item.id}
        ListHeaderComponent={<SearchInput />}
        ListHeaderComponentStyle={styles.header}
        refreshing={queryBooks.isRefetching}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
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
