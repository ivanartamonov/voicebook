import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BooksWidget from '../../components/BooksWidget/BooksWidget.tsx';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import {getHomeWidgets} from '../../api/Widget.ts';
import {Widget} from '../../types/types.ts';
import {Theme} from '../../constants/theme.ts';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import Carousel from '../../components/Carousel.tsx';

type HomeProps = ScreenProps<'Home'>;

function HomeScreen({}: HomeProps): React.JSX.Element {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const styles = styling(theme);

  useEffect(() => {
    setLoading(true);
    getHomeWidgets()
      .then(fetchedWidgets => {
        setWidgets(fetchedWidgets);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch books:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <Carousel books={widgets.length > 2 ? widgets[2].books : []} />
        {widgets.map(widget => (
          <BooksWidget
            key={widget.id}
            heading={widget.title}
            books={widget.books}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomeScreen;
