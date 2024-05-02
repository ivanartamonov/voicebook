import React from 'react';
import {usePlayer} from '../../contexts/PlayerContext.tsx';
import {PlayerWindowState} from '../../types/player.ts';
import MinimizedPlayer from './Partials/MinimizedPlayer.tsx';
import FullSizePlayer from './Partials/FullSizePlayer.tsx';

const Player = () => {
  const {windowState, book, chapter} = usePlayer();

  if (!book || !chapter) {
    return null;
  }

  switch (windowState) {
    case PlayerWindowState.Closed:
      return null;
    case PlayerWindowState.Minimized:
      return <MinimizedPlayer book={book} chapter={chapter} />;
    case PlayerWindowState.Normal:
      return <FullSizePlayer book={book} chapter={chapter} />;
    default:
      return null;
  }
};

export default Player;
