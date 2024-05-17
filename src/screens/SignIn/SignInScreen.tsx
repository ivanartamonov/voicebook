import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import Pressable from '../../components/Pressable.tsx';
import TextInput from '../../components/TextInput.tsx';
import {useAuth} from '../../contexts/AuthContext.tsx';

type SignInProps = ScreenProps<'SignIn'>;

function SignInScreen({}: SignInProps): React.JSX.Element {
  const {theme} = useTheme();
  const {login} = useAuth();
  const styles = styling(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    try {
      login({email: email, password: password});
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
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          defaultValue={email}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          defaultValue={password}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={signIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
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
  });

export default SignInScreen;
