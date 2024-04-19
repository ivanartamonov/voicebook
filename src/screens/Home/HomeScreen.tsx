import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BooksWidget from '../../components/BooksWidget/BooksWidget.tsx';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';

type HomeProps = ScreenProps<'Home'>;

function HomeScreen({}: HomeProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const books = [
    {
      title: 'Заборонена для мажора',
      cover: 'https://st.booknet.ua/uploads/covers/220/1695712337_4.png',
    },
    {
      title: 'За власним бажанням',
      cover: 'https://st.booknet.ua/uploads/covers/220/1708788896_26.jpg',
    },
    {
      title: 'Час пробачати',
      cover: 'https://st.booknet.ua/uploads/covers/220/1697796419_56.jpg',
    },
    {
      title: "П'янкий смак кохання",
      cover: 'https://st.booknet.ua/uploads/covers/220/1673221872_64.jpg',
    },
    {
      title: 'Залишся єдиним',
      cover: 'https://st.booknet.ua/uploads/covers/220/1658075318_26.jpeg',
    },
  ];

  return (
    <SafeAreaView style={backgroundStyle}>
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
