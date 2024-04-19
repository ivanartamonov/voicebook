import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CatalogScreenProps} from '../../navigation/types.tsx';

function CatalogScreen({navigation}: CatalogScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Catalog</Text>
      <View>
        <Icon name="rocket" size={30} color="red" />
      </View>
      <Button
        title="Open test book"
        onPress={() => navigation.navigate('BookDetails', {bookId: 'Test'})}
      />
    </SafeAreaView>
  );
}

export default CatalogScreen;
