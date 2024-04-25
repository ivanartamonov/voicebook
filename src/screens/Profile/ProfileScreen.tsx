import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';

type ProfileProps = ScreenProps<'Profile'>;

function ProfileScreen({}: ProfileProps): React.JSX.Element {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <SafeAreaView>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.text}>Under construction...</Text>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    heading: {
      color: theme.text,
      fontSize: 32,
      fontWeight: 'bold',
      padding: 20,
    },
    text: {
      color: theme.textSoft,
      fontSize: 16,
      paddingHorizontal: 20,
    },
  });

export default ProfileScreen;
