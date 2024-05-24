import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {useEffect, useRef} from 'react';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10, // 10 mb
  });

  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const useSetupTrackPlayer = ({onLoad}: {onLoad?: () => void}) => {
  const isInitiated = useRef(false);

  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitiated.current = true;
        onLoad?.();
      })
      .catch(error => {
        isInitiated.current = false;
        console.error(error);
      });
  }, [onLoad]);
};
