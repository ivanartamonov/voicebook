import React from 'react';
import {Chapter} from '../../../types/types.ts';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Theme} from '../../../constants/theme.ts';
import {secToTime} from '../../../utils/DateTimeHelper.ts';

type Props = {
  chapter: Chapter;
  onSelect: (chapterId: string) => void;
};

const ChapterListItem = ({chapter, onSelect}: Props) => {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <Pressable style={styles.chapterItem} onPress={() => onSelect(chapter.id)}>
      <Text style={styles.chapterItemText}>{chapter.title}</Text>
      <Text style={styles.chapterItemDuration}>
        {secToTime(chapter.duration)}
      </Text>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    chapterItem: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chapterItemText: {
      color: theme.text,
    },
    chapterItemDuration: {
      color: theme.textSoft,
      marginRight: 20,
    },
  });

export default ChapterListItem;
