import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PlayerWindowState} from '../../../types/player.ts';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {usePlayer} from '../../../contexts/PlayerContext.tsx';
import {Theme} from '../../../constants/theme.ts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import ChaptersList from './ChaptersList.tsx';
import {Book, Chapter} from '../../../types/types.ts';
import Pressable from '../../Pressable.tsx';

type Props = {
  book: Book;
  chapter: Chapter;
};

const FullSizePlayer = ({book, chapter}: Props) => {
  const {theme} = useTheme();
  const {setWindowState} = usePlayer();

  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar
          barStyle={'light-content'}
          animated={true}
          backgroundColor="#444"
        />
        <ImageBackground source={{uri: book.cover}} style={styles.coverBg}>
          <View style={styles.overlay} />
          <SafeAreaView>
            <Pressable
              onPress={() => setWindowState(PlayerWindowState.Minimized)}>
              <FontAwesome6
                name="chevron-down"
                size={24}
                style={styles.iconBack}
              />
            </Pressable>
          </SafeAreaView>
        </ImageBackground>
        <Image source={{uri: book.cover}} style={styles.cover} />

        <View style={styles.mainContent}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.genre}>{book.author.name}</Text>
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
        </View>
      </ScrollView>

      <View style={styles.fullPlayer}>
        <ChaptersList curChapter={chapter} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={0.5}
          minimumTrackTintColor={theme.text}
          maximumTrackTintColor={theme.textMuted}
          thumbTintColor={theme.text}
        />
        <View style={styles.timeLabels}>
          <Text style={styles.timeLabel}>00:00</Text>
          <Text style={styles.timeLabel}>05:37</Text>
        </View>
        <View style={styles.controls}>
          <Pressable
            style={[styles.control, styles.controlSmall]}
            onPress={() => console.log('Prev')}>
            <FontAwesome6 name="backward-step" size={36} color={theme.text} />
          </Pressable>
          <Pressable style={styles.control} onPress={() => console.log('Play')}>
            <FontAwesome6 name="play" size={48} color={theme.text} />
          </Pressable>
          <Pressable
            style={[styles.control, styles.controlSmall]}
            onPress={() => console.log('Next')}>
            <FontAwesome6 name="forward-step" size={36} color={theme.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      zIndex: 1,
      flex: 1,
      backgroundColor: theme.background,
    },
    fullPlayer: {
      backgroundColor: theme.background,
      padding: 20,
      alignItems: 'center',
    },
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
    controls: {
      flexDirection: 'row',
      gap: 60,
      marginTop: 0,
      alignItems: 'center',
    },
    control: {
      borderRadius: 50,
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlSmall: {
      width: 60,
      height: 60,
    },
    slider: {
      width: '100%',
      height: 40,
      padding: 0,
    },
    timeLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    timeLabel: {
      color: theme.textSoft,
    },
  });

export default FullSizePlayer;
