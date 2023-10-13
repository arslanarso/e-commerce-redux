import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CartScreen from "../Views/Cart/CartScreen";

// Create a stack navigator instance.
const Stack = createStackNavigator();

/**
 * The CartStack component for navigation to the cart screen.
 */
const CartStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={CartScreen} name="Sepetim" />
    </Stack.Navigator>
  );
};

// Configuration options for the stack navigator.
const screenOptions = {
  headerShown: false,
};

export default CartStack;
