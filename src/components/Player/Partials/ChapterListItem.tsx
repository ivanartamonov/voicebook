import React, {useMemo} from 'react';
import {Chapter} from '../../../types/types.ts';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Theme} from '../../../constants/theme.ts';
import {secToTime} from '../../../utils/DateTimeHelper.ts';
import Pressable from '../../Pressable.tsx';

type Props = {
  chapter: Chapter;
  onSelect: (chapter: Chapter) => void;
  isCurrent: boolean;
};

const ChapterListItem = ({chapter, onSelect, isCurrent}: Props) => {
  const {theme} = useTheme();
  const styles = useMemo(() => styling(theme, isCurrent), [theme, isCurrent]);

  return (
    <Pressable style={styles.chapterItem} onPress={() => onSelect(chapter)}>
      <Text style={styles.chapterItemText}>{chapter.title}</Text>
      <Text style={styles.chapterItemDuration}>
        {secToTime(chapter.duration)}
      </Text>
    </Pressable>
  );
};

const styling = (theme: Theme, isCurrent: boolean) =>
  StyleSheet.create({
    chapterItem: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: isCurrent ? theme.backgroundSoft : theme.background,
    },
    current: {
      color: theme.primary,
    },
    chapterItemText: {
      color: theme.text,
    },
    chapterItemDuration: {
      color: theme.textSoft,
    },
  });

export default ChapterListItem;
