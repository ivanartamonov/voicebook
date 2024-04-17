import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Screen route params
type BookDetailsScreenRouteParams = {
  bookId: string;
};

type PlayerScreenRouteParams = {
  bookId: string;
};

// All screens and their route params
type RootStackParamList = {
  CatalogList: undefined;
  BookDetails: BookDetailsScreenRouteParams;
  Player: PlayerScreenRouteParams;
};

// Define the types for the navigation and route props specific to your screens
type CatalogScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CatalogList'
>;

type CatalogScreenRouteProp = RouteProp<RootStackParamList, 'CatalogList'>;

// Interface for the screen props
export interface CatalogScreenProps {
  navigation: CatalogScreenNavigationProp;
  route: CatalogScreenRouteProp;
}
