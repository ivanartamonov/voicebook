import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Theme} from '../constants/theme.ts';
import {useTheme} from '../contexts/ThemeContext.tsx';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Book} from '../types/types.ts';
import {tagsToString} from '../utils/BookHelper.ts';

type Props = {
  books: Book[];
};

const Carousel = ({books}: Props) => {
  const {theme} = useTheme();
  const windowDimensions = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<Book>>(null);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [onHold, setOnHold] = useState<boolean>(false);
  const styles = styling(theme, windowDimensions.width);

  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
    setCurrentIndex(index);
  }, []);

  const startAutoScroll = useCallback(() => {
    autoScrollTimeout.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % books.length;
      scrollToIndex(nextIndex);
      startAutoScroll();
    }, 5000);
  }, [books, currentIndex, scrollToIndex]);

  useEffect(() => {
    if (!onHold) {
      startAutoScroll();
    } else {
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }
    }

    return () => {
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }
    };
  }, [currentIndex, startAutoScroll, onHold]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        pagingEnabled={true}
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={books}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            style={styles.carouselItem}
            onPressIn={() => {
              setOnHold(true);
              console.log('Hold auto-scrolling');
              if (autoScrollTimeout.current) {
                clearTimeout(autoScrollTimeout.current);
              }
            }}
            onPressOut={() => {
              setOnHold(false);
              console.log('Resume auto-scrolling');
            }}>
            <ImageBackground source={{uri: item.cover}} style={styles.coverBg}>
              <View style={styles.overlay} />
              <View style={styles.slideContent}>
                <Image source={{uri: item.cover}} style={styles.cover} />
                <View style={styles.bookInfo}>
                  <Text style={styles.carouselItemTitle}>{item.title}</Text>
                  <Text style={styles.genre}>{item.genre}</Text>
                  <Text style={styles.tags}>{tagsToString(item.tags)}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        )}
        onScroll={({nativeEvent}) => {
          const newIndex = Math.round(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
          );
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.dotsContainer}>
        {books.map((_, index) => (
          <View key={index}>
            <View
              style={[styles.dot, index === currentIndex && styles.currentDot]}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styling = (theme: Theme, windowWidth: number) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
    },
    carouselItem: {
      width: windowWidth - 20,
      height: 200,
      backgroundColor: 'red',
      marginHorizontal: 10,
      borderRadius: 10,
      overflow: 'hidden',
      flexWrap: 'wrap',
    },
    carouselItemTitle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 10,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.textMuted,
      marginHorizontal: 5,
    },
    currentDot: {
      backgroundColor: theme.text,
    },
    slideContent: {
      flexDirection: 'row',
      padding: 10,
      gap: 10,
    },
    bookInfo: {
      flexWrap: 'wrap',
      width: windowWidth - 150,
      alignItems: 'flex-start',
    },
    coverBg: {
      width: '100%',
      height: 260,
      backgroundColor: 'black',
    },
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.7)',
      width: '100%',
      height: '100%',
    },
    cover: {
      width: 100,
      height: 150,
      borderRadius: 7,
      alignSelf: 'center',
    },
    genre: {
      fontWeight: '600',
      marginTop: 5,
      color: 'white',
    },
    tags: {
      marginTop: 5,
      color: 'white',
      fontWeight: '300',
    },
  });

export default Carousel;
