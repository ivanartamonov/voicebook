import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator.tsx';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from './src/contexts/ThemeContext.tsx';
import {PlayerProvider} from './src/contexts/PlayerContext.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <PlayerProvider>
          <StatusBar
            animated={true}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />

          <StackNavigator />
        </PlayerProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
