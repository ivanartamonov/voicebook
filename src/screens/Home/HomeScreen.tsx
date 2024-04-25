import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BooksWidget from '../../components/BooksWidget/BooksWidget.tsx';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import {findBooks} from '../../api/Book.ts';

type HomeProps = ScreenProps<'Home'>;

function HomeScreen({}: HomeProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const books = findBooks();

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <BooksWidget heading="Popular books" books={books} />
          <BooksWidget heading="Hot new releases" books={books} />
          <BooksWidget heading="Bestsellers" books={books} />
          <BooksWidget heading="Recently updated" books={books} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
