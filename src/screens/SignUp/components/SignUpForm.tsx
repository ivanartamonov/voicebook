import React from 'react';
import TextInput from '../../../components/TextInput.tsx';
import Pressable from '../../../components/Pressable.tsx';
import {Alert, StyleSheet, Text} from 'react-native';
import {useAuth} from '../../../contexts/AuthContext.tsx';
import {useTheme} from '../../../contexts/ThemeContext.tsx';
import {Controller, useForm} from 'react-hook-form';
import {RegUserData} from '../../../api/Auth.ts';
import {ApiCommonError, ApiValidationError} from '../../../api/Api.ts';
import {Theme} from '../../../constants/theme.ts';
import InputError from '../../../components/InputError.tsx';

const SignUpForm = () => {
  const {register} = useAuth();
  const {theme} = useTheme();
  const styles = styling(theme);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<RegUserData>();

  const onSubmit = async (data: RegUserData) => {
    try {
      data.agree = true;
      await register(data);
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
        name="name"
        rules={{required: 'Name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoComplete="name"
            textContentType="name"
          />
        )}
      />
      <InputError error={errors.name?.message} />

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
            style={styles.input}
            secureTextEntry={true}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      <InputError error={errors.password?.message} />

      <Controller
        control={control}
        name="password_confirmation"
        rules={{required: 'Password confirmation is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Password Confirmation"
            style={styles.input}
            secureTextEntry={true}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      <InputError error={errors.password_confirmation?.message} />

      <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </>
  );
};

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
      color: 'white',
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

export default SignUpForm;
