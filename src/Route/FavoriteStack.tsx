import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import FavoritesScreen from "../Views/Favorites/FavoritesScreen";

// Create a stack navigator instance.
const Stack = createStackNavigator();

/**
 * The FavoriteStack component for navigation to the favorites screen.
 */
const FavoriteStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={FavoritesScreen} name="Favoriler" />
    </Stack.Navigator>
  );
};

// Configuration options for the stack navigator.
const screenOptions = {
  headerShown: false,
};

export default FavoriteStack;
