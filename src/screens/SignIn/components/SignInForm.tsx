import React, {useMemo} from 'react';
import TextInput from '../../../components/TextInput.tsx';
import Pressable from '../../../components/Pressable.tsx';
import {Alert, StyleSheet, Text} from 'react-native';
import {ApiCommonError, ApiValidationError} from '../../../api/Api.ts';
import {useAuth} from '../../../contexts/AuthContext.tsx';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Theme} from '../../../constants/theme.ts';
import {Controller, useForm} from 'react-hook-form';
import {LoginData} from '../../../api/Auth.ts';
import InputError from '../../../components/InputError.tsx';

const SignInForm = () => {
  const {login} = useAuth();
  const {theme} = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
    } catch (error: any) {
      if (error instanceof ApiValidationError) {
        error.fillFormErrors(setError);
      } else if (error instanceof ApiCommonError) {
        Alert.alert(error.message);
      } else {
        Alert.alert('Unknown error occurred');
      }
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={{required: 'Email is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoComplete="email"
            inputMode="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
        )}
      />
      <InputError error={errors.email?.message} />

      <Controller
        control={control}
        name="password"
        rules={{required: 'Password is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoComplete="password"
            textContentType="password"
            autoCapitalize="none"
          />
        )}
      />
      <InputError error={errors.password?.message} />

      <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
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
