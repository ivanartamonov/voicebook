import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import {PlayerWindowState, PlayTask} from '../types/player.ts';
import {Book, Chapter} from '../types/types.ts';
import TrackPlayer, {RepeatMode, Track} from 'react-native-track-player';

type PlayerContextType = {
  windowState: PlayerWindowState;
  setWindowState: React.Dispatch<React.SetStateAction<PlayerWindowState>>;
  book: Book | undefined;
  chapter: Chapter | undefined;
  chapters: Chapter[];
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
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const startPlaying = useCallback(async (playTask: PlayTask) => {
    const currentChapter = playTask.chapters[0];

    setIsLoading(true);
    setBook(playTask.book);
    setChapters(playTask.chapters);
    setChapter(currentChapter);
    setWindowState(PlayerWindowState.Normal);

    const tracks: Track[] = [];

    playTask.chapters.forEach(chapter => {
      tracks.push({
        id: chapter.id,
        url: chapter.url,
        title: chapter.title,
        artist: playTask.book.author.name,
        artwork: playTask.book.cover,
      });
    });

    await TrackPlayer.reset();
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
    setIsLoading(false);
  }, []);

  const stopPlaying = useCallback(async () => {
    await TrackPlayer.stop();
  }, []);

  const selectChapter = useCallback(
    async (newChapter: Chapter) => {
      setChapter(newChapter);
      const chapterIndex = chapters?.findIndex(c => c.id === newChapter.id);
      await TrackPlayer.skip(chapterIndex);
      await TrackPlayer.play();
    },
    [chapters],
  );

  const closeWindow = useCallback(async () => {
    setWindowState(PlayerWindowState.Closed);
    setBook(undefined);
    await stopPlaying();
  }, [stopPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        windowState,
        setWindowState,
        book,
        chapter,
        chapters,
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
