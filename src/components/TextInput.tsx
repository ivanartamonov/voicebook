import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {useTheme} from '../contexts/ThemeContext.tsx';
import {Theme} from '../constants/theme.ts';

interface CustomTextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

const TextInput: React.FC<CustomTextInputProps> = ({style, ...props}) => {
  const {theme} = useTheme();
  const styles = styling(theme);

  return <DefaultTextInput style={[styles.defaultStyle, style]} {...props} />;
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    defaultStyle: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0,
      borderRadius: 7,
      backgroundColor: theme.backgroundSoft,
      color: theme.text,
      paddingHorizontal: 10,
    },
  });

export default TextInput;
