import React, {useMemo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import Pressable from '../../components/Pressable.tsx';
import SignUpForm from './components/SignUpForm.tsx';

type SignUpProps = ScreenProps<'SignUp'>;

function SignUpScreen({navigation}: SignUpProps): React.JSX.Element {
  const {theme} = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>

        <SignUpForm />

        <Pressable
          onPress={() => navigation.navigate('SignIn')}
          style={styles.registerButton}>
          <Text style={styles.buttonTextSoft}>Already have an account?</Text>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      alignSelf: 'center',
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
      textAlign: 'center',
    },
    registerButton: {
      padding: 10,
      marginTop: 20,
    },
    buttonTextSoft: {
      color: theme.textSoft,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

export default SignUpScreen;
