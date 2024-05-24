import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import {PlayerWindowState, PlayTask} from '../types/player.ts';
import {Book, Chapter} from '../types/types.ts';
import TrackPlayer, {Track} from 'react-native-track-player';

type PlayerContextType = {
  windowState: PlayerWindowState;
  setWindowState: React.Dispatch<React.SetStateAction<PlayerWindowState>>;
  book: Book | undefined;
  chapter: Chapter | undefined;
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
  setChapter: React.Dispatch<React.SetStateAction<Chapter | undefined>>;
  selectChapter: (newChapter: Chapter) => void;
  startPlaying: (playTask: PlayTask) => void;
  stopPlaying: () => void;
  closeWindow: () => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  const startPlaying = useCallback(async (playTask: PlayTask) => {
    setIsLoading(true);
    setBook(playTask.book);
    setChapter(playTask.chapter);
    setWindowState(PlayerWindowState.Normal);

    const track: Track = {
      id: playTask.chapter.id,
      url: playTask.chapter.url,
      title: playTask.chapter.title,
      artist: playTask.book.author.name,
      artwork: playTask.book.cover,
    };

    await TrackPlayer.load(track);
    await TrackPlayer.play();
    setIsLoading(false);
  }, []);

  const stopPlaying = useCallback(() => {
    TrackPlayer.stop();
  }, []);

  const selectChapter = useCallback(
    async (newChapter: Chapter) => {
      setChapter(newChapter);

      const track: Track = {
        id: newChapter.id,
        url: newChapter.url,
        title: newChapter.title,
        artist: book?.author.name,
        artwork: book?.cover,
      };

      await TrackPlayer.load(track);
      await TrackPlayer.play();
    },
    [book],
  );

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
        selectChapter,
        startPlaying,
        stopPlaying,
        closeWindow,
        isLoading,
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
