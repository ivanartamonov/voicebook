import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import ScreenHeader from '../../components/ScreenHeader.tsx';

type SettingsProps = ScreenProps<'Settings'>;

function SettingsScreen({navigation}: SettingsProps): React.JSX.Element {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <SafeAreaView>
      <ScreenHeader navigation={navigation} title={'Налаштування'} />
      <View style={styles.container}>
        <Text style={styles.text}>Under construction...</Text>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    text: {
      color: theme.textSoft,
      fontSize: 16,
    },
  });

export default SettingsScreen;
