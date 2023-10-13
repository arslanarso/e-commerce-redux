import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../Views/Home/HomeScreen";

// Create a stack navigator instance.
const Stack = createStackNavigator();

/**
 * The HomeStack component for navigation to the home screen.
 */
const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={HomeScreen} name="Ana Sayfam" />
    </Stack.Navigator>
  );
};

// Configuration options for the stack navigator.
const screenOptions = {
  headerShown: false,
};

export default HomeStack;
