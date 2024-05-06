import React from 'react';
import {useTheme} from '../contexts/ThemeContext.tsx';
import {Theme} from '../constants/theme.ts';
import {StyleSheet, Text, View} from 'react-native';
import Pressable from './Pressable.tsx';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator.tsx';

type ScreenHeaderProps = {
  navigation: StackNavigationProp<RootStackParamList, any>;
  title: string;
};

const ScreenHeader = ({navigation, title}: ScreenHeaderProps) => {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <FontAwesome6 name="chevron-left" size={24} style={styles.iconBack} />
      </Pressable>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    iconBack: {
      color: theme.text,
      paddingVertical: 6,
      width: 40,
      textAlign: 'center',
    },
    heading: {
      color: theme.text,
      fontSize: 32,
      fontWeight: 'bold',
      paddingVertical: 20,
    },
  });

export default ScreenHeader;
