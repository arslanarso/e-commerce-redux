import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductsListScreen from "../Views/ProductsList/ProductsListScreen";

// Create a stack navigator instance.
const Stack = createStackNavigator();

/**
 * The ProductsListStack component for navigation to the products list screen.
 */
const ProductsListStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={ProductsListScreen} name="Products List Page" />
    </Stack.Navigator>
  );
};

// Configuration options for the stack navigator.
const screenOptions = {
  headerShown: false,
};

export default ProductsListStack;
