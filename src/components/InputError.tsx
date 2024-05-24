import React from 'react';
import {StyleSheet, Text} from 'react-native';

type InputErrorProps = {
  error: string | undefined;
};

const InputError = ({error}: InputErrorProps) => {
  if (!error) {
    return null;
  }

  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: '#e63333',
  },
});

export default InputError;
