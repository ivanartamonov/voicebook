import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator.tsx';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from './src/contexts/ThemeContext.tsx';
import {PlayerProvider} from './src/contexts/PlayerContext.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './src/contexts/AuthContext.tsx';
import {useSetupTrackPlayer} from './src/hooks/useSetupTrackPlayer.ts';
import {useLogTrackPlayerState} from './src/hooks/useLogTrackPlayerState.ts';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  useSetupTrackPlayer({
    onLoad: () => {
      console.log('TrackPlayer is ready');
    },
  });
  useLogTrackPlayerState();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
