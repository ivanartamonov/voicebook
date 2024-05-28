import React, {useMemo, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Theme} from '../../../constants/theme.ts';
import ChapterListItem from './ChapterListItem.tsx';
import {Chapter} from '../../../types/types.ts';
import Pressable from '../../Pressable.tsx';
import {useActiveTrack} from 'react-native-track-player';
import {usePlayerStore} from '../../../store/usePlayerStore.ts';

const ChaptersList = () => {
  const {theme} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useMemo(() => styling(theme), [theme]);
  const {selectChapter, chapters} = usePlayerStore();
  const activeTrack = useActiveTrack();

  const onSelect = (chapter: Chapter) => {
    selectChapter(chapter);
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Pressable
        style={styles.chaptersButton}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.chaptersButtonText}>{activeTrack?.title}</Text>
        <FontAwesome6 name="list" size={16} color={theme.textSoft} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={styles.overlay}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesome6 name="xmark" size={24} color={theme.text} />
            </Pressable>
            <Text style={styles.heading}>Зміст</Text>
            <FlatList
              data={chapters}
              contentContainerStyle={styles.chaptersList}
              renderItem={({item}) => (
                <ChapterListItem
                  chapter={item}
                  onSelect={onSelect}
                  isCurrent={activeTrack?.url === item.url}
                />
              )}
              keyExtractor={chapter => chapter.id}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chaptersButton: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: theme.backgroundSoft,
      borderRadius: 5,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    chaptersButtonText: {
      color: theme.text,
      flexGrow: 1,
    },

    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 22,
      //backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    overlay: {
      backgroundColor: 'transparent',
      flex: 1,
      height: '100%',
      width: '100%',
    },
    modalView: {
      width: '100%',
      height: '80%',
      backgroundColor: theme.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      position: 'absolute',
      top: 5,
      right: 20,
      padding: 10,
    },
    heading: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.text,
    },
    chaptersList: {
      marginTop: 20,
    },
  });

export default ChaptersList;
