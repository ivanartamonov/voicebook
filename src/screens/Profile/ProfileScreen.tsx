import React from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';

type ProfileProps = ScreenProps<'Profile'>;

function ProfileScreen({}: ProfileProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}

export default ProfileScreen;
