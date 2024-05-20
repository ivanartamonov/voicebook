import React, {useState} from 'react';
import TextInput from '../../../components/TextInput.tsx';
import Pressable from '../../../components/Pressable.tsx';
import {Alert, StyleSheet, Text} from 'react-native';
import {ApiError} from '../../../api/Api.ts';
import {useAuth} from '../../../contexts/AuthContext.tsx';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Theme} from '../../../constants/theme.ts';

const SignInForm = () => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useTheme();
  const styles = styling(theme);

  const signIn = async () => {
    try {
      await login({email: email, password: password});
    } catch (error) {
      if (error instanceof ApiError) {
        Alert.alert(error.message);
      } else {
        Alert.alert('An error occurred');
      }
    }
  };

  return (
    <>
      <TextInput
        placeholder="Email"
        style={styles.input}
        defaultValue={email}
        value={email}
        onChangeText={setEmail}
        autoComplete="email"
        inputMode="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        defaultValue={password}
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
        textContentType="password"
        autoCapitalize="none"
      />
      <Pressable onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    input: {
      marginTop: 10,
    },
    button: {
      backgroundColor: theme.primary,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: 'white',
      textAlign: 'center',
    },
  });

export default SignInForm;
