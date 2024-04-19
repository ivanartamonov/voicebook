import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type BookDetailsScreenRouteParams = {
  bookId: string;
};

type PlayerScreenRouteParams = {
  bookId: string;
};

// All screens and their route params
export type RootStackParamList = {
  TabNavigator: undefined;
  BookDetails: BookDetailsScreenRouteParams;
  Player: PlayerScreenRouteParams;
  Home: undefined;
  Catalog: undefined;
  Profile: undefined;
};

// Define the types for the navigation and route props specific to your screens
type CatalogScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Catalog'
>;

type CatalogScreenRouteProp = RouteProp<RootStackParamList, 'Catalog'>;

// Interface for the screen props
export interface CatalogScreenProps {
  navigation: CatalogScreenNavigationProp;
  route: CatalogScreenRouteProp;
}
