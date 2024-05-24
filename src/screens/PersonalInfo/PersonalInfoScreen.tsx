import React, {useMemo} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import {ScreenProps} from '../../navigation/StackNavigator.tsx';
import ScreenHeader from '../../components/ScreenHeader.tsx';
import Pressable from '../../components/Pressable.tsx';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useAuth} from '../../contexts/AuthContext.tsx';

type PersonalInfoProps = ScreenProps<'PersonalInfo'>;

function PersonalInfoScreen({
  navigation,
}: PersonalInfoProps): React.JSX.Element {
  const {theme} = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);
  const {logout} = useAuth();

  const handleDeleteAccount = () => {
    console.log('Account Deleted!');
  };

  return (
    <SafeAreaView>
      <ScreenHeader navigation={navigation} title={'Мій акаунт'} />
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.subTitle}>E-mail</Text>
          <Text style={styles.description}>
            Використовується для входу в акаунт та відновлення доступу в разі
            необхідності
          </Text>
          <Text style={styles.text}>i.o.arta*****@gmail.com</Text>
        </View>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.deleteButtonText}>Вийти</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert(
              'Видалити акаунт?',
              'Всі ваші персональні дані, а також персональна бібліотека і закладки книг будуть видалені. Продовжити?',
              [
                {
                  text: 'Назад',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Видалити акаунт', onPress: handleDeleteAccount},
              ],
            )
          }>
          <FontAwesome6 name="trash" size={24} color="#fff" />
          <Text style={styles.deleteButtonText}>Видалити акаунт</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    info: {
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    text: {
      color: theme.textSoft,
      fontSize: 16,
    },
    subTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      color: theme.textMuted,
      fontSize: 14,
      paddingVertical: 5,
    },
    logoutButton: {
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundSoft,
      borderRadius: 10,
      marginVertical: 10,
    },
    deleteButton: {
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.danger,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
  });

export default PersonalInfoScreen;
