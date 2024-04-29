import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Pressable from '../../../components/Pressable.tsx';
import {usePlayer} from '../../../contexts/PlayerContext.tsx';
import {PlayerWindowState} from '../../../types/player.ts';

interface FloatingActionButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  isLoading?: boolean;
  bookId: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  title,
  isLoading = false,
  bookId,
}) => {
  const {windowState, book} = usePlayer();

  const marginStyle =
    windowState === PlayerWindowState.Minimized
      ? {marginBottom: 50}
      : {marginBottom: 0};

  if (book?.id && bookId === book.id) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={[styles.fab, marginStyle]}>
      <LinearGradient
        colors={['#E125AC', '#460777']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <FontAwesome6 name="headphones" size={24} color="white" />
            <Text style={styles.text}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    height: 50,
    borderRadius: 28,
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: '#460777',
    elevation: 5, // Shadow for Android
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  gradient: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 28,
  },
});

export default FloatingActionButton;
