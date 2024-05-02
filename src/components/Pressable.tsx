import React from 'react';
import {
  PressableProps,
  StyleProp,
  StyleSheet,
  Pressable as DefaultPressable,
  TextStyle,
} from 'react-native';
import {useTheme} from '../contexts/ThemeContext.tsx';
import {Theme} from '../constants/theme.ts';

interface CustomTextInputProps extends PressableProps {
  style?: StyleProp<TextStyle>;
}

const Pressable: React.FC<CustomTextInputProps> = ({style, ...props}) => {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <DefaultPressable
      android_ripple={{
        color: 'rbga(0, 0, 0, 0.1)',
        borderless: false,
        radius: 400,
        foreground: true,
      }}
      style={({pressed}) => {
        return [styles.defaultStyle, pressed ? styles.pressed : {}, style];
      }}
      {...props}
    />
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    defaultStyle: {
      overflow: 'hidden',
      opacity: 1,
    },
    pressed: {
      opacity: 0.8,
    },
  });

export default Pressable;
