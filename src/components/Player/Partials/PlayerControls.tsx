import {ViewStyle} from 'react-native';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Pressable from '../../Pressable.tsx';
import React from 'react';
import {useTheme} from '../../../contexts/ThemeContext.tsx';

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

  return (
    <Pressable style={style} onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward-step" size={iconSize} color={theme.text} />
    </Pressable>
  );
};

export const SkipToPrevButton = ({style, iconSize}: PlayerButtonProps) => {
  const {theme} = useTheme();

  return (
    <Pressable style={style} onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name="backward-step" size={iconSize} color={theme.text} />
    </Pressable>
  );
};
