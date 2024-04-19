import React from 'react';
import {Button, SafeAreaView, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScreenProps} from '../../navigation/TabNavigator.tsx';

type CatalogProps = ScreenProps<'Catalog'>;

function CatalogScreen({navigation}: CatalogProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Catalog</Text>
      <View>
        <Icon name="rocket" size={30} color="red" />
      </View>
      <Button
        title="Open test book"
        onPress={() =>
          navigation.getParent('RootStackNav')?.navigate('BookDetails', {
            bookId: 123,
          })
        }
      />
    </SafeAreaView>
  );
}

export default CatalogScreen;
