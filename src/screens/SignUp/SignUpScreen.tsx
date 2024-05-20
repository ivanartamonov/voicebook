import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import Pressable from '../../components/Pressable.tsx';
import TextInput from '../../components/TextInput.tsx';
import {useAuth} from '../../contexts/AuthContext.tsx';

type SignUpProps = ScreenProps<'SignUp'>;

function SignUpScreen({navigation}: SignUpProps): React.JSX.Element {
  const {theme} = useTheme();
  const {register} = useAuth();
  const styles = styling(theme);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const signUp = () => {
    try {
      register({
        email: email,
        name: name,
        password: password,
        password_confirmation: passwordConfirmation,
        agree: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('An error occurred');
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          defaultValue={name}
          value={name}
          onChangeText={setName}
          autoComplete="name"
          textContentType="name"
        />
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
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          defaultValue={password}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.input}
          defaultValue={passwordConfirmation}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
        <Pressable onPress={signUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
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
    buttonTextSoft: {
      color: theme.textSoft,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

export default SignUpScreen;
