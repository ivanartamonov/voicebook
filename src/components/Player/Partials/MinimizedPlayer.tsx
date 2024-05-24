import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PlayerWindowState} from '../../../types/player.ts';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {usePlayer} from '../../../contexts/PlayerContext.tsx';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {Theme} from '../../../constants/theme.ts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Book, Chapter} from '../../../types/types.ts';
import Pressable from '../../Pressable.tsx';
import {PlayPauseButton} from './PlayerControls.tsx';

type Props = {
  book: Book;
  chapter: Chapter;
};

const MinimizedPlayer = ({book, chapter}: Props) => {
  const {theme} = useTheme();
  const {windowState, setWindowState, closeWindow} = usePlayer();
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const [hasTabs, setHasTabs] = useState(false);

  const styles = styling(theme, hasTabs);

  useEffect(() => {
    const determineIfHasTabs = () => {
      const routeIndex = navigationState?.index ?? 0;
      const routeName =
        navigationState?.routes[routeIndex]?.name ?? 'TabNavigator';
      const routesWithTabs = ['TabNavigator']; // List routes that have tabs
      setHasTabs(routesWithTabs.includes(routeName));
    };

    determineIfHasTabs();

    return navigation.addListener('state', determineIfHasTabs);
  }, [navigation, navigationState]);

  function togglePlayer() {
    if (windowState === PlayerWindowState.Minimized) {
      setWindowState(PlayerWindowState.Normal);
    } else {
      setWindowState(PlayerWindowState.Minimized);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayer} style={styles.minimizedBar}>
        <Image source={{uri: book.cover}} style={styles.bookCover} />
        <View style={styles.info}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.chapterTitle}>{chapter.title} (1/12)</Text>
        </View>
        <PlayPauseButton style={styles.iconButton} iconSize={22} />
        <Pressable style={styles.iconButton} onPress={closeWindow}>
          <FontAwesome6 name="xmark" size={22} color={theme.text} />
        </Pressable>
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: Theme, hasTabs: boolean) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: hasTabs ? 49 : 0,
      left: 0,
      right: 0,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      zIndex: 1,
      flex: 1,
      backgroundColor: theme.background,
    },
    minimizedBar: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      paddingVertical: 5,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    bookCover: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 7,
    },
    info: {
      flexGrow: 1,
    },
    bookTitle: {
      color: theme.text,
      fontWeight: '600',
    },
    chapterTitle: {
      color: theme.textSoft,
      fontSize: 13,
    },
    iconButton: {
      borderWidth: 0,
      height: '100%',
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: -10,
      borderRadius: 50,
    },
  });

export default MinimizedPlayer;
