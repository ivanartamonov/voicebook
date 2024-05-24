import React from 'react';
import {usePlayer} from '../../contexts/PlayerContext.tsx';
import {PlayerWindowState} from '../../types/player.ts';
import MinimizedPlayer from './Partials/MinimizedPlayer.tsx';
import FullSizePlayer from './Partials/FullSizePlayer.tsx';

const Player = () => {
  const {windowState, book} = usePlayer();

  if (!book) {
    return null;
  }

  switch (windowState) {
    case PlayerWindowState.Closed:
      return null;
    case PlayerWindowState.Minimized:
      return <MinimizedPlayer book={book} />;
    case PlayerWindowState.Normal:
      return <FullSizePlayer book={book} />;
    default:
      return null;
  }
};

export default Player;
