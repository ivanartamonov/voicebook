import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator.tsx';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StackNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
