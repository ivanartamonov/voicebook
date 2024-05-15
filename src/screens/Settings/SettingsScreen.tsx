import React, {useState} from 'react';
import {Appearance, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import ScreenHeader from '../../components/ScreenHeader.tsx';
import {Switch} from 'react-native-gesture-handler';

type SettingsProps = ScreenProps<'Settings'>;

function SettingsScreen({navigation}: SettingsProps): React.JSX.Element {
  const {theme, isDark, setTheme, themeMode} = useTheme();
  const styles = styling(theme);
  const [useSystemTheme, setUseSystemTheme] = useState(themeMode === null);

  const toggleSystemTheme = () => {
    setTheme(useSystemTheme ? Appearance.getColorScheme() : null);
    setUseSystemTheme(!useSystemTheme);
  };

  const toggleDark = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <SafeAreaView>
      <ScreenHeader navigation={navigation} title={'Налаштування'} />
      <View style={styles.container}>
        <View style={styles.option}>
          <Text style={styles.text}>Використовувати системну тему</Text>
          <Switch
            trackColor={{false: '#767577', true: '#c126ab'}}
            thumbColor={useSystemTheme ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSystemTheme}
            value={useSystemTheme}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>Темна тема</Text>
          <Switch
            trackColor={{false: '#767577', true: '#c126ab'}}
            thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDark}
            value={isDark}
            disabled={useSystemTheme}
          />
        </View>
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
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.backgroundSoft,
    },
  });

export default SettingsScreen;
