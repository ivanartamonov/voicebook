/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

type Book = {
  title: string;
  cover: string;
};
type BooksWidgetProps = PropsWithChildren<{
  heading: string;
  books: Array<Book>;
}>;

function BooksWidget({heading, books}: BooksWidgetProps): React.JSX.Element {
  return (
    <View style={{padding: 10}}>
      <Text style={styles.heading}>{heading}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.booksWidget}>
        {books.map((book, index) => (
          <View key={index} style={{width: 115}}>
            <Image
              source={{
                uri: book.cover,
              }}
              style={{
                width: 220 / 2,
                height: 320 / 2,
                borderRadius: 5,
              }}
            />
            <Text>{book.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function App(): React.JSX.Element {
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
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
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

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  booksWidget: {
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
