import React from 'react';
import {PlayerWindowState} from '../../types/player.ts';
import MinimizedPlayer from './Partials/MinimizedPlayer.tsx';
import FullSizePlayer from './Partials/FullSizePlayer.tsx';
import {usePlayerStore} from '../../store/usePlayerStore.ts';

const Player = () => {
  const {windowState, book} = usePlayerStore();

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
