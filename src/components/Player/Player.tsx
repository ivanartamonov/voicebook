import React from 'react';
import {usePlayer} from '../../contexts/PlayerContext.tsx';
import {PlayerWindowState} from '../../types/player.ts';
import MinimizedPlayer from './Partials/MinimizedPlayer.tsx';
import FullSizePlayer from './Partials/FullSizePlayer.tsx';

const Player = () => {
  const {windowState} = usePlayer();

  switch (windowState) {
    case PlayerWindowState.Closed:
      return null;
    case PlayerWindowState.Minimized:
      return <MinimizedPlayer />;
    case PlayerWindowState.Normal:
      return <FullSizePlayer />;
    default:
      return null;
  }
};

export default Player;
