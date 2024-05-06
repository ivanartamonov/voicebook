import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';
import {useTheme} from '../../contexts/ThemeContext.tsx';
import {Theme} from '../../constants/theme.ts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Pressable from '../../components/Pressable.tsx';

type ProfileProps = ScreenProps<'Profile'>;

function ProfileScreen({navigation}: ProfileProps): React.JSX.Element {
  const {theme} = useTheme();
  const styles = styling(theme);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <Pressable style={styles.menuItem}>
          <FontAwesome6
            name="user"
            size={22}
            color={theme.text}
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemTitle}>Особиста інформація</Text>
          <FontAwesome6 name="chevron-right" size={16} color={theme.textSoft} />
        </Pressable>
        <Pressable
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}>
          <FontAwesome6
            name="gear"
            size={22}
            color={theme.text}
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemTitle}>Налаштування</Text>
          <FontAwesome6 name="chevron-right" size={16} color={theme.textSoft} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <FontAwesome6
            name="info"
            size={22}
            color={theme.text}
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemTitle}>Інформація про додаток</Text>
          <FontAwesome6 name="chevron-right" size={16} color={theme.textSoft} />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <FontAwesome6
            name="headset"
            size={22}
            color={theme.text}
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemTitle}>Техпідтримка</Text>
          <FontAwesome6 name="chevron-right" size={16} color={theme.textSoft} />
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
    heading: {
      color: theme.text,
      fontSize: 32,
      fontWeight: 'bold',
      paddingVertical: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingVertical: 20,
    },
    menuItemTitle: {
      color: theme.textSoft,
      fontSize: 16,
      flexGrow: 1,
    },
    menuIcon: {
      width: 24,
      textAlign: 'center',
    },
    arrowIcon: {
      color: theme.textSoft,
    },
  });

export default ProfileScreen;
