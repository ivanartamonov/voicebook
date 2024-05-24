import {StyleSheet, ViewStyle} from 'react-native';
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Pressable from '../../Pressable.tsx';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {usePlayer} from '../../../contexts/PlayerContext.tsx';

type PlayerButtonProps = {
  style?: ViewStyle | ViewStyle[];
  iconSize?: number;
};

export const PlayPauseButton = ({style, iconSize}: PlayerButtonProps) => {
  const {playing} = useIsPlaying();
  const {theme} = useTheme();

  return (
    <Pressable
      style={style}
      onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
      <FontAwesome6
        name={playing ? 'pause' : 'play'}
        size={iconSize}
        color={theme.text}
      />
    </Pressable>
  );
};

export const SkipToNextButton = ({style, iconSize}: PlayerButtonProps) => {
  const {theme} = useTheme();
  const [isActive, setIsActive] = useState(false);
  const activeTrack = useActiveTrack();
  const {chapters} = usePlayer();

  useEffect(() => {
    setIsActive(activeTrack?.url === chapters[chapters.length - 1].url);
  }, [activeTrack, chapters]);

  return (
    <Pressable
      style={[style, isActive ? styles.inactive : {}]}
      onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward-step" size={iconSize} color={theme.text} />
    </Pressable>
  );
};

export const SkipToPrevButton = ({style, iconSize}: PlayerButtonProps) => {
  const {theme} = useTheme();
  const [isActive, setIsActive] = useState(false);
  const activeTrack = useActiveTrack();
  const {chapters} = usePlayer();

  useEffect(() => {
    setIsActive(activeTrack?.url === chapters[0].url);
  }, [activeTrack, chapters]);

  return (
    <Pressable
      style={[style, isActive ? styles.inactive : {}]}
      onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name="backward-step" size={iconSize} color={theme.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inactive: {
    opacity: 0.5,
  },
});
