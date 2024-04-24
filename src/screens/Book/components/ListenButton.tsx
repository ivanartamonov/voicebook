import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface FloatingActionButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fab}>
      <FontAwesome6 name="headphones" size={24} color="white" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 28,
    elevation: 8, // Shadow for Android
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
});

export default FloatingActionButton;
