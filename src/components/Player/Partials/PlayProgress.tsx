import React, {useMemo} from 'react';
import Slider from '@react-native-community/slider';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Theme} from '../../../constants/theme.ts';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {secToTime} from '../../../utils/DateTimeHelper.ts';

const PlayProgress = () => {
  const {duration, position} = useProgress(1000);
  const {theme} = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  let elapsedTime = secToTime(position);
  let remainingTime = secToTime(duration - position);

  const progress = useMemo(() => {
    return duration > 0 ? position / duration : 0;
  }, [position, duration]);

  return (
    <>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        minimumTrackTintColor={theme.text}
        maximumTrackTintColor={theme.textMuted}
        thumbTintColor={theme.text}
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View style={styles.timeLabels}>
        <Text style={styles.timeLabel}>{elapsedTime}</Text>
        <Text style={styles.timeLabel}>- {remainingTime}</Text>
      </View>
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
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

export default PlayProgress;
