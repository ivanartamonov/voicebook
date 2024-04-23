import React from 'react';
import {Button, SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';

type BookScreenProps = ScreenProps<'BookDetails'>;

function BookScreen({navigation, route}: BookScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {book} = route.params;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Book: {book.title}</Text>
      <Button
        title="Listen"
        onPress={() =>
          navigation.navigate('Player', {
            book: book,
          })
        }
      />
    </SafeAreaView>
  );
}

export default BookScreen;
