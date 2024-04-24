import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Pressable,
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

type BookScreenProps = ScreenProps<'BookDetails'>;

function BookScreen({navigation, route}: BookScreenProps): React.JSX.Element {
  const {book} = route.params;
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
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
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.genre}>{book.genre}</Text>
      <Text style={styles.tags}>{tagsToString(book.tags)}</Text>
      <View style={styles.counters}>
        <View style={styles.counter}>
          <FontAwesome6 name="heart" size={16} color={theme.textSoft} />
          <Text style={styles.counterLabel}>{book.likes}</Text>
        </View>
        <View style={styles.counter}>
          <FontAwesome name="bookmark-o" size={16} color={theme.textSoft} />
          <Text style={styles.counterLabel}>Зберегти</Text>
        </View>
      </View>
      <Text style={styles.abstractHeading}>Опис книги</Text>
      <Text style={styles.abstract}>{book.abstract}</Text>

      <Button
        title="Listen"
        onPress={() =>
          navigation.navigate('Player', {
            book: book,
          })
        }
      />
    </ScrollView>
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
      height: 240,
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
      paddingHorizontal: 10,
    },
    abstract: {
      color: theme.text,
      paddingHorizontal: 10,
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'left',
    },
  });

export default BookScreen;
