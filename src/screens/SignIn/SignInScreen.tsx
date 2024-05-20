import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import Pressable from '../../components/Pressable.tsx';
import TextInput from '../../components/TextInput.tsx';
import {useAuth} from '../../contexts/AuthContext.tsx';
import {ApiError} from '../../api/Api.ts';

type SignInProps = ScreenProps<'SignIn'>;

function SignInScreen({navigation}: SignInProps): React.JSX.Element {
  const {theme} = useTheme();
  const {login} = useAuth();
  const styles = styling(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
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
        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
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
      color: theme.text,
      textAlign: 'center',
    },
    registerButton: {
      padding: 10,
      marginTop: 20,
    },
  });

export default SignInScreen;
