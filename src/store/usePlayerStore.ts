import {PlayerWindowState, PlayTask} from '../types/player.ts';
import {Book, Chapter} from '../types/types.ts';
import {create} from 'zustand';
import TrackPlayer, {Track} from 'react-native-track-player';

interface PlayerState {
  windowState: PlayerWindowState;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  book: Book | undefined;
  chapter: Chapter | undefined;
  chapters: Chapter[];
  selectChapter: (newChapter: Chapter) => void;
  startPlaying: (playTask: PlayTask) => void;
  stopPlaying: () => void;
  isLoading: boolean;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  windowState: PlayerWindowState.Closed,
  book: undefined,
  chapter: undefined,
  chapters: [],
  isLoading: false,
  minimizeWindow: () => set({windowState: PlayerWindowState.Minimized}),
  maximizeWindow: () => set({windowState: PlayerWindowState.Normal}),
  closeWindow: () => {
    const {stopPlaying} = get();
    set({windowState: PlayerWindowState.Closed});
    stopPlaying();
  },
  startPlaying: async (playTask: PlayTask) => {
    const currentChapter = playTask.chapters[0];

    set({
      isLoading: true,
      book: playTask.book,
      chapters: playTask.chapters,
      chapter: currentChapter,
      windowState: PlayerWindowState.Normal,
    });

    const tracks: Track[] = [];

    playTask.chapters.forEach(ch => {
      tracks.push({
        id: ch.id,
        url: ch.url,
        title: ch.title,
        artist: playTask.book.author.name,
        artwork: playTask.book.cover,
      });
    });

    await TrackPlayer.reset();
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();

    set({isLoading: false});
  },
  selectChapter: async (newChapter: Chapter) => {
    const {chapters} = get();
    const chapterIndex = chapters.findIndex(c => c.id === newChapter.id);
    await TrackPlayer.skip(chapterIndex);
    await TrackPlayer.play();
    set({chapter: newChapter});
  },
  stopPlaying: async () => {
    await TrackPlayer.stop();
  },
}));
