import React from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';

type PlayerProps = ScreenProps<'Player'>;

const PlayerScreen = ({route}: PlayerProps): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const {bookId} = route.params;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Book {bookId}</Text>
    </SafeAreaView>
  );
};

export default PlayerScreen;
