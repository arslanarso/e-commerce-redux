import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Adress from "../Views/Adress/Adress";
import ProfileScreen from "../Views/Profile/ProfileScreen";

// Create a stack navigator instance.
const Stack = createStackNavigator();

/**
 * The ProfileStack component for navigation to the profile and address screens.
 */
const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={ProfileScreen} name="MyProfile" />
      <Stack.Screen component={Adress} name="Adres" />
    </Stack.Navigator>
  );
};

// Configuration options for the stack navigator.
const screenOptions = {
  headerShown: false,
};

export default ProfileStack;
