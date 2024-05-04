import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Theme} from '../../constants/theme.ts';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {StatusBar} from 'react-native';
import {tagsToString} from '../../utils/BookHelper.ts';
import ListenButton from './components/ListenButton.tsx';
import {usePlayer} from '../../contexts/PlayerContext.tsx';
import {getFirstBookChapter} from '../../api/Chapter.ts';
import Pressable from '../../components/Pressable.tsx';

type BookScreenProps = ScreenProps<'BookDetails'>;

function BookScreen({navigation, route}: BookScreenProps): React.JSX.Element {
  const {book} = route.params;
  const {theme} = useTheme();
  const {startPlaying} = usePlayer();
  const [isLoading, setIsLoading] = useState(false);
  const styles = styling(theme);

  const handleListen = () => {
    setIsLoading(true);

    // TODO: check for existing bookmark
    // if exists, start playing from the bookmark
    // if not, start playing from the first chapter
    getFirstBookChapter(book.id)
      .then(chapter => {
        startPlaying({book, chapter});
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch first chapter:', error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ScrollView>
        <StatusBar
          barStyle={'light-content'}
          animated={true}
          backgroundColor="#444"
        />
        <ImageBackground source={{uri: book.cover}} style={styles.coverBg}>
          <View style={styles.overlay} />
          <SafeAreaView>
            <Pressable onPress={() => navigation.goBack()}>
              <FontAwesome6
                name="chevron-left"
                size={24}
                style={styles.iconBack}
              />
            </Pressable>
          </SafeAreaView>
        </ImageBackground>
        <Image source={{uri: book.cover}} style={styles.cover} />

        <View style={styles.mainContent}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.genre}>{book.genre}</Text>
          <Text style={styles.tags}>{tagsToString(book.tags)}</Text>
          <View style={styles.counters}>
            <Pressable style={styles.counter}>
              <FontAwesome6 name="heart" size={16} color={theme.textSoft} />
              <Text style={styles.counterLabel}>{book.likes}</Text>
            </Pressable>
            <Pressable style={styles.counter}>
              <FontAwesome name="bookmark-o" size={16} color={theme.textSoft} />
              <Text style={styles.counterLabel}>Зберегти</Text>
            </Pressable>
          </View>
          <Text style={styles.abstractHeading}>Опис книги</Text>
          <Text style={styles.abstract}>{book.abstract}</Text>
        </View>
      </ScrollView>

      <ListenButton
        onPress={handleListen}
        title="Слухати"
        isLoading={isLoading}
        bookId={book.id}
      />
    </>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    iconBack: {
      color: 'white',
      paddingVertical: 6,
      width: 40,
      textAlign: 'center',
    },
    coverBg: {
      width: '100%',
      height: 260,
      backgroundColor: 'black',
    },
    cover: {
      width: 160,
      height: 240,
      marginTop: -200,
      borderRadius: 7,
      alignSelf: 'center',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.7)',
      width: '100%',
      height: '100%',
    },
    mainContent: {
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
      marginTop: 10,
    },
    genre: {
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 5,
      color: theme.textSoft,
    },
    tags: {
      textAlign: 'center',
      marginTop: 5,
      color: theme.textSoft,
      fontWeight: '300',
    },
    counters: {
      flexDirection: 'row',
      gap: 10,
      marginVertical: 20,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counter: {
      flexDirection: 'row',
      gap: 5,
      minWidth: 50,
      backgroundColor: theme.backgroundSoft,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    counterLabel: {
      color: theme.textSoft,
    },
    abstractHeading: {
      color: theme.text,
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'left',
      marginBottom: 10,
    },
    abstract: {
      color: theme.text,
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'left',
      marginBottom: 90,
    },
  });

export default BookScreen;
