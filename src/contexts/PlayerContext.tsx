import React, {createContext, useContext, useState, ReactNode} from 'react';
import {PlayerWindowState, PlayTask} from '../types/player.ts';
import {Book, Chapter} from '../types/types.ts';

type PlayerContextType = {
  windowState: PlayerWindowState;
  setWindowState: React.Dispatch<React.SetStateAction<PlayerWindowState>>;
  book: Book | undefined;
  chapter: Chapter | undefined;
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
  setChapter: React.Dispatch<React.SetStateAction<Chapter | undefined>>;
  startPlaying: (playTask: PlayTask) => void;
  closeWindow: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({children}: ThemeProviderProps) => {
  const [windowState, setWindowState] = useState<PlayerWindowState>(
    PlayerWindowState.Closed,
  );
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);

  const startPlaying = (playTask: PlayTask) => {
    setBook(playTask.book);
    setChapter(playTask.chapter);
    setWindowState(PlayerWindowState.Normal);
  };

  const closeWindow = () => {
    setWindowState(PlayerWindowState.Closed);
    setBook(undefined);
  };

  return (
    <PlayerContext.Provider
      value={{
        windowState,
        setWindowState,
        book,
        chapter,
        setBook,
        setChapter,
        startPlaying,
        closeWindow,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
